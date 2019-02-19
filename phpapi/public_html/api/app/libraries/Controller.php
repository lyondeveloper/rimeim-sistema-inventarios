<?php

    /*
    Base controller
    Loads the functions
    */

    class Controller {

        private $current_token = null;
        
        // Load model
        public function model($model) {
            // Require model file
            require_once APP_ROOT . '/models/'. $model . '.php';
            $modelWords = explode('/', $model);
            $modelName = array_pop($modelWords);
            return new $modelName();
        }

        // Funciones auxiliares

        public function sanitizePostString() {
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
        }

        public function redirect($url = null) {
            if (is_null($url) || empty($url)) {
                header('location:' . URL_ROOT);
            } else {
                header('location:'. URL_ROOT . $url);
            }
        }

        public function useGetRequest() {
            if (!is_get_request()) {
                notAuthorizedHeader(true);
            }
        }

        public function usePostRequest() {
            if (!is_post_request()) {
                notAuthorizedHeader(true);
            }
        }

        public function usePutRequest() {
            if (!is_put_request()) {
                notAuthorizedHeader(true);
            }
        }

        public function useDeleteRequest() {
            if (!is_delete_request()) {
                notAuthorizedHeader(true);
            }   
        }

        public function response($data = null, $error = null, $addToken = true) {
            $data_response = [];
            if ($addToken && !is_null($this->current_token)) {
                $data_response['token'] = $this->get_updated_token();
            }
            if (!is_null($data)) {
                if (is_array($data) && isset($data['token'])) {
                    $data_response['token'] = $data['token'];
                    unset($data['token']);
                }
                $data_response['data'] = $data;
            } 
            sendResponse($data_response, $error);
        }

        private function get_updated_token() {
            if (!is_null($this->current_token)) {
                $this->current_token->dt_expire = strtotime("+" . TOKEN_DURATION . " seconds",curent_time());
            }
            return JWT::encode($this->current_token, KEY_TOKEN);
        }

        public function get_new_token($user){
            $token_arr = [
                'id' => $user->id,
                'name' => $user->nombre,
                'dt_expire' => strtotime("+" . TOKEN_DURATION . " seconds",curent_time())
            ];
            $token = JWT::encode($token_arr, KEY_TOKEN);
            return $token;
        }

        public function private_route() {
            $token = $this->get_token_from_header();
            if (is_null($token)) {
                $this->response(null, ERROR_FORBIDDEN);
            }
            $token = $this->get_decoded_token($token);
            $userModel = $this->model('User');

            if (!$userModel->is_user_enabled($token->id)) {
                $this->response(['code' => 450], ERROR_FORBIDDEN, false);
            }
            if ($token->dt_expire < curent_time()) {
                $this->response(['code' => 420], ERROR_FORBIDDEN);
            }
            $this->current_token = $token;
        }

        private function get_token_from_header() {
            $valid = false;
            $headers = apache_request_headers();
            $token_header = isset($headers['Authorization']) ? $headers['Authorization'] : null;
            if (!is_null($token_header)) {
                if (preg_match('/' . KEY_BEARER . '\s(\S+)/', $token_header, $matches)) {
                    $token_header = $matches[1];
                    $valid = true;
                }
            }
            return $valid ? $token_header : null;
        }

        private function get_decoded_token($token_str) {
            try {
                $token_decoded = JWT::decode($token_str, KEY_TOKEN);
                return $token_decoded;
            } catch(Exception $e) {
                errorLog($e->getMessage());
            }
            $this->response(null, ERROR_FORBIDDEN);
        }

        public function route_for_admin($userModel) {
            if (!$userModel->is_user_admin($this->get_current_user_id())) {
                $this->response(['code' => 430], ERROR_FORBIDDEN);
            }
        }

        public function route_for_admin_or_same_user($id, $userModel = null) {
            if (is_null($id)) {
                $this->response(['code' => 430], ERROR_FORBIDDEN);
            } elseif ($this->get_current_user_id() == $id) {
                return;
            } elseif (is_null($userModel) || 
                        !$userModel->is_user_admin($this->get_current_user_id())) {
                $this->response(['code' => 430], ERROR_FORBIDDEN);
            }
        }

        public function get_current_user_id() {
            return (!is_null($this->current_token) && 
                    isset($this->current_token->id)) ? $this->current_token->id : 0;
        }
    }
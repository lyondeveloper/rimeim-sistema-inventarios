<?php

    /*
    Base controller
    Loads the functions
    */

    class Controller {

        private $current_token;
        
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

        public function get_updated_token() {
            if (!is_null($this->current_token)) {
                $this->current_token->dt_expire = date('Y-m-d H:i:s', strtotime("+" . TOKEN_DURATION . " seconds",curent_time()));
            }
            return $this->current_token;
        }

        public function get_new_token($user){
            $token_arr = [
                'id' => $user->id,
                'name' => $user->nombre,
                'admin' => $user->admin,
                'primera_sesion' => $user->primera_sesion,
                'dt_expire' => date('Y-m-d H:i:s',strtotime("+" . TOKEN_DURATION . " seconds",curent_time()))
            ];
            $token = JWT::encode($token_arr, KEY_TOKEN);
            return $token;
        }

        public function private_route() {
            $token = $this->get_token_from_header();
            if (is_null($token)) {
                notAuthorizedHeader(true);
            }
            $token = $this->get_decoded_token($token);
            if (strtotime($token->dt_expire) < curent_time()) {
                notAuthorizedHeader();
                $this->sendJsonData(['error' => 'El token ya expiro', 'code' => '420'], true);
            }
            $this->current_token = $token;
        }

        private function get_token_from_header() {
            $headers = apache_request_headers();
            $token_header = isset($headers['Authorization']) ? $headers['Authorization'] : null;
            if (!is_null($token_header)) {
                if (preg_match('/' . KEY_BEARER . '\s(\S+)/', $token_header, $matches)) {
                    $token_header = $matches[1];
                }
            }
            return $token_header;
        }

        private function get_decoded_token($token_str) {
            try {
                $token_decoded = JWT::decode($token_str, KEY_TOKEN);
                return $token_decoded;
            } catch(Exception $e) {
                errorLog($e->getMessage());
            }
            notAuthorizedHeader(true);
        }
    }
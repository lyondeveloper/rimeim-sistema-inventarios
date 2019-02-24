<?php

    /*
    Base controller
    Loads the functions
    */

    class Controller {

        private $current_token = null;
        public $userModel;
        public $employeModel;

        public function initController($private_type = null)
        {
            $this->userModel = $this->model('User');
            $this->employeModel = $this->model('Employe');

            // Para la configuracion de controladores privados
            if (!is_null($private_type)) {
                $this->private_route($private_type);
            }
        }

        // Load model
        public function model($model)
        {
            // Require model file
            require_once APP_ROOT . '/models/' . $model . '.php';
            $modelWords = explode('/', $model);
            $modelName = array_pop($modelWords);
            return new $modelName();
        }

        // Funciones auxiliares

        public function sanitizePostString()
        {
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
        }

        public function redirect($url = null)
        {
            if (is_null($url) || empty($url)) {
                header('location:' . URL_ROOT);
            } else {
                header('location:' . URL_ROOT . $url);
            }
        }

        public function useGetRequest()
        {
            if (!is_get_request()) {
                notAuthorizedHeader(true);
            }
        }

        public function usePostRequest()
        {
            if (!is_post_request()) {
                notAuthorizedHeader(true);
            }
        }

        public function usePutRequest()
        {
            if (!is_put_request()) {
                notAuthorizedHeader(true);
            }
        }

        public function useDeleteRequest()
        {
            if (!is_delete_request()) {
                notAuthorizedHeader(true);
            }
        }

        public function response($data = null, $error = null, $addToken = true)
        {
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

        public function checkErrors($errors, $error = ERROR_FORBIDDEN) {
            if (!is_null($errors) && count($errors) > 0) {
                $this->response($errors, $error);
            }
        }

        public function checkNewId($id, $data = null, $error = ERROR_PROCESS) {
            if (!$id || 
                is_null($id) || 
                $id <= 0) {
                $this->response($data, $error);
            }
        }

        private function get_updated_token()
        {
            if (!is_null($this->current_token)) {
                $this->current_token->dt_expire = strtotime("+" . TOKEN_DURATION . " seconds", curent_time());
            }
            return JWT::encode($this->current_token, KEY_TOKEN);
        }

        public function get_new_token($user)
        {
            $info_employe = $this->employeModel->get_by_user_id($user->id);
            $token_arr = [
                'id' => $user->id,
                'name' => $user->nombre,
                'dt_expire' => strtotime("+" . TOKEN_DURATION . " seconds", curent_time())
            ];
            if (!is_null($info_employe)) {
                $token_arr['id_empleado'] = $info_employe->id;
                $token_arr['id_local'] = $info_employe->id_local;
            }
            $token = JWT::encode($token_arr, KEY_TOKEN);
            return $token;
        }

        public function private_route($private_type = null, $id_user_request = 0)
        {
            $this->config_current_token();
            $this->config_route($private_type, $id_user_request);
        }

        private function config_current_token()
        {
            if (!is_null($this->current_token)) {
                return;
            }

            $token = $this->get_token_from_header();
            if (is_null($token)) {
                $this->response(null, ERROR_FORBIDDEN);
            }
            $token = $this->get_decoded_token($token);

            if (!$this->userModel->is_user_enabled($token->id)) {
                $this->response(['error' => "NotValidUser"], ERROR_FORBIDDEN, false);
            }
            if ($token->dt_expire < curent_time()) {
                $this->response(['error' => "InvalidSession"], ERROR_FORBIDDEN, false);
            }
            $this->current_token = $token;
        }

        private function get_token_from_header()
        {
            $valid = false;
            $headers = apache_request_headers();
            $token_header = isset($headers['Authorization']) ? $headers['Authorization'] : null;
            if (!is_null($token_header)) {
                $matches = [];
                if (preg_match('/' . KEY_BEARER . '\s(\S+)/', $token_header, $matches)) {
                    $token_header = $matches[1];
                    $valid = true;
                }
            }
            return $valid ? $token_header : null;
        }

        private function get_decoded_token($token_str)
        {
            try {
                $token_decoded = JWT::decode($token_str, KEY_TOKEN);
                return $token_decoded;
            } catch (Exception $e) {
                errorLog($e->getMessage());
            }
            $this->response(null, ERROR_FORBIDDEN);
        }

        public function route_for_admin()
        {
            if (!$this->is_current_user_admin()) {
                $this->response(['error' => "InvalidPermissions"], ERROR_FORBIDDEN);
            }
        }

        public function route_for_empleado()
        { 
            if (!$this->employeModel->is_enabled_by_id($this->get_current_employe_id())) {
                $this->response(['error' => "InvalidPermissions"], ERROR_FORBIDDEN);
            }  
        }

        public function route_for_admin_or_same_user($id)
        {
            if (is_null($id)) {
                $this->response(['error' => "NotFoundUser"], ERROR_FORBIDDEN);
            } elseif ($this->get_current_user_id() == $id) {
                return;
            } elseif (!$this->is_current_user_admin()) {
                $this->response(['error' => "NotValidUser"], ERROR_FORBIDDEN);
            }
        }

        public function get_current_user_id()
        {
            return (!is_null($this->current_token) &&
                isset($this->current_token->id)) ? $this->current_token->id : 0;
        }

        public function get_current_employe_id()
        {
            return (!is_null($this->current_token) &&
                isset($this->current_token->id_empleado)) ? $this->current_token->id_empleado : 0;
        }

        public function get_current_id_local()
        {
            // Necesita actualizacion
            return (!is_null($this->current_token) &&
                isset($this->current_token->id_local)) ? $this->current_token->id_local : 1;
        }

        public function get_current_id_empleado()
        {
            // Necesita actualizacion
            return (!is_null($this->current_token) &&
                isset($this->current_token->id_empleado)) ? $this->current_token->id_empleado : 1;
        }

        public function config_route($private_type, $id_user_request = 0)
        {
            if (
                is_null($private_type) ||
                !in_array($private_type, [CTR_EMPLEADO, CTR_ADMIN, CTR_ADMIN_SAME_USER])
            ) {
                return;
            }

            switch ($private_type) {
                case CTR_EMPLEADO:
                    $this->route_for_empleado();
                    break;

                case CTR_ADMIN_SAME_USER:
                    $this->route_for_admin_or_same_user($id_user_request);
                    break;

                default:
                    $this->route_for_admin();
                    break;
            }
        }

        private function is_current_user_admin() {
            return $this->userModel->is_user_admin($this->get_current_user_id());
        }
    }


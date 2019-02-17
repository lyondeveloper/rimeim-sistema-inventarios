<?php 

    class Users extends Controller {

        public function __construct() {
            $this->userModel = $this->model('user/Usuario');
        }
        
        public function login() {
            $this->usePostRequest();
            $data = getJsonData();
            $this->validate_login_data($data);

            $user = $this->userModel->get_user_to_auth($data->user);
            $this->validate_user_status($user);
            $new_token = $this->get_new_token($user);
            sendJsonData(['token' => $new_token]);
        }

        private function validate_login_data($data) {
            $errors = [];
            if (is_empty_array($data)) {
                $errors['params_error'] = "Parametros invalidos";
            } 
            if (empty_json_params($data, ['user', 'password'])) {
                $errors['params_error'] = "Uno o mas parametros invalidos";
            } 
            if (empty($data->user)) {
                $errors['user_error'] = "Usuario invalido";
            } 
            if (!isValidPassword($data->password)) {
                $errors['password_error'] = "Clave invalida";
            }

            if (count($errors) > 0) {
                notAuthorizedHeader();
                sendJsonData($errors, true);
            }
        }

        private function validate_user_status($user) {
            if (is_null($user) || 
                password_verify($data->password, $user->clave)) {
                notFoundHeader();
                sendJsonData(['password_error' => 'Usuario o clave incorrecta'], true);
            }  elseif (!$user->habilitado) {
                notAuthorizedHeader();
                sendJsonData(['user_error' => 'Usuario invalido'], true);
            }
        }

    }
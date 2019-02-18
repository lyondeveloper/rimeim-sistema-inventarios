<?php 

    class Users extends Controller {

        public function __construct() {
            $this->userModel = $this->model('user/Usuario');
        }
        
        // ====== Login ======
        public function login() {
            $this->usePostRequest();
            $data = getJsonData();
            $this->validate_login_data($data);
            $user = $this->userModel->get_user_to_auth($data->user);
            $this->validate_user_status($user, $data);
            $new_token = $this->get_new_token($user);

            sendResponse([
                    'token' => $new_token, 
                    'primera_sesion' => $user->primera_sesion
                ]);
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
                sendResponse($errors, 403);
            }
        }

        private function validate_user_status($user, $data) {
            if (is_null($user) || 
                !password_verify($data->password, $user->clave)) {
                sendResponse(['password_error' => 'Usuario o clave incorrecta'], 404);
            }  elseif (!$user->habilitado) {
                sendResponse(['user_error' => 'Usuario invalido'], 403);
            }
        }
        // ====== End Login ======

        // ====== Add User ======
        public function add() {
            $this->usePostRequest();
            $this->private_route();
            $this->route_for_admin($this->userModel);

            $newUser = $this->validate_add_user_data(getJsonData());
            $success = $this->userModel->add_user($newUser);
            $this->response(['success' => $success]);
        }

        private function validate_add_user_data($data) {
            $errors = [];
            if (is_empty_array($data)) {
                $errors['params_error'] = "Parametros invalidos";
            } elseif (empty_json_params($data, ['nombre', 'correo', 'password', 'admin'])) {
                $errors['params_error'] = "Uno o mas parametros invalidos";
            } else {
                $data->nombre = trim($data->nombre);
                $data->nombre_usuario = trim($data->nombre_usuario);
                $data->correo = trim($data->correo);
                $data->password = trim($data->password);
                $data->id_usuario_agregado_por = $this->get_current_user_id();

                if (!isEmail($data->correo) || 
                    $this->userModel->exists_user_with_email($data->correo)) {
                    $errors['correo_error'] = "Correo invalido o en uso";
                }
                if (!empty($data->nombre_usuario) && 
                    $this->userModel->exists_user_with_username($data->nombre_usuario)) {
                    $errors['nombre_usuario_error'] = "Nombre de usuario en uso";
                }
                if (!isValidPassword($data->password)) {
                    $errors['password_error'] = "Clave invalida";
                }
            }

            if (count($errors) > 0) {
                sendResponse($errors, 403);
            } 
            $data->password = get_hash_password($data->password);
            return $data;
        }
        // ====== End Add User ======

        // ====== Update User  ======
        public function update($id) {
            $this->usePutRequest();
            $this->private_route();
            $this->route_for_admin_or_same_user($id, $this->userModel);
            
            $data = $this->valid_update_user_data(getJsonData(), $id);
            $success = $this->userModel->update_user($data);
            $this->response(['success' => $success]);
        }

        private function valid_update_user_data($data, $id) {
            $errors = [];
            if (is_empty_array($data)) {
                $errors['params_error'] = "Parametros invalidos";  
            } elseif (empty_json_params($data, ['nombre', 'nombre_usuario'])) {
                $errors['params_error'] = "Uno o mas parametros invalidos";
            } else {
                if (!$this->userModel->can_user_update_username($id, $data->nombre_usuario)) {
                    $errors['nombre_usuario_error'] = "Nombre de usuario no disponible";
                }
            }

            if (count($errors) > 0) {
                sendResponse($errors, 403);
            }
            $data->id = $id;
            return $data;
        }
        // ====== End Update User  ======

    }
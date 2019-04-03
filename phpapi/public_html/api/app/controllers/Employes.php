<?php

    /* 
    Descripcion:
    Este controlador se encarga de dar respuesta web 
    a todas las peticiones referentes a Empleados

    Acceso:
    Administrador
    */

    class Employes extends Controller {

        public function __construct() {
            $this->initController(CTR_ADMIN);
            $this->localModel = $this->model('Local');
        }

        // Get all
        public function get() {
            $this->useGetRequest();
            $employes = $this->parse_get_empleados_to_json($this->employeModel->get());
            $this->response($employes);
        }

        private function parse_get_empleados_to_json($employes) {
            $locales = (object)[];
            $users = (object)[];

            foreach($employes as &$employe) {
                $id_local = $employe->id_local;
                $id_usuario = $employe->id_usuario;
                $id_usuario_creado_por = $employe->id_usuario_creado_por;

                if (!isset($locales->$id_local)) {
                    $locales->$id_local = $this->localModel->get_by_id($id_local);
                }
                if (!isset($users->$id_usuario)) {
                    $users->$id_usuario = $this->userModel->get_by_id($id_usuario);
                }
                if (!isset($users->$id_usuario_creado_por)) {
                    $users->$id_usuario_creado_por = $this->userModel->get_by_id($users->$id_usuario_creado_por);
                }

                unset($employe->id_local);
                unset($employe->id_usuario);
                unset($employe->id_usuario_creado_por);

                $employe->local = $locales->$id_local;
                $employe->usuario = $users->$id_usuario;
                $employe->usuario_creador = $users->$id_usuario_creado_por;
            }
            return $employes;
        }
        // Get all <!>

        public function get_bylocal($id_local) {
            $this->useGetRequest();
            $employes = $this->employeModel->get_by_local($id_local);
            $this->response($employes);
        }

        public function get_one($id) {
            $this->useGetRequest();
            $user = $this->userModel->get_by_id($id);
            if (is_null($user)) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->response_get_user($user, $id);
        }

        private function response_get_user($user, $id) {
            $locals = (object)[];
            $users = (object)[];
            $employe_nodes = $this->employeModel->get_by_user_id($id);

            foreach($employe_nodes as &$employe) {
                $id_local = $employe->id_local;
                $id_usuario_creado_por = $employe->id_usuario_creado_por;

                if (!isset($locals->$id_local)) {
                    $newLocal = $this->localModel->get_by_id($employe->id_local);
                    unset($newLocal->id_usuario_creado_por);
                    $locals->$id_local = $newLocal;
                }
                if (!isset($users->$id_usuario_creado_por)) {
                    $users->$id_usuario_creado_por = $this->userModel->get_by_id($id_usuario_creado_por);
                }
                unset($employe->id_local);
                unset($employe->id_usuario_creado_por);
                unset($employe->id_usuario);
                $employe->local = $locals->$id_local;
                $employe->usuario_creador = $users->$id_usuario_creado_por;
            }
            $user->registros = $employe_nodes;
            $this->response($user);
        }

        public function add() {
            $this->usePostRequest();
            $data = $this->validate_add_data(getJsonData());
            $newId = $this->employeModel->add($data);
            $this->checkNewId($newId);
            $newEmploye = $this->employeModel->get_by_id($newId);
            $this->response($newEmploye);
        }

        private function validate_add_data($data) {
            $errors = [];

            if (is_null($data)) {
                $errors['params_error'] = "Parametros invalidos";
            } else {
                if (!isset($data->id_local) || 
                    !$this->localModel->get_by_id($data->id_local)) {
                    $errors['local_error'] = "Local invalido";
                }
                if (!isset($data->id_usuario) || 
                    !$this->userModel->is_user_enabled($data->id_usuario)) {
                    $errors['usuario_error'] = "Usuario invalido";

                } elseif ($this->employeModel->exists_user_in_local($data->id_usuario, $data->id_local)) {
                    $errors['usuario_error'] = "Usuario previamente registrado en el local";
                }
                if (!isset($data->admin)) {
                    $errors['admin_error'] = "Campo requerido";
                }
                if (!isset($data->habilitado)) {
                    $errors['habilitado_error'] = "Campo requerido";
                }
            }

            $this->checkErrors($errors);
            $data->id_usuario_creador = $this->get_current_user_id();
            return $data;
        }

        public function update($id, $id_usuario) {
            $this->usePutRequest();
            $data = $this->validate_update_data(getJsonData(), $id);
            $success = $this->employeModel->update($data);
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            } 
            $user = $this->userModel->get_by_id($id_usuario);
            if (is_null($user)) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->response_get_user($user, $id_usuario);
        }

        private function validate_update_data($data, $id) {
            $errors = [];

            if (is_null($data)) {
                $errors['params_error'] = "Parametros invalidos";
            } else {
                if (!isset($data->id_local) || 
                    is_null($this->localModel->get_by_id($data->id_local))) {
                    $errors['local_error'] = "Local invalido";
                } 
                if (!isset($data->admin)) {
                    $errors['admin_error'] = "Campo invalido";
                }
                if (!isset($data->habilitado)) {
                    $errors['habilitado_error'] = "Campo invalido";
                }
            }

            $this->checkErrors($errors);
            $data->id = $id;
            return $data;
        }

        public function delete($id) {
            $this->useDeleteRequest();
            $success = $this->employeModel->delete($id, $this->get_current_user_id());
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->response();
        }
    }
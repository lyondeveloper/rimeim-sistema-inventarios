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

        public function get() {
            $this->useGetRequest();
            $employes = $this->employeModel->get();
            $this->response($employes);
        }

        public function get_bylocal($id_local) {
            $this->useGetRequest();
            $employes = $this->employeModel->get_by_local($id_local);
            $this->response($employes);
        }

        public function get_one($id) {
            $this->useGetRequest();
            $employe = $this->employeModel->get_by_id($id);
            if (is_null($employe)) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->response($employe);
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

        public function update($id) {
            $this->usePutRequest();
            $data = $this->validate_update_data(getJsonData(), $id);
            $success = $this->employeModel->update($data);
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            } 
            $updatedEmploye = $this->employeModel->get_by_id($id);
            $this->response($updatedEmploye);
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
<?php 

    /* 
    Descripcion:
    Esta clase se encarga de responder a todas las consultas web
    referentes a Locales

    Acceso: 
    Administradores
    */

    class Locals extends Controller {

        public function __construct() {
            $this->initController(CTR_ADMIN);
            $this->localModel = $this->model('Local');
        }

        public function get() {
            $this->useGetRequest();
            $locals = $this->localModel->get();
            $this->response($locals);
        }

        public function get_one($id) {
            $this->useGetRequest();
            $local = $this->localModel->get_by_id($id);
            if (is_null($local)) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $local->empleados = $this->employeModel->get_by_local($id);
            $this->response($local);
        }

        public function add() {
            $this->usePostRequest();
            $data = $this->validate_add_data(getJsonData());

            $newId = $this->localModel->add($data);
            $this->checkNewId($newId);
            $newLocal = $this->localModel->get_by_id($newId);
            $this->response($newLocal);
        }

        private function validate_add_data($data) {
            $errors = [];

            if (is_null($data)) {
                $errors['params_error'] = "Parametros invalidos";
            }  else {
                if (!isset($data->nombre) || 
                    empty($data->nombre)) {
                    $errors['nombre_error'] = "Nombre invalido";
                }
                if (isset($data->codigo) || 
                    !empty($data->codigo)) {
                    $exists = $this->localModel->exists_with_code($data->codigo);
                    if ($exists) {
                        $errors['codigo_error'] = "El codigo ya se encuentra en uso";
                    }
                } else {
                    $data->codigo = null;
                }

                $data = json_set_null_params_if_not_exists($data, ['descripcion', 
                                                                    'descripcion_ubicacion', 
                                                                    'color_hex', 
                                                                    'es_bodega', 
                                                                    'latitud', 
                                                                    'longitud']);
            }

            $this->checkErrors($errors);
            $data->id_usuario = $this->get_current_user_id();
            return $data;
        }

        // Update
        public function update($id) {
            $this->usePutRequest();
            $data = $this->validate_update_data(getJsonData(), $id);
            $success = $this->localModel->update($data);
            if (!$success) {
                $this->response(null, ERROR_PROCESS);
            }
            $updatedLocal = $this->localModel->get_by_id($id);
            $this->response($updatedLocal);
        }

        private function validate_update_data($data, $id) {
            $errors = [];

            if (is_null($data)) {
                $errors['params_error'] = "Parametros invalidos";
            } else {
                if (!isset($data->nombre) || 
                    empty($data->nombre)) {
                    $errors['nombre_error'] = "Nombre invalido";
                }
                if (!isset($data->codigo) || 
                    $this->localModel->exists_with_code_and_not_same($data->codigo, $id)) {
                    $errors['codigo_error'] = "Codigo invalido o en uso";
                } 
                if (!isset($data->descripcion)) {
                    $errors['descripcion_error'] = "Descripcion invalida";
                }
                if (!isset($data->descripcion_ubicacion)) {
                    $errors['descripcion_ubicacion_error'] = "Descripcion de ubicacion invalida";
                }
                if (!isset($data->color_hex)) {
                    $errors['color_hex_error'] = "Color invalido";
                }
                if (!isset($data->es_bodega)) {
                    $errors['es_bodega_error'] = "Campo invalido";
                }
                if (!isset($data->latitud)) {
                    $errors['latitud_error'] = "Campo invalido";
                }
                if (!isset($data->longitud)) {
                    $errors['longitud_error'] = "Campo invalido";
                }
            }

            $this->checkErrors($errors);
            $data->id = $id;
            return $data;
        }

        public function delete($id) {
            $this->useDeleteRequest();
            $success = $this->localModel->delete_by_id($id, $this->get_current_user_id());
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->response();
        }
    }


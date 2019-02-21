<?php 
    /*
    Este clase se encarga de completar todas las peticiones 
    referentes a los Clientes en la base de datos
    */

    class Clients extends Controller {

        public function __construct() {
            $this->initController(CTR_EMPLEADO);
            $this->clientModel = $this->model('Client');
        }

        public function get() {
            $this->useGetRequest();
            $clients = $this->clientModel->get_all();
            $this->response($clients);
        }

        public function get_one($id) {
            $this->useGetRequest();
            $client = $this->clientModel->get_by_id($id);
            if (is_null($client)) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->response($client);
        }

        public function add() {
            $this->usePostRequest();
            $data = $this->validate_add_data(getJsonData());
            $new_id = $this->clientModel->add($data);
            if (is_null($new_id)) {
                $this->response(null, ERROR_PROCESS);
            } 
            $new_empleado = $this->clientModel->get_by_id($new_id);
            $this->response($new_empleado);
        }

        private function validate_add_data($data) {
            $errors = [];
            if (is_null($data)) {
                $errors['params_error'] = "Parametros invalidos";
            } else {
                if (!isset($data->nombre) || 
                    empty($data->nombre)) {
                    $errors['nombre_error'] = "Nombre de cliente invalido";
                } 
                if (!isset($data->es_empresa)) {
                    $data->es_empresa = false;
                }

                if (isset($data->codigo) && 
                    !isEmpty($data->codigo) &&
                    $this->clientModel->get_by_code($data->codigo)) {
                    $errors['codigo_error'] = "Codigo no disponible o en uso";
                } else {
                    $data->codigo = null;
                }

                if (isset($data->rtn) && 
                    !isEmpty($data->rtn) &&
                    $this->clientModel->get_by_rtn($data->rtn)) {
                    $errors['rtn_error'] = "Rtn no disponible o en uso";
                } else {
                    $data->rtn = null;
                }

                if (isset($data->correo) && 
                    !isEmpty($data->correo) &&
                    isEmail($data->correo) &&
                    $this->clientModel->get_by_email($data->correo)) {
                    $errors['correo_error'] = "Correo no disponible o en uso";
                } else {
                    $data->correo = null;
                }

                if (isset($data->telefono) && 
                    !isEmpty($data->telefono) &&
                    $this->clientModel->get_by_phone($data->telefono)) {
                    $errors['telefono_error'] = "Telefono no disponible o en uso";
                } else {
                    $data->telefono = null;
                }
            } 

            if (count($errors) > 0) {
                $this->response($errors, ERROR_FORBIDDEN);
            }
            $data->id_local = $this->get_current_id_local();
            $data->id_empleado = $this->get_current_id_empleado();
            return $data;
        }

        public function update($id) {
            $this->usePutRequest();
            $data = $this->validate_update_data(getJsonData(), $id);
            $success = $this->clientModel->update($data);
            if (!$success) {
                $this->response(null, ERROR_PROCESS);
            }
            $updated_client = $this->clientModel->get_by_id($id);
            $this->response($updated_client);
        }

        private function validate_update_data($data, $id) {
            $errors = [];
            if (is_null($data)) {
                $errors['params_error'] = "Parametros invalidos";
            } else {
                if (!isset($data->nombre) ||
                    empty($data->nombre)) {
                    $errors['nombre_error'] = "Campo vacio o invalido";
                }

                if (!isset($data->es_empresa) || !is_bool($data->es_empresa)) {
                    $data->es_empresa = false;
                }

                if (isset($data->codigo) && 
                    !isEmpty($data->codigo)) {
                    $client = $this->clientModel->get_by_code($data->codigo);
                    if (!is_null($client) && 
                        $client->id != $id) {
                        $errors['codigo_error'] = "Codigo no disponible o en uso";
                    }
                } else {
                    $data->codigo = null;
                }

                if (isset($data->rtn) && 
                    !isEmpty($data->rtn)) {
                    $client = $this->clientModel->get_by_rtn($data->rtn);
                    if (!is_null($client) && 
                        $client->id != $id) {
                        $errors['rtn_error'] = "Rtn no disponible o en uso";
                    }
                } else {
                    $data->rtn = null;
                }

                if (isset($data->correo) && 
                    !isEmpty($data->correo) &&
                    isEmail($data->correo)) {
                    $client = $this->clientModel->get_by_email($data->correo);
                    if (!is_null($client) && 
                        $client->id != $id) {
                        $errors['correo_error'] = "Correo no disponible o en uso";
                    }
                } else {
                    $data->correo = null;
                }

                if (isset($data->telefono) && 
                    !isEmpty($data->telefono)) {
                    $client = $this->clientModel->get_by_phone($data->telefono);
                    if (!is_null($client) && 
                        $client->id != $id) {
                            $errors['telefono_error'] = "Telefono no disponible o en uso";
                    }
                } else {
                    $data->telefono = null;
                }
            }

            if (count($errors) > 0) {
                $this->response($errors, ERROR_FORBIDDEN);
            }

            $data->id = $id;
            return $data;
        }

        public function delete($id) {
            $this->useDeleteRequest();
            $success = $this->clientModel->delete_by_id($id);
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->response();
        }
    }
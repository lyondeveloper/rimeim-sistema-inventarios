<?php 
    /*
    Descripcion:
    Este clase se encarga de completar todas las peticiones 
    referentes a los Clientes en la base de datos

    Acceso: 
    Empleados CTR_EMPLEADO o administradores
    */

    class Clients extends Controller {

        public function __construct() {
            $this->initController(CTR_EMPLEADO);
            $this->clientModel = $this->model('Client');
            $this->clientProductModel = $this->model('ClientProductPrice');
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

        // ========== ClientProducPrice =============
        public function products_price($id_cliente) {
            $this->useGetRequest();
            $products_price = $this->clientProductModel->get($id_cliente);
            $this->response($products_price);
        }

        public function product_price($id_cliente, $id_producto) {
            $this->useGetRequest();
            $product_price = $this->clientProductModel->get_by_idc_idp($id_cliente, $id_producto);
            if (is_null($product_price)) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->response($product_price);
        }

        public function add_product_price() {
            $this->usePostRequest();
            $data = $this->validate_add_product_price_data(getJsonData());
            $newId = $this->clientProductModel->add($data);
            $this->checkNewId($newId);
            $new_product_price =  $this->clientProductModel->get_by_id($newId);
            $this->response($new_product_price);
        }

        private function validate_add_product_price_data($data) {
            $errors = [];

            if (!isset($data->id_cliente)) {
                $errors['cliente_error'] = "Cliente invalido";
            }
            if (!isset($data->id_producto)) {
                $errors['producto_error'] = "Producto invalido";
            }
            if (!isset($data->precio)) {
                $errors['precio_error'] = "Precio invalido";
            }
            if (isset($data->id_cliente) && 
                isset($data->id_producto)) {
                $product_price = $this->clientProductModel->get_by_idc_idp($data->id_cliente, $data->id_producto);
                if ($product_price) {
                    $errors['producto_error'] = "Producto ya registrado";
                }
            }

            $this->checkErrors($errors);
            return $data;
        }

        public function update_product_price($id, $precio) {
            $this->usePutRequest();
            $success = $this->clientProductModel->update_by_id($id, $precio);
            if(!$success) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $updated_product_price = $this->clientProductModel->get_by_id($id);
            $this->response($updated_product_price);
        }

        public function delete_product_price($id) {
            $this->useDeleteRequest();
            $success = $this->clientProductModel->delete_by_id($id);
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->response();
        }
    }
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
            $this->fileupload = new FileUpload();
            $this->fileModel = $this->model('DBFile');
            $this->clientModel = $this->model('Client');
            $this->clientProductModel = $this->model('ClientProductPrice');
        }

        public function get() {
            $this->useGetRequest();
            $clients = $this->clientModel->get_all();
            foreach($clients as &$client) {
                $client = $this->parse_client_to_send($client);
            }
            $this->response($clients);
        }

        public function get_one($id) {
            $this->useGetRequest();
            $client = $this->clientModel->get_by_id($id);
            if (is_null($client)) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $client->precios_productos = $this->clientProductModel->get($id);
            $client = $this->parse_client_to_send($client);
            $this->response($client);
        }

        public function add() {
            $this->usePostRequest();
            $data = $this->validate_add_data(getJsonData('json_data'));
            $new_id = $this->clientModel->add($data);
            if (is_null($new_id)) {
                $this->response(null, ERROR_PROCESS);
            } 
            $this->add_clients_products_prices($new_id, 
                                                isset($data->precios_productos) ? 
                                                    $data->precios_productos : []);
            $new_client = $this->clientModel->get_by_id($new_id);
            $new_client->precios_productos = $this->clientProductModel->get($new_id);
            $new_client = $this->parse_client_to_send($new_client);
            $this->response($new_client);
        }

        private function validate_add_data($data) {
            $errors = [];
            if (!isset($data->nombre) || 
                empty($data->nombre)) {
                $errors['nombre_error'] = "Nombre de cliente invalido";
            } 
            if (!isset($data->es_empresa)) {
                $data->es_empresa = false;
            }

            if (isset($data->codigo)) {
                if (!empty($data->codigo)) {
                    if($this->clientModel->get_by_code($data->codigo)) {
                        $errors['codigo_error'] = "Codigo no disponible o en uso";
                    }
                } else {
                    $data->codigo = null;
                }
                
            } else {
                $errors['codigo_error'] = "Campo invalido";
            }

            if (isset($data->rtn)) {
                if (!empty($data->rtn)) {
                    if ($this->clientModel->get_by_rtn($data->rtn)) {
                        $errors['rtn_error'] = "Rtn no disponible o en uso";
                    }
                } else {
                    $data->rtn = null;
                }
            } else {
                $errors['rtn_error'] = "Campo invalido";
            }

            if (isset($data->correo) && 
                !empty($data->correo)) {
                if (!isEmail($data->correo)) {
                    $errors['correo_error'] = "Campo con formato invalido";

                } elseif ($this->clientModel->get_by_email($data->correo)) {
                    $errors['correo_error'] = "Correo no disponible o en uso";
                }
            } elseif (!isset($data->correo)) {
                $errors['correo_error'] = "Campo invalido";
            } else {
                $data->correo = null;
            }

            if (isset($data->telefono) && 
                !empty($data->telefono)) {
                if ($this->clientModel->get_by_phone($data->telefono)) {
                    $errors['telefono_error'] = "Telefono no disponible o en uso";
                }
            } elseif(!isset($data->telefono)) {
                $errors['telefono_error'] = "Campo invalido";
            } else {
                $data->telefono = null;
            }

            $this->checkErrors($errors);

            $data->id_local = $this->get_current_id_local();
            $data->id_empleado = $this->get_current_employe_id();
            $new_image_id = $this->get_new_image_id();
            $data->id_archivo = $new_image_id != null ? 
                                            $new_image_id : 
                                            (isset($data->imagen->id) ? $data->imagen->id : null);
            return $data;
        }

        private function add_clients_products_prices($client_id, $precios_productos) {
            if(!is_array($precios_productos) || 
                count($precios_productos) <= 0) {
                return;
            }
            foreach($precios_productos as &$producto_precio) {
                if (isset($producto_precio->id_producto) && 
                    isset($producto_precio->precio)) {
                    $producto_precio->id_cliente = $client_id;
                    $this->clientProductModel->add($producto_precio);
                }
            }
        } // END OF ADD

        public function update($id) {
            $this->usePostRequest();
            if ($this->clientModel->get_by_id($id) == null) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $data = $this->validate_update_data(getJsonData('json_data'), $id);
            $success = $this->clientModel->update($data);
            $this->update_client_products_prices($id, 
                                                isset($data->precios_productos) ? 
                                                    $data->precios_productos : []);
            $this->delete_image_if_need(isset($data->imagen) ? $data->imagen : null, $data->id_archivo);

            $updated_client = $this->clientModel->get_by_id($id);
            $updated_client->precios_productos = $this->clientProductModel->get($id);
            $updated_client = $this->parse_client_to_send($updated_client);
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
                    !empty($data->codigo)) {
                    $client = $this->clientModel->get_by_code($data->codigo);
                    if (!is_null($client) && 
                        $client->id != $id) {
                        $errors['codigo_error'] = "Codigo no disponible o en uso";
                    }
                } else {
                    $data->codigo = null;
                }

                if (isset($data->rtn) && 
                    !empty($data->rtn)) {
                    $client = $this->clientModel->get_by_rtn($data->rtn);
                    if (!is_null($client) && 
                        $client->id != $id) {
                        $errors['rtn_error'] = "Rtn no disponible o en uso";
                    }
                } else {
                    $data->rtn = null;
                }

                if (isset($data->correo) && 
                    !empty($data->correo) &&
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
                    !empty($data->telefono)) {
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
            $new_image_id = $this->get_new_image_id();
            $data->id_archivo = $new_image_id != null ? 
                                            $new_image_id : 
                                            (isset($data->imagen->id) ? $data->imagen->id : null);
            
            
            return $data;
        }

        private function update_client_products_prices($id_cliente, $precios_productos) {
            foreach($precios_productos as &$product_price) {
                if (isset($product_price->id_producto) &&
                    isset($product_price->precio)) {

                    $product_price->id_cliente = $id_cliente;
                    if (isset($product_price->eliminado) && 
                        $product_price->eliminado == true) {
                        $this->clientProductModel->delete_by_id($product_price->id);

                    } elseif(isset($product_price->actualizado) && 
                        $product_price->actualizado == true) {
                        $this->clientProductModel->update_by_id($product_price->id, $product_price->precio);

                    } elseif (!isset($product_price->id) && 
                        $this->clientProductModel->get_by_idc_idp($id_cliente, $product_price->id_producto) == null) {
                        
                        $product_price->id_cliente = $id_cliente;
                        $this->clientProductModel->add($product_price);
                    }
                }
            }
        } // End of UPDATE

        public function delete($id) {
            $this->useDeleteRequest();
            $success = $this->clientModel->delete_by_id($id, 
                                            $this->get_current_employe_id());
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->response();
        }

        public function search() {
            $this->usePostRequest();
            $data = getJsonData();
            if (!isset($data->field) || 
                !is_string($data->field)) {
                $this->response(null, ERROR_PROCESS);
            }
            $clients = $this->clientModel->search($data->field);
            foreach($clients as &$client) {
                $client = $this->parse_client_to_send($client);
            }
            $this->response($clients);
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

        public function update_product_price() {
            $this->usePutRequest();
            $data = $this->validate_update_product_price(getJsonData());
            $success = $this->clientProductModel->update_by_id($data->id, $data->precio);
            if(!$success) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $updated_product_price = $this->clientProductModel->get_by_id($id);
            $this->response($updated_product_price);
        }

        private function validate_update_product_price($data) {
            $errors = [];

            if (!isset($data->id) ||
                !($data->id >= 0)) {
                $errors['id_error'] = "Campo invalido";
            }
            if (!isset($data->precio) || 
                !($data->precio >= 0)) {
                $errors['precio_error'] = "Campo invalido";
            }

            $this->checkErrors($errors);
            return $data;
        }

        public function delete_product_price($id) {
            $this->useDeleteRequest();
            $success = $this->clientProductModel->delete_by_id($id);
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->response();
        }

        private function parse_client_to_send($client) {
            if ($client->id_archivo) {
                $client->imagen = $this->fileModel->get_file_by_id($client->id_archivo);
                $client->imagen->url = get_server_file_url($client->imagen->url);
            } else {
                $client->imagen = null;
            }

            unset($client->id_archivo);
            return $client;
        }

        // Helpers
        
        private function delete_image_if_need($currentImage, $new_image_id) {
            if ($new_image_id != null && 
                $currentImage != null &&
                $currentImage->id != $new_image_id) {
                $file_url = str_replace(URLROOT, "", $currentImage->url);
                if ($this->fileupload->delete_file($file_url)) {
                    $this->fileModel->delete_by_id($currentImage->id);
                }
            }
        }

        private function get_new_image_id() {
            $files = $this->fileModel->save_all_files($this->fileupload, 
                                                        $this->get_current_user_id(), 
                                                        1);
            if (count($files) > 0) {
                return $files[0]->id;
            }
            return null;
        }
    }
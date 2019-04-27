<?php 
    /* 
    PROVIDERS

    Esta clase se encarga de ejecutar todas las peticiones HTTP
    para todo lo relacionado a PROVEEDORES
    */

    class Providers extends Controller {

        public function __construct()
        {
            $this->initController(CTR_EMPLEADO);
            $this->fileupload = new FileUpload();
            $this->providerModel = $this->model('Provider');
            $this->providerProductModel = $this->model('ProviderProduct');
            $this->fileModel = $this->model('DBFile');
            $this->productModel = $this->model('Product');
        }

        public function search() {
            $this->usePostRequest();
            $json_data = getJsonData();
            if (!isset($json_data->field)) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $providers = $this->providerModel->search($json_data->field);
            foreach($providers as &$provider) {
                $provider = $this->parse_provider_to_send($provider);
            }
            $this->response($providers);
        }

        public function get() {
            $this->useGetRequest();
            $providers = $this->providerModel->get();
            foreach($providers as &$provider) {
                $provider = $this->parse_provider_to_send($provider);
            }
            $this->response($providers);
        }

        public function get_one($id) {
            $this->useGetRequest();
            $provider = $this->providerModel->get_by_id($id);
            if (is_null($provider)) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $provider = $this->parse_provider_to_send($provider, true);
            $this->response($provider);
        }

        private function parse_provider_to_send($provider, $is_singular = false) {
            if ($provider->id_imagen) {
                $provider->imagen = $this->fileModel->get_file_by_id($provider->id_imagen);
                $provider->imagen->url = get_server_file_url($provider->imagen->url);
            } else {
                $provider->imagen = null;
            }
            
            if ($is_singular) {
                $provider->productos = $this->providerProductModel->get_by_provider($provider->id);
                foreach($provider->productos as &$proveedor_producto) {
                    $producto = $this->productModel->get_by_id($proveedor_producto->id_producto);
                    $proveedor_producto->precio_especial = $proveedor_producto->precio;
                    $proveedor_producto->producto_nombre = $producto->nombre;
                    $proveedor_producto->producto_precio = $producto->precio;
                    unset($proveedor_producto->id_proveedor);
                    unset($proveedor_producto->precio);
                }
            }
            unset($provider->id_imagen);
            return $provider;
        }

        public function add() {
            $this->usePostRequest();
            $data = $this->validate_add_data(getJsonData('json_data'));
            $newId = $this->providerModel->add($data);
            $this->checkNewId($newId);
            $this->add_provider_products($newId, isset($data->productos) ? $data->productos : []);
            $newProvider = $this->providerModel->get_by_id($newId);
            $newProvider = $this->parse_provider_to_send($newProvider, true);
            $this->response($newProvider);
        }

        private function validate_add_data($data) {
            $errors = [];
            if (!isset($data->nombre) || 
                empty($data->nombre)) {
                $errors['nombre_error'] = "Campo invalido";
            }

            if (!isset($data->rtn)) {
                $errors['rtn_error'] = "Campo invalido";
            } else {
                if (!empty($data->rtn) && 
                    $this->providerModel->get_by_rtn($data->rtn) != null) {
                    $errors['rtn_error'] = "RTN no disponible";
                } elseif (empty($data->rtn)) {
                    $data->rtn = null;
                }
            }

            if (!isset($data->telefono)) {
                $errors['telefono_error'] = "Campo invalido";
            } else {
                if (!empty($data->telefono) && 
                    $this->providerModel->exists_by_telefono($data->telefono)) {
                    $errors['telefono_error'] = "Telefono invalido";
                } elseif(empty($data->telefono)) {
                    $data->telefono = null;
                }
            }

            if (!isset($data->correo) || 
                (
                    !empty($data->correo) &&
                    !isEmail($data->correo))
                ) {
                $errors['correo_error'] = "Campo invalido";
            } else {
                if (!empty($data->correo) && 
                    $this->providerModel->exists_by_correo($data->correo)) {
                    $errors['correo_error'] = "Correo invalido";
                } elseif(empty($data->correo)) {
                    $data->correo = null;
                }
            }

            $this->checkErrors($errors);
            $data->id_empleado = $this->get_current_employe_id();
            $data->id_imagen = $this->get_new_provider_image_id();
            return $data;
        }

        private function get_new_provider_image_id() {
            $files = $this->fileModel->save_all_files($this->fileupload, 
                                                        $this->get_current_user_id(), 
                                                        1);
            if (count($files) > 0) {
                return $files[0]->id;
            }
            return null;
        }

        private function add_provider_products($id_proveedor, $productos) {
            foreach($productos as &$producto) {
                if (isset($producto->id_producto) && 
                    isset($producto->precio)) {
                    $producto->id_proveedor = $id_proveedor;
                    $this->providerProductModel->add($producto);
                }
            }
        } // END OF ADD


        public function update($id) {
            $this->usePostRequest();
            if ($this->providerModel->get_by_id($id) == null) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $data = $this->validate_update_data($id, getJsonData('json_data'));
            $success = $this->providerModel->update($data);
            if ($success) {
                $this->delete_provider_image_if_need($data->imagen, $data->id_imagen);
            }
            $this->update_provider_products($id, isset($data->productos) ? $data->productos : []);
            $updatedProvider = $this->providerModel->get_by_id($id);
            $updatedProvider = $this->parse_provider_to_send($updatedProvider, true);
            $this->response($updatedProvider);
        }

        private function validate_update_data($id, $data) {
            $errors = [];
            if (!isset($data->nombre) || 
                empty($data->nombre)) {
                $errors['nombre_error'] = "Campo invalido";
            }

            if (!isset($data->rtn)) {
                $errors['rtn_error'] = "Campo invalido";
            } else{
                if ($proveedor = $this->providerModel->get_by_rtn($data->rtn)) {
                    if ($id != $proveedor->id) {
                        $errors['rtn_error'] = "RTN no disponible";
                    }
                    unset($proveedor);
                }
            }

            if (isset($data->telefono) && 
                !empty($data->telefono)) { 
                if ( $proveedor = $this->providerModel->get_by_telefono($data->telefono))  {
                    if ($id != $proveedor->id) {
                        $errors['telefono_error'] = "Telefono no disponible";
                    }
                    unset($proveedor);
                }
            } else {
                $data->telefono = null;
            }

            if (!isset($data->correo) || 
                !isEmail($data->correo)) {
                $errors['correo_error'] = "Campo invalido";
            } elseif ($proveedor = $this->providerModel->get_by_correo($data->correo)) {
                if ($id != $proveedor->id) {
                    $errors['correo_error'] = "Correo invalido";
                }
                unset($proveedor);
            }

            $this->checkErrors($errors);
            $data->id = $id;

            $new_image_id = $this->get_new_provider_image_id();
            $data->id_imagen = $new_image_id != null ? 
                                            $new_image_id : 
                                            (isset($data->imagen->id) ? $data->imagen->id : null);
            
            return $data;
        }

        private function delete_provider_image_if_need($currentImage, $new_image_id) {
            if ($new_image_id != null && 
                $currentImage != null &&
                $currentImage->id != $new_image_id) {
                $file_url = str_replace(URLROOT, "", $currentImage->url);
                if ($this->fileupload->delete_file($file_url)) {
                    $this->fileModel->delete_by_id($currentImage->id);
                }
            }
        }

        private function update_provider_products($id_proveedor, $productos) {
            foreach($productos as &$producto) {
                if (isset($producto->precio_especial)) {

                    if (isset($producto->eliminado) && 
                        $producto->eliminado == true) {
                        $this->providerProductModel->delete($producto->id);

                    } elseif (isset($producto->actualizado) && 
                                    $producto->actualizado == true) {
                        $this->providerProductModel->update($producto->id, $producto->precio_especial);

                    } elseif (!isset($producto->id) && 
                        isset($producto->id_producto) && 
                        !$this->providerProductModel->exists_by_idprod_idp($producto->id_producto, $id_proveedor)) {

                        $producto->id_proveedor = $id_proveedor;
                        $producto->precio = $producto->precio_especial;
                        $this->providerProductModel->add($producto);
                    }
                    
                }
            }
        }
        // END OF UPDATE

        public function delete($id) {
            $this->useDeleteRequest();
            $success = $this->providerModel->delete($id);
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->response();
        }
        
    }
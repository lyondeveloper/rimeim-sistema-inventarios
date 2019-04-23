<?php 

    /* 
    Descripcion:
    Este controlador maneja todas las peticiones web referentes a Productos

    Acceso:
    Empleados
    */

    class Products extends Controller {

        public function __construct()
        {
            $this->initController(CTR_EMPLEADO);
            $this->fileupload = new FileUpload();
            $this->fileModel = $this->model('DBFile');
            $this->productModel = $this->model('Product');
            $this->productImagesModel = $this->model('ProductImages');
            $this->productLocalModel = $this->model('ProductLocal');
            $this->productLocalUbicationModal = $this->model('ProductLocalUbication');

            $this->brandModel = $this->model('Brand');
            $this->vehiculeType = $this->model('VehiculeType');
            $this->localModel = $this->model('Local');
        }

        public function get($id_local) {
            $this->useGetRequest();
            $products = [];

            if (!is_null($id_local) && $id_local > 0) {
                $products = $this->productLocalModel->get_by_local($id_local);
            } elseif ($this->is_current_user_admin()) {
                $products = $this->productModel->get();
            }
            
            if (count($products) > 0) {
                foreach ($products as &$product) {
                    if (!is_null($id_local) && $id_local > 0) {
                        $product = $this->productModel->get_by_id($product->id_producto);
                    } 
                    $product = $this->parse_product_to_send($product);
                }
            }
            $this->response($products);
        }

        private function parse_product_to_send($product, $is_singular = false) {
            $product->marca = $this->brandModel->get_by_id($product->id_marca);
            $product->tipo_vehiculo = $this->vehiculeType->get_by_id($product->id_tipo_vehiculo);

            if ($is_singular) {
                $product->imagenes = $this->productImagesModel->get_by_product($product->id);
                $product->distribucion = $this->productLocalModel->get_by_id_product($product->id);

                foreach($product->distribucion as &$distribucion) {
                    $distribucion->local = $this->localModel->get_by_id($distribucion->id_local);

                    $ubicacion = $this->productLocalUbicationModal->get($distribucion->id);
                    if (count($ubicacion) > 0) {
                        $distribucion->ubicacion = $ubicacion[0]->ubicacion;
                        $distribucion->id_ubicacion = $ubicacion[0]->id;
                    }
                }
            } else {
                $product->imagen = $this->productImagesModel->get_principal_image($product->id);
            }

            unset($product->id_marca);
            unset($product->id_tipo_vehiculo);
            return $product;
        }

        public function get_one($id) {
            $this->useGetRequest();
            $product = $this->productModel->get_by_id($id);
            if (is_null($product)) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $product = $this->parse_product_to_send($product, true);
            $this->response($product);
        }

        public function add() {
            $this->usePostRequest();
            $data = $this->validate_add_data(getJsonData('json_data'));
            $newId = $this->productModel->add($data);
            $this->checkNewId($newId);
            $this->add_product_images($newId);
            $this->add_product_distribution($newId, isset($data->distribucion) ? $data->distribucion: []);
            $product = $this->productModel->get_by_id($newId);
            $product = $this->parse_product_to_send($product, true);
            $this->response($product);
        }

        private function validate_add_data($data) {
            $errors = [];
            if (isset($data->id_tipo_vehiculo)) {
            }
            if (isset($data->id_marca)) {
            }
            if (!isset($data->codigo_barra) || 
                empty($data->codigo_barra)) {
                $errors['codigo_barra_error'] = "Campo invalido";
            } elseif ($this->productModel->get_by_codigo_barra($data->codigo_barra)) {
                $errors['codigo_barra_error'] = "Codigo de barra en uso";
            }
            if (!isset($data->nombre) || 
                empty($data->nombre)) {
                $errors['nombre_error'] = "Campo invalido";
            }
            if (!isset($data->descripcion)) {
                $errors['descripcion_error'] = "Campo invalido";
            }
            if (!isset($data->raro) || 
                !is_bool($data->raro)) {
                $errors['raro_error'] = "Campo invalido";
            }
            if (!isset($data->precio) || 
                empty($data->precio)) {
                $errors['precio_error'] = "Campo invalido";
            }
            if (!isset($data->existencia) || 
                empty($data->existencia)) {
                $errors['existencia_error'] = "Campo invalido";
            }
            if (!isset($data->cantidad_minima)) {
                $errors['cantidad_minima_error'] = "Campo invalido";
            } 
            $this->checkErrors($errors);
            return $data;
        }

        private function add_product_images($id_producto) {
            $product_files = $this->fileModel->save_all_files($this->fileupload, $this->get_current_user_id());
            $x = 0;
            foreach($product_files as $file) {
                $file->id_producto = $id_producto;
                $file->id_archivo = $file->id;
                $file->principal = $x == 0;
                $this->productImagesModel->add($file);
                $x = $x + 1;
            }
        } 

        private function add_product_distribution($id_producto, $array_distribucion) {
            if (!is_array($array_distribucion) ||
                count($array_distribucion) <= 0) {
                return;
            }
            foreach($array_distribucion as &$distribucion) {
                if (isset($distribucion->id_local) && 
                    isset($distribucion->existencia) && 
                    isset($distribucion->cantidad_minima) &&
                    isset($distribucion->ubicacion)) {
                    $distribucion->id_producto = $id_producto;

                    if (!$this->productLocalModel->exists_by_idp_idl($id_producto, $distribucion->id_local)) {
                        $new_producto_local_id = $this->productLocalModel->add($distribucion);
                        if($new_producto_local_id > 0) {
                            $this->productLocalUbicationModal->add($new_producto_local_id, $distribucion->ubicacion);
                        }
                        unset($new_producto_local_id);
                    } 
                }
            }
        } // END OF ADD

        public function update($id) {
            $this->usePostRequest();
            if($this->productModel->get_by_id($id) == null) {
                $this->response(null, ERROR_NOTFOUND);
            }

            $data = $this->validate_update_data(getJsonData('json_data'), $id);
            
            $this->productModel->update($data);
            $this->update_producto_distribution($id, isset($data->distribucion) ? $data->distribucion: []);
            $this->update_product_images($id, isset($data->imagenes) ? $data->imagenes : []);
            $updated_product = $this->productModel->get_by_id($id);
            $updated_product = $this->parse_product_to_send($updated_product, true);
            $this->response($updated_product);
        }

        private function validate_update_data($data, $id) {
            $errors = [];
            if (isset($data->id_tipo_vehiculo)) {
            }
            if (isset($data->id_marca)) {
            }
            if (!isset($data->codigo_barra) || 
                empty($data->codigo_barra)) {
                $errors['codigo_barra_error'] = "Campo invalido";

            } elseif ($product = $this->productModel->get_by_codigo_barra($data->codigo_barra)) {
                if ($product->id != $id) {
                    $errors['codigo_barra_error'] = "Codigo de barra en uso";
                }
            }
            if (!isset($data->nombre) || 
                empty($data->nombre)) {
                $errors['nombre_error'] = "Campo invalido";
            }
            if (!isset($data->descripcion)) {
                $errors['descripcion_error'] = "Campo invalido";
            }
            if (!isset($data->raro) || 
                !is_bool($data->raro)) {
                $errors['raro_error'] = "Campo invalido";
            }
            if (!isset($data->precio) || 
                !($data->precio >= 0) ) {
                $errors['precio_error'] = "Campo invalido";
            }
            if (!isset($data->existencia) || 
                !($data->existencia >= 0)) {
                $errors['existencia_error'] = "Campo invalido";
            }
            if (!isset($data->cantidad_minima) ||
                !($data->cantidad_minima >= 0)) {
                $errors['cantidad_minima_error'] = "Campo invalido";
            } 

            $this->checkErrors($errors);
            $data->id = $id;
            return $data;
        }

        private function update_producto_distribution($id_producto, $array_distribucion) {
            if (!is_array($array_distribucion) || 
                count($array_distribucion) <= 0) {
                    processLog("El array para actualizaar es corto");
                return;
            }

            foreach($array_distribucion as &$distribucion) {
                if (isset($distribucion->existencia) &&
                    isset($distribucion->cantidad_minima) && 
                    isset($distribucion->ubicacion) && 
                    isset($distribucion->id_local)) {
                    
                    if (isset($distribucion->eliminado) &&
                        $distribucion->eliminado == true) {
                        $this->productLocalModel->delete($distribucion->id);

                    } elseif(isset($distribucion->actualizado) &&
                        $distribucion->actualizado == true) {
                        $this->productLocalModel->update($distribucion);
                        $this->productLocalUbicationModal->update($distribucion->id_ubicacion, 
                                                                    $distribucion->ubicacion);

                    } elseif (!isset($distribucion->id)) {
                        if (!$this->productLocalModel->exists_by_idp_idl($id_producto, $distribucion->id_local)) {

                            $distribucion->id_producto = $id_producto;
                            $new_producto_local_id = $this->productLocalModel->add($distribucion);
                            if($new_producto_local_id > 0) {
                                $this->productLocalUbicationModal->add($new_producto_local_id, $distribucion->ubicacion);
                            }
                            unset($new_producto_local_id);
                        } 
                    }
                }
            }
        } 
        
        private function update_product_images($id_producto, $array_imagenes) {
            foreach($array_imagenes as &$product_image) {
                if (isset($product_image->eliminado) && 
                    $product_image->eliminado === true) {
                    if($this->productImagesModel->delete($product_image->id)) {

                        $file_url = str_replace(URLROOT, "", $product_image->url);
                        if ($this->fileupload->delete_file($file_url)) {
                            $this->fileModel->delete_by_id($product_image->id_archivo);
                        }
                    }
                }
            }
            $this->add_product_images($id_producto);
        } // END OF UPDATE

        public function delete($id) {
            $this->useDeleteRequest();
            $success = $this->productModel->delete($id);
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->response();
        }

        // ======== Distribucion de productos en locales ========

        public function add_product_local() {
            $this->usePostRequest();
            $data = $this->validate_add_product_local(getJsonData());
            $newId = $this->productLocalModel->add($data);
            $this->checkNewId($newId);
            $this->productLocalUbicationModal->add($newId, $data->ubicacion);

            $newProductLocal = $this->get_producto_local_by_id($newId);
            $this->response($newProductLocal);
        }

        private function validate_add_product_local($data) {
            $errors = [];

            if (!isset($data->id_producto) ||
                is_null($this->productModel->get_by_id($data->id_producto))) {
                $errors['pl_producto_error'] = "Campo invalido";
            }

            if (!isset($data->id_local) || 
                is_null($this->localModel->get_by_id($data->id_local))) {
                $errors['pl_local_error'] = "Campo invalido";
            }

            if (count($errors) == 0) {
                if ($this->productLocalModel->exists_by_idp_idl($data->id_producto, $data->id_local)) {
                    $errors['pl_producto_error'] = "El producto ya se encuentra registrado en el local";
                }
            }

            if (!isset($data->existencia)) {
                $errors['pl_existencia_error'] = "Campo invalido";
            }

            if (!isset($data->cantidad_minima)) {
                $errors['pl_cantidad_minima'] = "Campo invalido";
            }

            if (!isset($data->ubicacion)) {
                $errors['pl_ubicacion'] = "Campo invalido";
            }

            $this->checkErrors($errors);
            return $data;
        }

        public function update_product_local($id) {
            $this->usePutRequest();
            $data = $this->validate_update_product_local_data($id, getJsonData());
            $success = $this->productLocalModel->update($data);
            if (!$success) {
                $this->response(null, ERROR_PROCESS);
            }
            $this->productLocalUbicationModal->update($data->id_ubicacion, $data->ubicacion);
            $updatedProductLocal = $this->get_producto_local_by_id($id);
            $this->response($updatedProductLocal);
        }

        private function validate_update_product_local_data($id, $data) {
            $errors = [];

            if (!isset($data->existencia) || 
                !($data->existencia >= 0 )) {
                $errors['pl_existencia_error'] = "Campo invalido";
            }

            if (!isset($data->cantidad_minima) ||
                !($data->cantidad_minima >= 0)) {
                $errors['pl_cantidad_minima_error'] = "Campo invalido";
            }

            if (!isset($data->ubicacion) ||
                empty($data->ubicacion)) {
                $errors['pl_ubicacion_error'] = "Campo invalido";
            }

            if (!isset($data->id_ubicacion) || 
                !($data->id_ubicacion >= 0)) {
                $errors['pl_id_ubicacion_error'] = "Campo invalido";
            }

            $this->checkErrors($errors);

            $data->id = $id;
            return $data;
        }// END OF UPDATE

        public function delete_product_local($id) {
            $this->useDeleteRequest();
            $success = $this->productLocalModel->delete($id);
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            } 
            $this->response();
        }


        // Helpers
        private function get_producto_local_by_id($id) {
            $productLocal = $this->productLocalModel->get_minified_byid($id);
            $productLocal->local = $this->localModel->get_by_id($productLocal->id_local);

            $productLocalUbication = $this->productLocalUbicationModal->get($id);
            if (count($productLocalUbication) > 0) {
                $productLocal->ubicacion = $productLocalUbication[0]->ubicacion;
                $productLocal->id_ubicacion = $productLocalUbication[0]->id;
            }
            return $productLocal;
        }
    }
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
                    $product = $this->parse_product_to_send($product);
                }
            }
            $this->response($products);
        }

        private function parse_product_to_send($product) {
            $product->marca = $this->brandModel->get_by_id($product->id_marca);
            $product->tipo_vehiculo = $this->vehiculeType->get_by_id($product->id_tipo_vehiculo);
            $product->imagen = $this->productImagesModel->get_principal_image($product->id);
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
            $product = $this->parse_product_to_send($product);
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
            $product->images = $this->productImagesModel->get_by_product($newId);
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
            foreach($array_distribucion as &$distrubucion) {
                if (isset($distrubucion->id_local) && 
                    isset($distrubucion->existencia) && 
                    isset($distrubucion->cantidad_minima) &&
                    isset($distrubucion->ubicacion)) {

                    $distrubucion->id_producto = $id_producto;
                    $new_producto_local_id = $this->productLocalModel->add($distrubucion);
                    if($new_producto_local_id > 0) {
                        $this->productLocalUbicationModal->add($new_producto_local_id, $distrubucion->ubicacion);
                    }
                    unset($new_producto_local_id);
                }
            }
        } // END OF ADD

        public function update($id) {
            $this->usePutRequest();
            $data = $this->validate_update_data(getJsonData(), $id);
            $success = $this->productModel->update($data);
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->update_producto_distribution($id, isset($data->distribucion) ? $data->distribucion: []);
            $updated_product = $this->productModel->get_by_id($id);
            $updated_product = $this->parse_product_to_send($updated_product);
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
                (!is_double($data->precio) && !is_int($data->precio)) ) {
                $errors['precio_error'] = "Campo invalido";
            }
            if (!isset($data->existencia) || 
                !is_int($data->existencia)) {
                $errors['existencia_error'] = "Campo invalido";
            }
            if (!isset($data->cantidad_minima)) {
                $errors['cantidad_minima_error'] = "Campo invalido";
            } elseif ($data->cantidad_minima == -1) {
                $data->cantidad_minima = 100;
            }

            $this->checkErrors($errors);
            $data->id = $id;
            return $data;
        }

        private function update_producto_distribution($id_producto, $array_distribucion) {
            if (!is_array($array_distribucion) || 
                count($array_distribucion) <= 0) {
                return;
            }

            foreach($array_distribucion as &$distribucion) {
                if (isset($distribucion->id) && 
                    isset($distribucion->existencia) &&
                    isset($distribucion->cantidad_minima)) {
                    
                    if (isset($distribucion->eliminado) &&
                        $distribucion->eliminado == true) {
                        $this->productLocalModel->delete($distribucion->id);
                    } else {
                        $this->productLocalModel->update($distribucion);
                        $this->productLocalUbicationModal->update($distribucion->id, 
                                                                    $distribucion->ubicacion);
                    }
                }
            }
        } // END OF UPDATE

        public function delete($id) {
            $this->useDeleteRequest();
            $success = $this->productModel->delete($id);
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->response();
        }

        public function add_producto_local() {
            $this->usePostRequest();
            $data = $this->validate_add_product_local(getJsonData());
            $newId = $this->productLocalModel->add($data);
            $this->checkNewId($newId);
            $this->productLocalUbicationModal->add($newId, $data->ubicacion);

            $newProductLocal = $this->productLocalModel->get_minified_byid($newId);
            $newProductLocal->local = $this->localModel->get_by_id($newProductLocal->id_local);
            $newProductLocal->ubicacion = $this->productLocalUbicationModal->get($newId)[0]->ubicacion;
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
    }
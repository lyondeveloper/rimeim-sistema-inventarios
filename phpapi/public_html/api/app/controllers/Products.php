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
            $this->fileupload = new FileUpload;
            $this->fileModel = $this->model('DBFile');
            $this->productModel = $this->model('Product');
            $this->productImagesModel = $this->model('ProductImages');
            $this->productLocalModel = $this->model('ProductLocal');
            $this->brandModel = $this->model('Brand');
            $this->vehiculeType = $this->model('VehiculeType');
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
            $data = $this->validate_add_data(getJsonData());
            $newId = $this->productModel->add($data);
            $this->checkNewId($newId);
            $product_files = $this->fileModel->save_all($this->fileupload, $this->get_current_user_id());

            $x = 0;
            foreach($product_files as $file) {
                $file->id_producto = $newId;
                $file->id_archivo = $file->id;
                $file->principal = $x == 0;
                $this->productImagesModel->add($file);
                $x = $x + 1;
            }

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
            return $data;
        }

        private function add_images() {

        }

        public function update($id) {
            $this->usePutRequest();
            $data = $this->validate_update_data(getJsonData(), $id);
            $success = $this->productModel->update($data);
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            }
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

        public function delete($id) {
            $this->useDeleteRequest();
            $success = $this->productModel->delete($id);
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->response();
        }
    }
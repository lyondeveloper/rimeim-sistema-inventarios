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
            $this->productModel = $this->model('Product');
        }

        public function get() {
            $this->useGetRequest();
            $products = $this->productModel->get();
            $this->response($products);
        }

        public function get_one($id) {
            $this->useGetRequest();
            $product = $this->productModel->get_by_id($id);
            if (is_null($product)) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->response($product);
        }

        public function add() {
            $this->usePostRequest();
            $data = $this->validate_add_data(getJsonData());
            $newId = $this->productModel->add($data);
            $this->checkNewId($newId);
            $product = $this->productModel->get_by_id($newId);
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

        public function update($id) {
            $this->usePutRequest();
            $data = $this->validate_update_data(getJsonData(), $id);
            $success = $this->productModel->update($data);
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $updated_product = $this->productModel->get_by_id($id);
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
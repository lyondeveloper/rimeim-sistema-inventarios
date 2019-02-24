<?php 

    /* 
    Descripcion:
    Este controlador se encarga de dar respuesta a todas
    las peticiones web que sean references a Marca
    
    Acceso:
    Empleado
    */

    class Brands extends Controller {

        public function __construct()
        {
            $this->initController(CTR_EMPLEADO);
            $this->brandModel = $this->model('Brand');
        }

        public function get() {
            $this->useGetRequest();
            $brands = $this->brandModel->get();
            $this->response($brands);
        }

        public function get_one($id) {
            $this->useGetRequest();
            $brand = $this->brandModel->get_by_id($id);
            if (is_null($brand)) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->response($brand);
        }

        public function add() {
            $this->usePostRequest();
            $data = $this->validate_add_data(getJsonData());
            $newId = $this->brandModel->add($data->nombre, $data->descripcion);
            $this->checkNewId($newId);
            $new_brand = $this->brandModel->get_by_id($newId);
            $this->response($new_brand);
        }

        private function validate_add_data($data) {
            $errors = [];

            if (!isset($data->nombre) || 
                empty($data->nombre)) {
                $errors['nombre_error'] = "Nombre invalido";
            }
            if (!isset($data->descripcion)) {
                $errors['descripcion_error'] = "Descripcion invalida";
            }

            $this->checkErrors($errors);
            return $data;
        }

        public function update($id) {
            $this->usePutRequest();
            $data = $this->validate_update_data(getJsonData(), $id);
            $success = $this->brandModel->update($data);
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            } 
            $updated_brand = $this->brandModel->get_by_id($id);
            $this->response($updated_brand);
        }

        private function validate_update_data($data, $id) {
            $errors = [];

            if (!isset($data->nombre) || 
                empty($data->nombre)) {
                $errors['nombre_error'] = "Nombre invalido";
            }
            if (!isset($data->descripcion)) {
                $errors['descripcion_error'] = "Descripcion invalida";
            }

            $this->checkErrors($errors);
            $data->id = $id;
            return $data;
        }

        public function delete($id) {
            $this->useDeleteRequest();
            $success = $this->brandModel->delete($id);
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            } 
            $this->response();
        }
    }
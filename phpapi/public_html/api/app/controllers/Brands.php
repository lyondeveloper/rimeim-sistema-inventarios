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
            $this->fileupload = new FileUpload();
            $this->fileModel = $this->model('DBFile');
        }

        public function get() {
            $this->useGetRequest();
            $brands = $this->brandModel->get();
            foreach($brands as &$brand) {
                $brand = $this->parse_item_to_send($brand);
            }
            $this->response($brands);
        }

        public function search() {
            $this->usePostRequest();
            $data = getJsonData();
            if (!isset($data->field)) {
                $this->response(null);
            }
            $brands = $this->brandModel->search($data->field);
            foreach($brands as &$brand) {
                $brand = $this->parse_item_to_send($brand);
            }
            $this->response($brands);
        }

        public function get_one($id) {
            $this->useGetRequest();
            $brand = $this->brandModel->get_by_id($id);
            if (is_null($brand)) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $brand = $this->parse_item_to_send($brand);
            $this->response($brand);
        }

        public function add() {
            $this->usePostRequest();
            $data = $this->validate_add_data(getJsonData('json_data'));
            $newId = $this->brandModel->add($data);
            $this->checkNewId($newId);
            $new_brand = $this->brandModel->get_by_id($newId);
            $new_brand = $this->parse_item_to_send($new_brand);
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
            $data->id_archivo = $this->get_new_image_id();
            return $data;
        }

        public function update($id) {
            $this->usePostRequest();
            $data = $this->validate_update_data(getJsonData('json_data'), $id);
            $success = $this->brandModel->update($data); 
            $this->delete_image_if_need(isset($data->imagen) ? $data->imagen : null, $data->id_archivo);
            $updated_brand = $this->brandModel->get_by_id($id);
            $updated_brand = $this->parse_item_to_send($updated_brand);
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

            $new_image_id = $this->get_new_image_id();
            $data->id_archivo = $new_image_id ? $new_image_id : 
                                                (isset($data->imagen->id) ? $data->imagen->id : null);
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

        // Helpers
        private function get_new_image_id() {
            $files = $this->fileModel->save_all_files($this->fileupload, 
                                                        $this->get_current_user_id(), 
                                                        1);
            if (count($files) > 0) {
                return $files[0]->id;
            }
            return null;
        }

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

        private function parse_item_to_send($item) {
            if ($item->id_archivo) {
                $item->imagen = $this->fileModel->get_file_by_id($item->id_archivo);
                $item->imagen->url = get_server_file_url($item->imagen->url);
            } else {
                $item->imagen = null;
            }
            unset($item->id_archivo);
            return $item;
        }
    }

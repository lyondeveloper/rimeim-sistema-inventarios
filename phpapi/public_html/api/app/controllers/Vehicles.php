<?php 

    /* 
    Descripcion:
    Este controlador se encarga de dar respuesta a todas
    las peticiones web que sean references a Marca
    
    Acceso:
    Empleado
    */

    class Vehicles extends Controller {

        public function __construct()
        {
            $this->initController(CTR_EMPLEADO);
            $this->vehicleModel = $this->model('VehiculeType');
            $this->fileupload = new FileUpload();
            $this->fileModel = $this->model('DBFile');
        }

        public function get() {
            $this->useGetRequest();
            $vehicles = $this->vehicleModel->get();
            foreach($vehicles as &$vehicle) {
                $vehicle = $this->parse_item_to_send($vehicle);
            }
            $this->response($vehicles);
        }

        public function get_one($id) {
            $this->useGetRequest();
            $vehicle = $this->vehicleModel->get_by_id($id);
            if (is_null($vehicle)) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $vehicle = $this->parse_item_to_send($vehicle);
            $this->response($vehicle);
        }

        public function add() {
            $this->usePostRequest();
            $vehicleData = $this->validate_add_data(getJsonData('json_data'));
            $newId = $this->vehicleModel->add($vehicleData);
            $this->checkNewId($newId);
            $newVehicle = $this->vehicleModel->get_by_id($newId);
            $newVehicle = $this->parse_item_to_send($newVehicle);
            $this->response($newVehicle);
        }

        private function validate_add_data($data) {
            $errors = [];

            if (is_null($data)||
                !isset($data->nombre) ||
                empty($data->nombre)) {
                $errors['nombre_error'] = "Campo invalido";
            }

            if (is_null($data)||
                !isset($data->descripcion) ||
                empty($data->descripcion)) {
                $errors['descripcion_error'] = "Campo invalido";
            } 

            $this->checkErrors($errors);
            $data->id_archivo = $this->get_new_image_id();
            return $data;
        }

        public function update($id) {
            $this->usePostRequest();
            if ( $this->vehicleModel->get_by_id($id) == null) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $dataUpdated = $this->validate_update_data(getJsonData('json_data'), $id);
            $success = $this->vehicleModel->update($dataUpdated);
            $this->delete_image_if_need(isset($data->imagen) ? $data->imagen : null, $data->id_archivo);
            $updatedVehicle = $this->vehicleModel->get_by_id($id);
            $updatedVehicle = $this->parse_item_to_send($updatedVehicle);
            $this->response($updatedVehicle);
        }

        private function validate_update_data($data, $id) {
            $errors = [];

            if (is_null($data)||
                !isset($data->nombre) ||
                empty($data->nombre)) {
                $errors['nombre_error'] = "Campo invalido";
            }

            if (is_null($data)||
                !isset($data->descripcion) ||
                empty($data->descripcion)) {
                $errors['descripcion_error'] = "Campo invalido";
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
            $success = $this->vehicleModel->delete($id);
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
                unset($item->id_archivo);
            } else {
                $item->imagen = null;
            }
            return $item;
        }
    }
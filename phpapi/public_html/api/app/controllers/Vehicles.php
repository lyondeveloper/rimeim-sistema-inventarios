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
        }

        public function get() {
            $this->useGetRequest();
            $vehicles = $this->vehicleModel->get();
            $this->response($vehicles);
        }

        public function get_one($id) {
            $this->useGetRequest();
            $vehicle = $this->vehicleModel->get_by_id($id);
            if (is_null($vehicle)) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->response($vehicle);
        }

        public function add() {
            $this->usePostRequest();
            $vehicleData = $this->validate_add_data(getJsonData());
            $newId = $this->vehicleModel->add($vehicleData);
            $this->checkNewId($newId);
            $newVehicle = $this->vehicleModel->get_by_id($newId);
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
            return $data;
        }

        public function update($id) {
            $this->usePutRequest();
            $dataUpdated = $this->validate_update_data(getJsonData(), $id);
            $success = $this->vehicleModel->update($dataUpdated);
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $updatedVehicle = $this->vehicleModel->get_by_id($id);
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
    }
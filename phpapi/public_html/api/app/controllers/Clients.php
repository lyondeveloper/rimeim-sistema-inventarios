<?php 
    /*
    Este clase se encarga de completar todas las peticiones 
    referentes a los Clientes en la base de datos
    */

    class Clients extends Controller {

        public function __construct() {
            $this->initController(CTR_EMPLEADO);
            $this->clientModel = $this->model('Client');
        }

        public function get() {
            $this->useGetRequest();
            $clients = $this->clientModel->get_all();
            $this->response($clients);
        }

        public function get_one($id) {
            $this->useGetRequest();
            $client = $this->clientModel->get_by_id($id);
            if (is_null($client)) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->response($client);
        }

        public function add() {
            $this->usePostRequest();

        }

        private function validate_add_data($data) {
            $errors = [];

            if (is_null($data)) {
                $errors['params_error'] = "Parametros invalidos";
            } else {
                if (!isset($data->nombre) || 
                    empty($data->nombre)) {
                    $errors['nombre_error'] = "Nombre de cliente invalido";
                } 
                if (!isset($data->es_empresa)) {
                    $data->es_empresa = false;
                }
                
                $errors['params_error'] = "Uno o mas parametros invalidos";
            } 

            if (count($errors) > 0) {
                $this->response($errors, ERROR_FORBIDDED);
            }
            return $data;
        }
    }
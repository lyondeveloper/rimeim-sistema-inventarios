<?php 

    /*
    Esta clase se encarga de resolver todas las solicitudes 
    referentes a archivos locales y en base de datos

    Al ser una clase de uso unico para usuarios loggeados, la funcion private_route 
    esta incluida en el constructor de clase
    */

    class Files extends Controller {

        public function __construct() {
            $this->private_route();
            $this->userModel = $this->model('User');
            $this->dbFileModel = $this->model('DBFile');
            $this->localFileModel = $this->model('LFile');
        }

        public function get() {
            $this->useGetRequest();
            $files = $this->dbFileModel->get_files();
            $this->response($files);
        }

        public function get_one($id) {
            $this->useGetRequest();
            $file = $this->dbFileModel->get_file_by_id($id);
            $this->response($file);
        }

        // Funcion en proceso, esta requiere recibir data real
        public function add() {
            $this->usePostRequest();
            //$this->dbFileModel->add_file();
        }

        public function delete($id) {
            $this->useDeleteRequest();
            $file = $this->dbFileModel->get_file_by_id($id);
            if (is_null($file)) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $success = $this->dbFileModel->delete_by_id($id);
            if (!$success) {
                $this->response(null, ERROR_NOTFOUND);
            }
            $this->localFileModel->delete_by_url($file->url);
        }
    }
<?php 

    /*
    Descripcion: 
    Esta clase se encarga de resolver todas las solicitudes 
    referentes a archivos locales y en base de datos

    Al ser una clase de uso unico para usuarios loggeados, la funcion private_route 
    esta incluida en el constructor de clase

    Accesso: Solo a empleados - CTR_EMPLEADO
    */

    class Files extends Controller {

        public function __construct() {
            //$this->initController(CTR_PRIVATE);
            $this->fileupload = new FileUpload;
            $this->dbFileModel = $this->model('DBFile');
        }

        public function upload() {
            $files_count = $this->fileupload->get_count_files_upload();
            $files_saved = [];
            for ($x=0; $x < $files_count; $x++) { 
                if($new_file_path = $this->fileupload->save_upload_file($x)) {
                    
                    if ($new_id = $this->dbFileModel->add_file(1, 
                                                pathinfo($new_file_path, PATHINFO_EXTENSION), 
                                                $new_file_path)) {
                        $new_file = [
                            'id' => $new_id,
                            'path' => get_server_file_url($new_file_path),
                            'name' => $this->fileupload->get_upload_file_name($x)
                        ];
                        array_push($files_saved, $new_file);
                    }
                }
            }
            $this->response($files_saved);
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
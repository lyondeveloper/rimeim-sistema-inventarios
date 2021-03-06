<?php

    /*
    Esta clase se encarga de hacer todas las operaciones 
    referentes a archivos en base de datos
    */

    class DBFile {

        public function __construct() {
            $this->db = new Database;
        }

        public function save_all_files($fileupload, $id_usuario, $max_files = null) {
            $new_files = $fileupload->save_all_uploads($max_files);
            foreach($new_files as &$file) {
                if($new_id = $this->add_file($id_usuario, 
                                            $file->type, 
                                            $file->path)) {
                    $file->id = $new_id;
                }
            }
            return $new_files;
        }

        public function get_files() {
            $this->db->query('call proc_get_archivos();');
            return $this->db->resultSet();
        }

        public function get_file_by_id($id) {
            $this->db->query('call func_get_archivo_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->single();
        }

        public function get_file_by_url($url) {
            $this->db->query('call proc_get_archivo_by_url(:p_url);');
            $this->db->bind(':p_url', $url);
            return $this->db->single();
        }

        public function add_file($id_usuario, $p_type, $p_url) {
            $this->db->query('call proc_add_archivo(:p_id_usuario,:p_url,:p_type);');
            $this->db->bind(':p_id_usuario', $id_usuario);
            $this->db->bind(':p_type', $p_type);
            $this->db->bind(':p_url', $p_url);
            return $this->db->single()->id;
        }

        public function delete_by_id($id) {
            $this->db->query('call proc_delete_archivo_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->success();
        }
    }
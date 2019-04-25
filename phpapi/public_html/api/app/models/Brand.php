<?php 

    /* 
    Esta clase se encarga de realizar todas las consultas en 
    base de datos para Marca
    */

    class Brand {

        public function __construct() {
            $this->db = new Database;
        }

        public function search($field) {
            $this->db->query('call proc_search_marcas(:p_field);');
            $this->db->bind(':p_field', $field);
            return $this->db->resultSet();
        }

        public function get() {
            $this->db->query('call proc_get_marcas();');
            return $this->db->resultSet();
        }

        public function get_by_id($id) {
            $this->db->query('call proc_get_marca_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->single();
        }

        public function add($params) {
            $this->db->query('call proc_add_marca(:p_nombre, :p_descripcion, :p_id_archivo);');
            $this->db->bind(':p_nombre', $params->nombre);
            $this->db->bind(':p_descripcion', $params->descripcion);
            $this->db->bind(':p_id_archivo', $params->id_archivo);
            return $this->db->newId();
        }

        public function update($params) {
            $this->db->query('call proc_update_marca_by_id(:p_id, :p_nombre, :p_descripcion, :p_id_archivo);');
            $this->db->bind(':p_id', $params->id);
            $this->db->bind(':p_nombre', $params->nombre);
            $this->db->bind(':p_descripcion', $params->descripcion);
            $this->db->bind(':p_id_archivo', $params->id_archivo);
            return $this->db->success();
        }

        public function delete($id) {
            $this->db->query('call proc_delete_marca_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->success();
        }        
    }
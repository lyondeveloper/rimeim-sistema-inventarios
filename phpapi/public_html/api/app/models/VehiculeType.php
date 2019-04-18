<?php 

    /*
    Esta clase se encarga de ejecutar todas las consultas 
    referentes a Tipo Vehiculo
     */

    class VehiculeType {

        public function __construct() {
            $this->db = new Database;
        }

        public function get() {
            $this->db->query('call proc_get_tipo_vehiculos();');
            return $this->db->resultSet();
        }

        public function get_by_id($id) {
            $this->db->query('call proc_get_tipo_vehiculo_byid(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->single();
        }

        public function add($params) {
            $this->db->query('call proc_add_tipo_vehiculo(:p_nombre, :p_descripcion);');
            $this->db->bind(':p_nombre', $params->nombre);
            $this->db->bind(':p_descripcion', $params->descripcion);
            return $this->db->newId();
        }

        public function update($params) {
            $this->db->query('call proc_update_tipo_vehiculo_by_id(:p_id, :p_nombre, :p_descripcion);');
            $this->db->bind(':p_id', $params->id);
            $this->db->bind(':p_nombre', $params->nombre);
            $this->db->bind(':p_descripcion', $params->descripcion);
            return $this->db->success();
        }

        public function delete($id) {
            $this->db->query('call proc_delete_tipo_vehiculo_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->success();
        }
    }
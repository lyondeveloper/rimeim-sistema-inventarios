<?php 

    /*
    Esta clase se encarga de realizar las consultas 
    en base de datos para Locales 
    */

    class Local {

        public function __construct() {
            $this->db = new Database;
        }

        public function get() {
            $this->db->query('call proc_get_locales();');
            return $this->db->resultSet();
        }

        public function get_by_id($id) {
            $this->db->query('call proc_get_local_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->result();
        }

        public function add($params) {
            $this->db->query('call proc_add_local(:p_id_usuario, :p_nombre, :p_codigo, :p_descripcion, :p_descripcion_ubicacion, :p_color_hex, :p_es_bodega, :p_latitud, :p_longitud);');
            $this->db->bind(':p_id_usuario', $params->id_usuario);
            $this->db->bind(':p_nombre', $params->nombre);
            $this->db->bind(':p_codigo', $params->codigo);
            $this->db->bind(':p_descripcion', $params->descripcion);
            $this->db->bind(':p_descripcion_ubicacion', $params->descripcion_ubicacion);
            $this->db->bind(':p_color_hex', $params->color_hex);
            $this->db->bind(':p_es_bodega', $params->es_bodega);
            $this->db->bind(':p_latitud', $params->latitud);
            $this->db->bind(':p_longitud', $params->longitud);
            return $this->db->newId();
        }

        public function update($params) {
            $this->db->query('call proc_update_local_by_id(:p_id, :p_nombre, :p_codigo, :p_descripcion, :p_descripcion_ubicacion, :p_color_hex, :p_es_bodega, :p_latitud, :p_longitud);');
            $this->db->bind(':p_id', $params->id);
            $this->db->bind(':p_nombre', $params->nombre);
            $this->db->bind(':p_codigo', $params->codigo);
            $this->db->bind(':p_descripcion', $params->descripcion);
            $this->db->bind(':p_descripcion_ubicacion', $params->descripcion_ubicacion);
            $this->db->bind(':p_color_hex', $params->color_hex);
            $this->db->bind(':p_es_bodega', $params->es_bodega);
            $this->db->bind(':p_latitud', $params->latitud);
            $this->db->bind(':p_longitud', $params->longitud);
            return $this->db->success();
        }

        public function delete_by_id($id, $id_usuario) {
            $this->db->query('call proc_delete_local_by_id(:p_id, :p_id_usuario);');
            $this->db->bind(':p_id', $id);
            $this->db->bind(':p_id_usuario', $id_usuario);
            return $this->db->success();
        }
    }
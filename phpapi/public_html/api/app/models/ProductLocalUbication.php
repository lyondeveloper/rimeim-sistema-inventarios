<?php 

    /*
    Esta clase se encarga de ejecutar todos los procedimientos
    para Producto Local Ubicacion
    */

    class ProductLocalUbication {

        public function __construct() {
            $this->db = new Database;
        }

        public function get($id_producto_local) {
            $this->db->query('call proc_get_producto_local_ubicacion(:p_id);');
            $this->db->bind(':p_id', $id_producto_local);
            return $this->db->resultSet();
        }   

        public function add($id_producto_local, $ubicacion) {
            $this->db->query('call proc_add_producto_local_ubicacion(:p_id_producto_local, :p_ubicacion);');
            $this->db->bind(':p_id_producto_local', $id_producto_local);
            $this->db->bind(':p_ubicacion', $ubicacion);
            return $this->db->newId();
        }

        public function update($id, $ubicacion) {
            $this->db->query('call proc_update_producto_local_ubicacion_by_id(:p_id, :p_ubicacion);');
            $this->db->bind(':p_id', $id);
            $this->db->bind(':p_ubicacion', $ubicacion);
            return $this->db->success();
        }

        public function delete($id) {
            $this->db->query('call proc_delete_producto_local_ubicacion_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->success();
        }
    }
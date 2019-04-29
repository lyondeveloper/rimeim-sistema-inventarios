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
        
        // Get by id_producto_local and id_local
        public function get_by_ipl_idl($id_pl, $id_lcl) {
            $this->db->query('call proc_get_producto_local_ubicacion_by_idpl_idlc(:p_idpl,:p_idlc);');
            $this->db->bind(':p_idpl', $id_pl);
            $this->db->bind(':p_idlc', $id_lcl);
            return $this->db->single();
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
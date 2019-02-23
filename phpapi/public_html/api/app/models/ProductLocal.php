<?php 

    /* 
    Esta clase ejecuta todos los procedimientos almacenados
    para Producto Local
    */

    class ProductLocal {

        public function __construct() {
            $this->db = new Database;
        }

        public function get_by_local($id_local) {
            $this->db->query('call proc_get_producto_local(:p_id_local);');
            $this->db->bind(':p_id_local', $id_local);
            return $this->db->newId();
        }

        public function add($params) {
            $this->db->query('call proc_add_producto_local(:p_id_producto, :p_id_local, :p_existencia, :p_cantidad_minima);');
            $this->db->bind(':p_id_producto',$params->id_producto); 
            $this->db->bind(':p_id_local',$params->id_local); 
            $this->db->bind(':p_existencia',$params->existencia); 
            $this->db->bind(':p_cantidad_minima',$params->cantidad_minima);
            return $this->db->newId();
        }

        public function update($params) {
            $this->db->query('call proc_update_producto_local_by_id(:p_id, :p_existencia, :p_cantidad_minima);');
            $this->db->bind(':p_id', $params->id);
            $this->db->bind(':p_existencia',$params->existencia); 
            $this->db->bind(':p_cantidad_minima',$params->cantidad_minima);
            return $this->db->success();
        }

        public function delete($id) {
            $this->db->query('call proc_delete_producto_local_by_id(:p_id);');
            $this->db->bind(':p_id', $params->id);
            return $this->db->success();
        }
    }
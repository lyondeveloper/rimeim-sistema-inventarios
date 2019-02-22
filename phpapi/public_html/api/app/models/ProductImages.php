<?php 

    /* 
    Esta clase ejecuta todos los procedimientos almacenados 
    referentes a Producto Imagenes
    */

    class ProductImages {

        public function __construct() {
            $this->db = new Database;
        }

        public function get_by_product($id_producto) {
            $this->db->query('call proc_get_producto_imagenes_by_producto(:p_id_producto);');
            $this->db->bind(':p_id_producto', $id_producto);
            return $this->db->resultSet();
        }

        public function add($params) {
            $this->db->query('call proc_add_producto_imagenes(:p_id_producto, :p_id_archivo, :p_principal);');
            $this->db->bind(':p_id_producto', $params->id_producto); 
            $this->db->bind(':p_id_archivo', $params->id_archivo); 
            $this->db->bind(':p_principal', $params->principal);
            return $this->db->newId();
        }

        public function update($id, $principal) {
            $this->db->query('call proc_update_producto_imagen_by_id(:p_id, :p_principal);');
            $this->db->bind(':p_id', $params->id); 
            $this->db->bind(':p_principal', $params->principal); 
            return $this->db->success();
        }

        public function delete($id) {
            $this->db->query('call proc_delete_producto_imagen_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->success();
        }
    }
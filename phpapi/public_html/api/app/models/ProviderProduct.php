<?php

    /*
    Esta clase se encarga de ejecutar todos los procedimientos
    almacenados de Proveedor Producto
    */

    class ProviderProduct {

        public function __construct() {
            $this->db = new Database;
        }

        public function get_by_provider($id_proveedor) {
            $this->db->query('call proc_get_proveedor_productos_by_proveedor(:p_id_proveedor);');
            $this->db->bind(':p_id_proveedor', $id_proveedor);
            return $this->db->resultSet();
        }

        public function add($params) {
            $this->db->query('call proc_add_proveedor_producto(:p_id_proveedor, :p_id_producto, :p_precio);');
            $this->db->bind(':p_id_proveedor', $params->id_proveedor);
            $this->db->bind(':p_id_producto', $params->id_producto);
            $this->db->bind(':p_precio', $params->precio);
            return $this->db->newId();
        }

        public function update($id, $precio) {
            $this->db->query('call proc_update_proveedor_producto(:p_id, :p_precio);');
            $this->db->bind(':p_id', $id);
            $this->db->bind(':p_precio', $precio);
            return $this->db->success();
        }

        public function delete($id) {
            $this->db->query('call proc_delete_proveedor_producto_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->success();
        }
    }
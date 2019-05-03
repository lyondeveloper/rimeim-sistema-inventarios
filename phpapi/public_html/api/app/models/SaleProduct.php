<?php

    /* 
    Esta clase se encarga de ejecutar todas las consultas
    referentes a Venta Producto    
    */

    class SaleProduct {

        public function __construct() {
            $this->db = new Database;
        }

        public function get_by_sale($id_venta) {
            $this->db->query('call proc_get_venta_producto_by_venta(:p_id_venta);');
            $this->db->bind(':p_id_venta', $id_venta);
            return $this->db->resultSet();
        }

        public function add($params) {
            $this->db->query('call proc_add_venta_producto(:p_id_venta,:p_id_producto,:p_oferta,:p_precio,:p_cantidad,:p_total);');
            $this->db->bind(':p_id_venta', $params->id_venta);
            $this->db->bind(':p_id_producto', $params->id_producto);
            $this->db->bind(':p_oferta', $params->oferta);
            $this->db->bind(':p_precio', $params->precio);
            $this->db->bind(':p_cantidad', $params->cantidad);
            $this->db->bind(':p_total', $params->total);
            return $this->db->newId();
        }

        public function update($params) {
            $this->db->query('call proc_update_venta_producto(:p_id,:p_oferta,:p_precio,:p_cantidad,:p_total);');
            $this->db->bind(':p_id', $params->id);
            $this->db->bind(':p_oferta', $params->oferta);
            $this->db->bind(':p_precio', $params->precio);
            $this->db->bind(':p_cantidad', $params->cantidad);
            $this->db->bind(':p_total', $params->total);
            return $this->db->success();
        }

        public function delete($id) {
            $this->db->query('call proc_delete_venta_producto_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->success();
        }
    }
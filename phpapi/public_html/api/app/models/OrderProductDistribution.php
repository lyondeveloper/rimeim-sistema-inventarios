<?php

    /*
    Esta clase se encarga de todas las consultas referentes
    a Peido - Producto - Reparto     
    */

    class OrderProductDistribution {
        
        public function __construct() {
            $this->db = new Database;
        }

        public function get($id_pedido_producto) {
            $this->db->query('call proc_get_pedidos_producto_reparto_by_pedido_producto(:p_id_pedido_producto);');
            $this->db->bind(':p_id_pedido_producto', $id_pedido_producto);
            return $this->db->resultSet();
        }

        public function add($params) {
            $this->db->query('call proc_add_pedido_producto_reparto(:p_id_pedido_producto, :p_id_local, :p_cantidad);');
            $this->db->bind(':p_id_pedido_producto', $params->id_pedido_producto);
            $this->db->bind(':p_id_local', $params->id_local);
            $this->db->bind(':p_cantidad', $params->cantidad);
            return $this->db->newId();
        }

        public function update($params) {
            $this->db->query('call proc_update_pedido_producto_reparto_by_id(:p_id, :p_cantidad, :p_recibido);');
            $this->db->bind(':p_id', $params->id);
            $this->db->bind(':p_cantidad', $params->cantidad);
            $this->db->bind(':p_recibido', $params->recibido);
            return $this->db->success();
        }

        public function delete($id) {
            $this->db->query('call proc_delete_pedido_producto_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->success();
        }
    }
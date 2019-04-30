<?php 

    /* 
    Esta clase ejecuta todos los procedimientos almacenados
    que tienen que ver con Pedido Producto
    */

    class OrderProduct {

        public function __construct() {
            $this->db = new Database;
        }

        public function get_by_order_id($id) {
            $this->db->query('call proc_get_pedido_productos_by_pedido(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->resultSet();
        }

        public function add($params) {
            $this->db->query('call proc_add_pedido_producto(:p_id_pedido, :p_id_producto, :p_cantidad, :p_costo);');
            $this->db->bind(':p_id_pedido', $params->id_pedido);
            $this->db->bind(':p_id_producto', $params->id_producto);
            $this->db->bind(':p_cantidad', $params->cantidad);
            $this->db->bind(':p_costo', $params->costo);
            return $this->db->newId();
        }

        public function update($params) {
            $this->db->query('call proc_update_pedido_producto_by_id(:p_id, :p_cantidad, :p_costo);');
            $this->db->bind(':p_id', $params->id);
            $this->db->bind(':p_cantidad', $params->cantidad);
            $this->db->bind(':p_costo', $params->costo);
            return $this->db->success();
        }        

        public function delete($id) {
            $this->db->query('call proc_delete_pedido_producto_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->success();
        }
    }
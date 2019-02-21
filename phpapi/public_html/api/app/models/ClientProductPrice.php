<?php 

    /*
    Esta case se encarga de ejecutar todos los procedimientos almacenados 
    referentes a Cliente Producto Precio
    */

    class ClientProductPrice {

        public function __construct() {
            $this->db = new Database;
        }

        public function add($params) {
            $this->db->query('call proc_add_cliente_producto_precio(:p_id_cliente, :p_id_producto, :p_precio);');
            $this->db->bind(':p_id_cliente', $params->id_cliente);
            $this->db->bind(':p_id_producto', $params->id_producto);
            $this->db->bind(':p_precio', $params->precio);
            return $this->db->newId();
        }

        public function update_by_id($id, $precio) {
            $this->db->query('call proc_update_cliente_producto_precio_by_id(:p_id, :p_precio);');
            $this->db->bind(':p_id', $id);
            $this->db->bind(':p_precio', $precio);
            return $this->db->success();
        }

        // Id producto / Id cliente
        public function update_by_idp_idc($params) {
            $this->db->query('call proc_update_cliente_producto_precio_by_idp_idc(:p_id_cliente, :p_id_producto, :p_precio);');
            $this->db->bind('p_id_cliente', $params->id_cliente);
            $this->db->bind('p_id_producto', $params->id_producto);
            $this->db->bind('p_precio', $params->precio);
            return $this->db->success();
        }

        public function delete_by_id($id) {
            $this->db->query('call proc_delete_cliente_producto_precio_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->success();
        }

        public function delete_by_idp_idc($id_cliente, $id_producto) {
            $this->db->query('call proc_delete_cliente_producto_precio_by_idp_idc(:p_id_cliente, :p_id_producto);');
            $this->db->bind(':p_id_cliente', $id_cliente);
            $this->db->bind(':p_id_producto', $id_producto);
            return $this->db->success();
        }
    }
<?php 

    /* 
    Esta clase ejecuta todo lo referente a 
    Pedido Solicitud
    */

    class OrderRequest {
        
        public function __construct() {
            $this->db = new Database;
        }

        public function get_by_local($id_local) {
            $this->db->query('call proc_get_pedidos_solicitud_by_local(:p_id_local);');
            $this->db->bind(':p_id_local', $id_local);
            return $this->db->resultSet();
        }

        public function get_by_pedido($id_pedido) {
            $this->db->query('call proc_get_pedido_solicitud_by_pedido(:p_id_pedido);');
            $this->db->bind(':p_id_pedido', $id_pedido);
            return $this->db->resultSet();
        }

        public function add($id_pedido, $id_local) {
            $this->db->query('call proc_add_pedido_solicitud(:p_id_pedido, :p_id_local);');
            $this->db->bind(':p_id_pedido', $id_pedido);
            $this->db->bind(':p_id_local', $id_local);
            return $this->db->newId();
        }

        public function update($params) {
            $this->db->query('call proc_update_pedido_solicitud_by_id(:p_id, :p_id_empleado_encargado, :p_enviado);');
            $this->db->bind(':p_id', $params->id);
            $this->db->bind(':p_id_empleado_encargado', $params->id_empleado_encargado);
            $this->db->bind(':p_enviado', $params->enviado);
            return $this->db->success();
        }

        public function delete($id) {
            $this->db->query('call proc_delete_pedido_solicitud_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->success();
        }
    }
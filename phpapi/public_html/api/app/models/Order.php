<?php 

    /* 
    Esta clase se encarga de realizar todas
    las peticiones en base de datos referente a Pedidos
    */

    class Order {

        public function __constructor() {
            $this->db = new Database;
        }

        public function get() {
            $this->db->query('call proc_get_pedidos();');
            return $this->db->resultSet();
        }

        public function get_by_local($id_local) {
            $this->db->query('call proc_get_pedidos_by_local(:p_id_local);');
            $this->db->bind(':p_id_local', $id_local);
            return $this->db->resultSet();
        }

        public function get_by_id($id) {
            $this->db->query('call proc_get_pedido_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->single();
        }

        public function add($params) {
            $this->db->query('call proc_add_pedido(:p_id_empleado, :p_id_local, :p_id_local_solicitado, :p_id_proveedor, :p_codigo, :p_fecha_prevista_entrega);');
            $this->db->bind(':p_id_empleado', $params->id_empleado);
            $this->db->bind(':p_id_local', $params->id_local);
            $this->db->bind(':p_id_local_solicitado', $params->id_local_solicitado);
            $this->db->bind(':p_id_proveedor', $params->id_proveedor);
            $this->db->bind(':p_codigo', $params->codigo);
            $this->db->bind(':p_fecha_prevista_entrega', $params->fecha_entrega);
            return $this->db->newId();
        }

        public function update($params) {
            $this->db->query('call proc_update_pedido_by_id(:p_id, :p_fecha_entrega, :p_recibido);');
            $this->db->bind('p_id', $params->id);
            $this->db->bind('p_fecha_entrega', $params->fecha_entrega);
            $this->db->bind('p_recibido', $params->recibido);
            return $this->db->success();
        }

        public function delete($id, $id_empleado) {
            $this->db->query('call proc_delete_pedido_by_id(:p_id, :p_id_empleado);');
            $this->db->bind(':p_id', $id);
            $this->db->bind(':p_id_empleado', $id_empleado);
            return $this->db->success();
        }
    }
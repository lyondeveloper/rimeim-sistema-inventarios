<?php 
    
    /* 
    Esta clase se encarga de ejecutar todos los procedimientos almacenados
    referentes a Clientes
    */

    class Client {
        
        public function __construct() {
            $this->db = new Database;
        }

        public function get_all() {
            $this->db->query('call proc_get_clientes();');
            return convert_to_bool_values($this->db->resultSet(), ['es_empresa']);
        }

        public function get_by_id($id) {
            $this->db->query('call proc_get_cliente_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->single();
        }

        public function get_by_code($code) {
            $this->db->query('call proc_get_cliente_by_codigo(:p_codigo);');
            $this->db->bind(':p_codigo', $code);
            return $this->db->single();
        }

        public function get_by_email($email) {
            $this->db->query('call proc_get_cliente_by_email(:p_correo);');
            $this->db->bind(':p_correo', $email);
            return $this->db->single();
        }

        public function get_by_rtn($rtn) {
            $this->db->query('call proc_get_cliente_by_rtn(:p_rtn);');
            $this->db->bind(':p_rtn', $rtn);
            return $this->db->single();
        }

        public function get_by_phone($telefono) {
            $this->db->query('call proc_get_cliente_by_telefono(:p_telefono);');
            $this->db->bind(':p_telefono', $telefono);
            return $this->db->single();
        }

        public function add($params) {
            $this->db->query('call proc_add_cliente(:p_id_local, :p_id_empleado, :p_nombre, :p_codigo, :p_rtn, :p_correo, :p_telefono, :p_es_empresa);');
            $this->db->bind(':p_id_local', $params->id_local);
            $this->db->bind(':p_id_empleado', $params->id_empleado);
            $this->db->bind(':p_nombre', $params->nombre);
            $this->db->bind(':p_codigo', $params->codigo);
            $this->db->bind(':p_rtn', $params->rtn);
            $this->db->bind(':p_correo', $params->correo);
            $this->db->bind(':p_telefono', $params->telefono);
            $this->db->bind(':p_es_empresa', $params->es_empresa);
            return $this->db->newId();
        }

        public function update($params) {
            $this->db->query('call proc_update_cliente_by_id(:p_id, :p_nombre, :p_codigo, :p_rtn, :p_correo, :p_telefono, :p_es_empresa);');
            $this->db->bind(':p_id', $params->id);
            $this->db->bind(':p_nombre', $params->nombre);
            $this->db->bind(':p_codigo', $params->codigo);
            $this->db->bind(':p_rtn', $params->rtn);
            $this->db->bind(':p_correo', $params->correo);
            $this->db->bind(':p_telefono', $params->telefono);
            $this->db->bind(':p_es_empresa', $params->es_empresa);
            return $this->db->success();
        }

        public function delete_by_id($id, $id_empleado) {
            $this->db->query('call proc_delete_cliente_by_id(:p_id, :p_id_empleado);');
            $this->db->bind(':p_id', $id);
            $this->db->bind(':p_id_empleado', $id_empleado);
            return $this->db->success();
        }

        // Helpers
        public function search($field) {
            $this->db->query('call proc_search_client(:p_field);');
            $this->db->bind(':p_field', $field);
            return convert_to_bool_values($this->db->resultSet(), ['es_empresa']);
        }
    }
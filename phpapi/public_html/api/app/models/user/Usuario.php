<?php 

    class Usuario {

        public function __construct() {
            $this->db = new Database;
        }

        public function get_user_to_auth($p_field) {
            $this->db->query('call proc_get_usuario_to_auth(:p_field)');
            $this->db->bind(':p_field', $p_field);
            return $this->db->single();
        }
    }
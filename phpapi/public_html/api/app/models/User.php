<?php 

    class User {

        public function __construct() {
            $this->db = new Database;
        }

        public function exists_user_with_email($p_correo) {
            $this->db->query("select func_exists_usuario_with_email(:p_correo) as 'exists';");
            $this->db->bind(':p_correo', $p_correo);
            $response = $this->db->single();
            return $response->exists;
        }

        public function exists_user_with_username($p_username) {
            $this->db->query("select func_exists_usuario_with_username(:p_username) as 'exists';");
            $this->db->bind(':p_username', $p_username);
            $response = $this->db->single();
            return $response->exists;
        }

        public function is_user_admin($id) {
            $this->db->query("select func_is_user_admin(:p_id) as 'admin';");
            $this->db->bind(':p_id', $id);
            $response = $this->db->single();
            return $response->admin;
        }

        public function get_user_to_auth($p_field) {
            $this->db->query('call proc_get_usuario_to_auth(:p_field);');
            $this->db->bind(':p_field', $p_field);
            return $this->db->single();
        }

        public function get_user_by_email($p_email) {
            $this->db->query('call proc_get_usuario_by_email(:p_correo);');
            $this->db->bind(':p_correo', $p_email);
            return $this->db->single();
        }

        public function can_user_update_username($id_user_to_update, $username) {
            $this->db->query("select func_exists_usuario_with_username_and_not_same(:p_username, :p_id_user) as 'exists';");
            $this->db->bind(':p_username', $username);
            $this->db->bind(':p_id_user', $id_user_to_update);
            $result = $this->db->single();
            return !$result->exists;
        }

        public function is_user_enabled($id) {
            $this->db->query("select func_is_usuario_enabled(:p_id) as 'enabled';");
            $this->db->bind(':p_id', $id);
            $result = $this->db->single();
            return $result->enabled;
        }

        public function add_user($params) {
            $this->db->query('call proc_add_usuario(:p_nombre,:p_nombre_usuario,:p_correo,:p_clave,:p_admin,:p_id_usuario_agregado_por);');
            $this->db->bind(':p_nombre', $params->nombre);
            $this->db->bind(':p_nombre_usuario', $params->nombre_usuario);
            $this->db->bind(':p_correo', $params->correo);
            $this->db->bind(':p_clave', $params->password);
            $this->db->bind(':p_admin', $params->admin);
            $this->db->bind(':p_id_usuario_agregado_por', $params->id_usuario_agregado_por);
            return $this->db->success();
        }

        public function update_user($params) {
            $this->db->query('call proc_update_usuario_by_id(:p_id,:p_nombre,:p_nombre_usuario);');
            $this->db->bind(':p_id', $params->id);
            $this->db->bind(':p_nombre', $params->nombre);
            $this->db->bind(':p_nombre_usuario', $params->nombre_usuario);
            return $this->db->success();
        }

        public function update_user_password($params) {
            $this->db->query('call proc_update_password_usuario_by_id(:p_id, :p_clave);');
            $this->db->bind(':p_id', $params->id);
            $this->db->bind(':p_clave', $params->password);
            return $this->db->success();
        }

        public function update_user_to_admin($id, $id_admin) {
            $this->db->query('call proc_set_usuario_admin_by_id(:p_id, :p_id_usuario_admin);');
            $this->db->bind(':p_id', $id);
            $this->db->bind(':p_id_usuario_admin', $id_admin);
            return $this->db->success();
        }

        public function disable_user_by_id($id) {
            $this->db->query('call proc_disable_usuario_by_id(:p_id)');
            $this->db->bind(':p_id', $id);
            return $this->db->success();
        }

        public function enable_user_by_id($id) {
            $this->db->query('call proc_enable_usuario_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->success();
        }

        public function delete_user_by_id($id, $id_usuario) {
            $this->db->query('call proc_delete_usuario_by_id(:p_id,:p_id_usuario_eliminado_por);');
            $this->db->bind(':p_id', $id);
            $this->db->bind(':p_id_usuario_eliminado_por', $id_usuario);
            return $this->db->success();
        }

    }
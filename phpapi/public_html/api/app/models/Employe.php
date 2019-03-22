<?php 
    /*
    Esta clase se encarga de las consultas 
    a la base de datos, referente a empleados
    */

    class Employe {

        public function __construct() {
            $this->db = new Database;
        }

        public function exists_user_in_local($id_usuario, $id_local) {
            $this->db->query("select func_exists_user_in_local(:p_id_usuario, :p_id_local) as 'exists';");
            $this->db->bind(':p_id_usuario', $id_usuario);
            $this->db->bind(':p_id_local', $id_local);
            $result = $this->db->single();
            return $result->exists;
        }

        public function is_enabled_by_id($id) {
            $this->db->query("select func_is_employe_enabled(:p_id) as 'enabled';");
            $this->db->bind(':p_id', $id);
            $result = $this->db->single();
            return $result->enabled;
        }

        public function get() {
            $this->db->query('call proc_get_empleados();');
            return $this->db->resultSet();
        }

        public function get_locals_for_employe_by_userid($id) {
            $this->db->query('call proc_get_locals_for_employe_by_userid(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->resultSet();
        }

        public function get_by_local($id_local) {
            $this->db->query('call proc_get_empleados_by_local(:p_id_local);');
            $this->db->bind(':p_id_local', $id_local);
            return convert_to_bool_values($this->db->resultSet(), ['admin', 'habilitado']);
        }

        public function get_by_id($id) {
            $this->db->query('call proc_get_empleado_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->single();
        }

        public function get_by_user_id($id) {
            $this->db->query('call proc_get_empleado_by_user_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->single();
        }

        public function add($params) {
            $this->db->query('call proc_add_empleado(:p_id_local, :p_id_usuario_creador, :p_id_usuario, :p_admin, :p_habilitado);');
            $this->db->bind(':p_id_local', $params->id_local);
            $this->db->bind(':p_id_usuario_creador', $params->id_usuario_creador);
            $this->db->bind(':p_id_usuario', $params->id_usuario);
            $this->db->bind(':p_admin', $params->admin);
            $this->db->bind(':p_habilitado', $params->habilitado);
            return $this->db->newId();
        }

        public function update($params) {
            $this->db->query('call proc_update_empleado_by_id(:p_id, :p_id_local, :p_admin, :p_habilitado);');
            $this->db->bind(':p_id', $params->id);
            $this->db->bind(':p_id_local', $params->id_local);
            $this->db->bind(':p_admin', $params->admin);
            $this->db->bind(':p_habilitado', $params->habilitado);
            return $this->db->success();
        }

        public function update_by_local($empleados) {
            foreach($empleados as $empleado) {
                if (isset($empleado->new) && $empleado->new) {
                    $this->add($empleado);
                } elseif(isset($empleado->eliminado) && $empleado->eliminado) {
                    $this->delete($empleado->id, $empleado->id_usuario_creador);
                } else {
                    $this->update($empleado);
                }
            }
            return true;
        }

        public function delete($id, $id_usuario_eliminado_por) {
            $this->db->query('call proc_delete_empleado_by_id(:p_id, :p_id_usuario_eliminado_por);');
            $this->db->bind(':p_id', $id);
            $this->db->bind(':p_id_usuario_eliminado_por', $id_usuario_eliminado_por);
            return $this->db->success();
        }
    }
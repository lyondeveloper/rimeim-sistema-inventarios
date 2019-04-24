<?php 

    /* 
    Esta clase se encarga de ejecutar todo lo relevante
    con Proveedor
    */

    class Provider {

        public function __construct() {
            $this->db = new Database;
        }

        public function exists_by_telefono($p_telefono) {
            $this->db->query("select func_exists_proveedor_by_telefono(:p_telefono) as 'exists'");
            $this->db->bind(':p_telefono', $p_telefono);
            return $this->db->single()->exists;
        }

        public function exists_by_correo($p_correo) {
            $this->db->query("select func_exists_proveedor_by_correo(:p_correo) as 'exists';");
            $this->db->bind(':p_correo', $p_correo);
            return $this->db->single()->exists;
        }

        public function get() {
            $this->db->query('call proc_get_proveedores();');
            return $this->db->resultSet();
        }

        public function get_by_id($id) {
            $this->db->query('call proc_get_proveedor_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->single();
        }        

        public function get_by_rtn($rtn) {
            $this->db->query('call proc_get_proveedor_by_rtn(:p_rtn);');
            $this->db->bind(':p_rtn', $rtn);
            return $this->db->single();
        }

        public function get_by_telefono($p_telefono) {
            $this->db->query('call proc_get_proveedor_by_telefono(:p_telefono);');
            $this->db->bind(':p_telefono', $p_telefono);
            return $this->db->single();
        }

        public function get_by_correo($p_correo) {
            $this->db->query('call proc_get_proveedor_by_correo(:p_correo);');
            $this->db->bind(':p_correo', $p_correo);
            return $this->db->single();
        }

        public function add($params) {
            $this->db->query('call proc_add_proveedor(:p_id_empleado_creado_por,:p_id_imagen,:p_nombre,:p_rtn,:p_telefono,:p_correo);');
            $this->db->bind(':p_id_empleado_creado_por', $params->id_empleado);
            $this->db->bind(':p_id_imagen', $params->id_imagen);
            $this->db->bind(':p_nombre', $params->nombre);
            $this->db->bind(':p_rtn', $params->rtn);
            $this->db->bind(':p_telefono', $params->telefono);
            $this->db->bind(':p_correo', $params->correo);
            return $this->db->newId();
        }

        public function update($params) {
            $this->db->query('call proc_update_proveedor_by_id(:p_id, :p_id_imagen,:p_nombre,:p_rtn,:p_telefono,:p_correo);');
            $this->db->bind(':p_id', $params->id);
            $this->db->bind(':p_id_imagen', $params->id_imagen);
            $this->db->bind(':p_nombre', $params->nombre);
            $this->db->bind(':p_rtn', $params->rtn);
            $this->db->bind(':p_telefono', $params->telefono);
            $this->db->bind(':p_correo', $params->correo);
            return $this->db->success();
        }

        public function delete($id) {
            $this->db->query('call proc_delete_proveedor_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->success();
        }
    }
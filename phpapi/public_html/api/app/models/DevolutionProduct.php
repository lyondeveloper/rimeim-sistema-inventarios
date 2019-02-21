<?php 

    /*
    Esta clase se encarga de ejecutar todas las consultas 
    en base de datos para Devolucion Producto
    */

    class DevolutionProduct {

        public function __construct() {
            $this->db = new Database;
        }

        public function get($id_devolucion) {
            $this->db->query('call proc_get_devolucion_producto_by_iddev(:p_id_devolucion);');
            $this->db->bind(':p_id_devolucion', $id_devolucion);
            return $this->db->resultSet();
        }

        public function add($params) {
            $this->db->query('call proc_add_devolucion_producto(:p_id_devolucion, :p_id_venta_producto, :p_cantidad);');
            $this->db->bind(':p_id_devolucion', $params->id_devolucion);
            $this->db->bind(':p_id_venta_producto', $params->id_venta_producto);
            $this->db->bind(':p_cantidad', $params->cantidad);
            return $this->db->newId();
        }

        public function update($id, $cantidad) {
            $this->db->query('call proc_update_devolucion_producto_by_id(:p_id, :p_cantidad);');
            $this->db->bind(':p_id', $id);
            $this->db->bind(':p_cantidad', $cantidad);
            return $this->db->success();
        }

    }
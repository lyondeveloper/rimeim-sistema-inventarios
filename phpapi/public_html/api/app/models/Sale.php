<?php

    /*
    Esta clase se encarga de ejecutar todas las consultas
    referentes a Ventas
    */

    class Sale {

        public function __construct() {
            $this->db = new Database;
        }

        public function get() {
            $this->db->query('call proc_get_ventas();');
            return $this->db->resultSet();
        }

        public function get_by_id($id) {
            $this->db->query('call proc_get_venta_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->single();
        }

        public function get_by_local($id_local) {
            $this->db->query('call proc_get_venta_by_id_local(:p_id_local);');
            $this->db->bind(':p_id_local', $id_local);
            return $this->db->resultSet();
        }

        public function add($params) {
            $this->db->query('call proc_add_venta(:p_id_local,:p_id_cliente,:p_id_empleado_creado_por,:p_codigo,:p_con_factura,:p_sub_total,:p_impuesto,:p_total,:p_metodo_pago,:p_es_cotizacion);');
            $this->db->bind(':p_id_local', $params->id_local);
            $this->db->bind(':p_id_cliente', $params->id_cliente);
            $this->db->bind(':p_id_empleado_creado_por', $params->id_empleado);
            $this->db->bind(':p_codigo', $params->codigo);
            $this->db->bind(':p_con_factura', $params->con_factura);
            $this->db->bind(':p_sub_total', $params->sub_total);
            $this->db->bind(':p_impuesto', $params->impuesto);
            $this->db->bind(':p_total', $params->total);
            $this->db->bind(':p_metodo_pago', $params->metodo_pago);
            $this->db->bind(':p_es_cotizacion', $params->es_cotizacion);
            return $this->db->newId();
        }

        public function update($params) {
            $this->db->query('call proc_update_venta_by_id(:p_id,:p_codigo,:p_con_factura,:p_sub_total,:p_impuesto,:p_total,:p_metodo_pago,:p_es_cotizacion);');
            $this->db->bind(':p_id', $params->id);
            $this->db->bind(':p_codigo', $params->codigo);
            $this->db->bind(':p_con_factura', $params->con_factura);
            $this->db->bind(':p_sub_total', $params->sub_total);
            $this->db->bind(':p_impuesto', $params->impuesto);
            $this->db->bind(':p_total', $params->total);
            $this->db->bind(':p_metodo_pago', $params->metodo_pago);
            $this->db->bind(':p_es_cotizacion', $params->es_cotizacion);
            return $this->db->success();
        }

        public function delete($id, $id_empleado) {
            $this->db->query('call proc_delete_venta_by_id(:p_id, :p_id_empleado);');
            $this->db->bind(':p_id', $id);
            $this->db->bind(':p_id_empleado', $id_empleado);
            return $this->db->success();
        }
    }
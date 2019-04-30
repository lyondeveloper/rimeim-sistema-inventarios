<?php 

    /* 
    Esta clase se encarga de todas las consultas a Productos
    */

    class Product {

        public function __construct() {
            $this->db = new Database;
        }

        public function get() {
            $this->db->query('call proc_get_productos();');
            return $this->convert_product_bool_values($this->db->resultSet());
        }

        public function search($field, $id_local) {
            $this->db->query('call proc_search_producto(:p_field, :p_id_local);');
            $this->db->bind(':p_field', $field);
            $this->db->bind(':p_id_local', $id_local);
            return $this->convert_product_bool_values($this->db->resultSet());
        }

        public function get_by_id($id) {
            $this->db->query('call proc_get_producto_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->convert_product_bool_values($this->db->single());
        }

        public function get_minified_by_id($id) {
            $this->db->query('call proc_get_producto_minified_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->single();
        }

        public function get_by_codigo_barra($codigo) {
            $this->db->query('call proc_get_producto_by_codigo_barra(:p_codigo_barra);');
            $this->db->bind(':p_codigo_barra', $codigo);
            return $this->convert_product_bool_values($this->db->single());
        }

        public function add($params) {
            $this->db->query('call proc_add_producto(:p_id_tipo_vehiculo,:p_id_marca,:p_codigo_barra,:p_nombre,:p_descripcion,:p_raro,:p_precio,:p_existencia,:p_cantidad_minima);');
            $this->db->bind(':p_id_tipo_vehiculo',$params->id_tipo_vehiculo);
            $this->db->bind(':p_id_marca',$params->id_marca);
            $this->db->bind(':p_codigo_barra',$params->codigo_barra);
            $this->db->bind(':p_nombre',$params->nombre);
            $this->db->bind(':p_descripcion',$params->descripcion);
            $this->db->bind(':p_raro',$params->raro);
            $this->db->bind(':p_precio',$params->precio);
            $this->db->bind(':p_existencia',$params->existencia);
            $this->db->bind(':p_cantidad_minima',$params->cantidad_minima);
            return $this->db->newId();
        }

        public function update($params) {
            $this->db->query('call proc_update_producto_by_id(:p_id,:p_id_tipo_vehiculo,:p_id_marca,:p_codigo_barra,:p_nombre,:p_descripcion,:p_raro,:p_precio,:p_existencia,:p_cantidad_minima);');
            $this->db->bind(':p_id',$params->id);
            $this->db->bind(':p_id_tipo_vehiculo',$params->id_tipo_vehiculo);
            $this->db->bind(':p_id_marca',$params->id_marca);
            $this->db->bind(':p_codigo_barra',$params->codigo_barra);
            $this->db->bind(':p_nombre',$params->nombre);
            $this->db->bind(':p_descripcion',$params->descripcion);
            $this->db->bind(':p_raro',$params->raro);
            $this->db->bind(':p_precio',$params->precio);
            $this->db->bind(':p_existencia',$params->existencia);
            $this->db->bind(':p_cantidad_minima',$params->cantidad_minima);
            return $this->db->success();
        }

        public function add_inventario($id_producto, $cantidad) {
            $this->db->query('call proc_add_producto_inventario(:p_id, :p_cantidad);');
            $this->db->bind(':p_id', $id_producto);
            $this->db->bind(':p_cantidad', $cantidad);
            return $this->db->success();
        }

        public function delete($id) {
            $this->db->query('call proc_delete_producto_by_id(:p_id);');
            $this->db->bind(':p_id', $id);
            return $this->db->success();
        }

        public function convert_product_bool_values($product) {
            return convert_to_bool_values($product, ['raro']);
        }
    }
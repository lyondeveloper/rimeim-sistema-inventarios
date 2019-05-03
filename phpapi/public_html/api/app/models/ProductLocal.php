<?php

/* 
    Esta clase ejecuta todos los procedimientos almacenados
    para Producto Local
    */

class ProductLocal
{

    public function __construct()
    {
        $this->db = new Database;
    }

    public function exists_by_idp_idl($id_producto, $id_local)
    {
        $this->db->query("select func_exists_producto_local_by_idp_idl(:p_id_producto, :p_id_local) as 'exists';");
        $this->db->bind(':p_id_producto', $id_producto);
        $this->db->bind(':p_id_local', $id_local);
        return $this->db->single()->exists == true;
    }

    public function get_by_local($id_local)
    {
        $this->db->query('call proc_get_producto_local(:p_id_local);');
        $this->db->bind(':p_id_local', $id_local);
        return $this->db->resultSet();
    }

    public function get_by_id_product($id_producto)
    {
        $this->db->query('call proc_get_producto_local_distribucion_by_id(:p_id_producto);');
        $this->db->bind(':p_id_producto', $id_producto);
        return $this->db->resultSet();
    }

    public function get_by_product_and_local($id_producto, $id_local)
    {
        $this->db->query('call proc_get_producto_local_by_product_and_local(:p_id_producto, :p_id_local)');
        $this->db->bind(':p_id_producto', $id_producto);
        $this->db->bind(':p_id_local', $id_local);
        return convert_to_bool_values($this->db->single(), ['raro']);
    }

    public function get_minified_byid($id)
    {
        $this->db->query('call proc_get_minified_producto_local_byid(:p_id);');
        $this->db->bind(':p_id', $id);
        return $this->db->single();
    }

    public function add($params)
    {
        $this->db->query('call proc_add_producto_local(:p_id_producto, :p_id_local, :p_existencia, :p_cantidad_minima);');
        $this->db->bind(':p_id_producto', $params->id_producto);
        $this->db->bind(':p_id_local', $params->id_local);
        $this->db->bind(':p_existencia', $params->existencia);
        $this->db->bind(':p_cantidad_minima', $params->cantidad_minima);
        return $this->db->newId();
    }

    public function update($params)
    {
        $this->db->query('call proc_update_producto_local_by_id(:p_id, :p_existencia, :p_cantidad_minima);');
        $this->db->bind(':p_id', $params->id);
        $this->db->bind(':p_existencia', $params->existencia);
        $this->db->bind(':p_cantidad_minima', $params->cantidad_minima);
        return $this->db->success();
    }

    public function update_product_and_product_local($params)
    {
        $this->db->query('call proc_update_producto_and_producto_local_by_plid(:p_id,:p_id_producto,:p_id_tipo_vehiculo,:p_id_marca,:p_existencia,:p_cantidad_minima,:p_codigo_barra,:p_nombre,:p_descripcion,:p_raro);');
        $this->db->bind(':p_id', $params->id_producto_local);
        $this->db->bind(':p_id_producto', $params->id);
        $this->db->bind(':p_id_tipo_vehiculo', $params->id_tipo_vehiculo);
        $this->db->bind(':p_id_marca', $params->id_marca);
        $this->db->bind(':p_codigo_barra', $params->codigo_barra);
        $this->db->bind(':p_nombre', $params->nombre);
        $this->db->bind(':p_descripcion', $params->descripcion);
        $this->db->bind(':p_raro', $params->raro);
        $this->db->bind(':p_existencia', $params->existencia);
        $this->db->bind(':p_cantidad_minima', $params->cantidad_minima);
        return $this->db->success();
    }

    public function add_inventario($id_producto, $id_local, $cantidad)
    {
        $this->db->query('call proc_add_producto_local_inventario(:p_id_producto, :p_id_local, :p_cantidad);');
        $this->db->bind(':p_id_producto', $id_producto);
        $this->db->bind(':p_id_local', $id_local);
        $this->db->bind(':p_cantidad', $cantidad);
        return $this->db->success();
    }

    public function remove_inventario($id_producto, $id_local, $cantidad)
    {
        $this->db->query('call proc_remove_producto_local_inventario(:p_id_producto, :p_id_local, :p_cantidad);');
        $this->db->bind(':p_id_producto', $id_producto);
        $this->db->bind(':p_id_local', $id_local);
        $this->db->bind(':p_cantidad', $cantidad);
        return $this->db->success();
    }

    public function delete($id)
    {
        $this->db->query('call proc_delete_producto_local_by_id(:p_id);');
        $this->db->bind(':p_id', $id);
        return $this->db->success();
    }
}

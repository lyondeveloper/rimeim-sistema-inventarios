<?php

/* 
    Esta clase se encarga de realizar todas
    las peticiones en base de datos referente a Pedidos
    */

class Order
{

    public function __construct()
    {
        $this->db = new Database;
    }

    public function search($params)
    {
        $this->db->query('call proc_search_pedidos(:p_id_local,:p_id_local_solicitado,:p_id_proveedor,:p_codigo,:p_recibido,:p_fecha_inicio,:p_fecha_final);');
        $this->db->bind(':p_id_local', $params->id_local);
        $this->db->bind(':p_id_local_solicitado', $params->id_local_solicitado);
        $this->db->bind(':p_id_proveedor', $params->id_proveedor);
        $this->db->bind(':p_codigo', $params->codigo);
        $this->db->bind(':p_recibido', $params->recibido);
        $this->db->bind(':p_fecha_inicio', $params->fecha_inicio);
        $this->db->bind(':p_fecha_final', $params->fecha_final);
        return convert_to_bool_values($this->db->resultSet(), ['es_compra', 'recibido']);
    }

    public function exists_pedido_with_code($p_codigo)
    {
        $this->db->query("select func_exists_pedido_with_code(:p_codigo) as 'exists';");
        $this->db->bind(':p_codigo', $p_codigo);
        return $this->db->single()->exists;
    }

    public function exists_pedido_with_id($id_pedido)
    {
        $this->db->query("select func_exists_pedido_with_id(:p_id) as 'exists';");
        $this->db->bind(':p_id', $id_pedido);
        return $this->db->single()->exists;
    }

    public function exists_pedido_with_code_and_not_same($p_codigo, $id)
    {
        $this->db->query("select func_exists_order_by_code_and_not_same(:p_codigo,:p_id) as 'exists';");
        $this->db->bind(':p_id', $id);
        $this->db->bind(':p_codigo', $p_codigo);
        return $this->db->single()->exists;
    }

    public function get()
    {
        $this->db->query('call proc_get_pedidos();');
        return convert_to_bool_values($this->db->resultSet(), ['es_compra', 'recibido']);
    }

    public function get_by_local($id_local)
    {
        $this->db->query('call proc_get_pedidos_by_local(:p_id_local);');
        $this->db->bind(':p_id_local', $id_local);
        return convert_to_bool_values($this->db->resultSet(), ['es_compra', 'recibido']);
    }

    public function get_by_id($id)
    {
        $this->db->query('call proc_get_pedido_by_id(:p_id);');
        $this->db->bind(':p_id', $id);
        return convert_to_bool_values($this->db->single(), ['es_compra', 'recibido']);
    }

    public function add($params)
    {
        $this->db->query('call proc_add_pedido(:p_id_empleado, :p_id_local, :p_id_local_solicitado, :p_id_proveedor, :p_codigo, :p_fecha_prevista_entrega);');
        $this->db->bind(':p_id_empleado', $params->id_empleado);
        $this->db->bind(':p_id_local', $params->id_local);
        $this->db->bind(':p_id_local_solicitado', $params->id_local_solicitado);
        $this->db->bind(':p_id_proveedor', $params->id_proveedor);
        $this->db->bind(':p_codigo', $params->codigo);
        $this->db->bind(':p_fecha_prevista_entrega', $params->fecha_entrega);
        return $this->db->newId();
    }

    public function update($params)
    {
        $this->db->query('call proc_update_pedido_by_id(:p_id,:p_id_proveedor,:p_id_local_solicitado,:p_codigo,:p_fecha_prevista_entrega);');
        $this->db->bind(':p_id', $params->id);
        $this->db->bind(':p_id_proveedor', $params->id_proveedor);
        $this->db->bind(':p_id_local_solicitado', $params->id_local_solicitado);
        $this->db->bind(':p_codigo', $params->codigo);
        $this->db->bind(':p_fecha_prevista_entrega', $params->fecha_prevista_entrega);
        return $this->db->success();
    }

    public function mark_as_received($id)
    {
        $this->db->query('call proc_update_pedido_mark_received_by_id(:p_id);');
        $this->db->bind(':p_id', $id);
        return $this->db->success();
    }

    public function delete($id, $id_empleado)
    {
        $this->db->query('call proc_delete_pedido_by_id(:p_id, :p_id_empleado);');
        $this->db->bind(':p_id', $id);
        $this->db->bind(':p_id_empleado', $id_empleado);
        return $this->db->success();
    }
}

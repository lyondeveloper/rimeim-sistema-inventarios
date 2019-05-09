<?php
/*
    Esta clase se encarga de realizar todas
    las consultas a la base de datos
    referentes a Devoluciones
    */

class Devolution
{

    public function __construct()
    {
        $this->db = new Database;
    }

    public function get($id_local)
    {
        $this->db->query('call proc_get_devoluciones(:p_id_local);');
        $this->db->bind(':p_id_local', $id_local);
        return $this->db->resultSet();
    }

    public function get_by_id($id)
    {
        $this->db->query('call proc_get_devolucion_by_id(:p_id);');
        $this->db->bind(':p_id', $id);
        return $this->db->single();
    }

    public function add($params)
    {
        $this->db->query('call proc_add_devolucion(:p_id_empleado_creador, :p_id_venta, :p_total_develto, :p_detalle);');
        $this->db->bind(':p_id_empleado_creador', $params->id_empleado);
        $this->db->bind(':p_id_venta', $params->id_venta);
        $this->db->bind(':p_total_develto', $params->total_devuelto);
        $this->db->bind(':p_detalle', $params->detalle);
        return $this->db->newId();
    }

    public function update_by_id($params)
    {
        $this->db->query('call proc_update_devolucion_by_id(:p_id, :p_total_devuelto, :p_detalle);');
        $this->db->bind(':p_id', $params->id);
        $this->db->bind(':p_total_devuelto', $params->total_devuelto);
        $this->db->bind(':p_detalle', $params->detalle);
        return $this->db->success();
    }

    public function delete_by_id($id)
    {
        $this->db->query('call proc_delete_devolucion_by_id(:p_id);');
        $this->db->bind(':p_id', $id);
        return $this->db->success();
    }
}

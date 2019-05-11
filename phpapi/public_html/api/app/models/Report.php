<?php

class Report
{

    public function __construct()
    {
        $this->db = new Database;
    }

    public function products_report($params)
    {
        $this->db->query('call proc_get_products_report(:p_id_local,:p_limit,:p_fecha_inicio, :p_fecha_fin,:p_asc);');
        $this->db->bind(':p_id_local', $params->id_local);
        $this->db->bind(':p_limit', $params->limite);
        $this->db->bind(':p_fecha_inicio', $params->fecha_inicio);
        $this->db->bind(':p_fecha_fin', $params->fecha_final);
        $this->db->bind(':p_asc', $params->asc);
        return $this->db->resultSet();
    }
}

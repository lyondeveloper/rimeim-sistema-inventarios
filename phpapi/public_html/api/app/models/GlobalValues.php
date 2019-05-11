<?php

class GlobalValues
{
    public function __construct()
    {
        $this->db = new Database();
    }

    public function get()
    {
        $this->db->query('call proc_get_global_variables();');
        return $this->db->resultSet();
    }

    public function get_by_key($key)
    {
        $this->db->query("select func_get_global_variable_value(:p_key) as 'value';");
        $this->db->bind(':p_key', $key);
        return $this->db->single()->value;
    }

    public function update($key, $value)
    {
        $this->db->query('call proc_update_global_variable(:p_key, :p_value);');
        $this->db->bind(':p_key', $key);
        $this->db->bind(':p_value', $value);
        return $this->db->success();
    }
}

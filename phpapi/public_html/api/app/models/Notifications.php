<?php

class Notifications
{
    private $arrBrands = [];
    private $arrVehicles = [];

    public function __construct()
    {
        $this->db = new Database;
        $this->brandModel = get_model('Brand');
        $this->vehicleModel = get_model('VehiculeType');
        $this->productImagesModel = get_model('ProductImages');
    }

    public function get_for_admin()
    {
        $notificaciones = [];
        $productos = $this->get_products_notification_for_admin();
        if (count($productos) > 0) {
            $notificaciones['productos'] = $productos;
        }
        return $notificaciones;
    }

    public function get_for_employe($id_local)
    {
        $notificaciones = [];
        $productos = $this->get_products_notification_by_employe($id_local);
        if (count($productos) > 0) {
            $notificaciones['productos'] = $productos;
        }
        return $notificaciones;
    }

    public function get_products_notification_for_admin()
    {
        $this->db->query('call proc_get_productos_notificacion_cantidad_minima();');
        $nt_productos = $this->db->resultSet();
        $nt_productos = $this->parse_products_notifications($nt_productos);
        return $nt_productos;
    }

    public function get_products_notification_by_employe($id_local)
    {
        $this->db->query('call proc_get_productos_notificacion_cantidad_minima_by_local(:p_id_local);');
        $this->db->bind(':p_id_local', $id_local);
        $nt_productos = $this->db->resultSet();
        $nt_productos = $this->parse_products_notifications($nt_productos);
        return $nt_productos;
    }

    private function parse_products_notifications($nt_productos)
    {
        foreach ($nt_productos as &$producto) {
            if (
                isset($producto->id_marca) &&
                !is_null($producto->id_marca) &&
                $producto->id_marca > 0
            ) {
                $producto->marca = $this->get_brand_by_id($producto->id_marca);
                unset($producto->id_marca);
            }
            if (
                isset($producto->id_tipo_vehiculo) &&
                !is_null($producto->id_tipo_vehiculo) &&
                $producto->id_tipo_vehiculo > 0
            ) {
                $producto->tipo_vehiculo = $this->get_vehicle_by_id($producto->id_tipo_vehiculo);
                unset($producto->id_tipo_vehiculo);
            }
            $producto->imagen = $this->productImagesModel->get_principal_image($producto->id);
        }
        return $nt_productos;
    }

    private function get_brand_by_id($id)
    {
        if (!isset($this->arrBrands[$id])) {
            $this->arrBrands[$id] = $this->brandModel->get_by_id($id);
        }
        return $this->arrBrands[$id];
    }

    private function get_vehicle_by_id($id)
    {
        if (!isset($this->arrVehicles[$id])) {
            $this->arrVehicles[$id] = $this->vehicleModel->get_by_id($id);
        }
        return $this->arrVehicles[$id];
    }
}

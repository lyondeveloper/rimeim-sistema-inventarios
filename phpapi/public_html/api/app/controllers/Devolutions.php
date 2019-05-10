<?php

/* 
    Descripcion:
    Este controlador se encarga de dar respuesta a todas
    las peticiones web que sean references a Marca
    
    Acceso:
    Empleado
    */

class Devolutions extends Controller
{

    private $employesArray = [];
    private $clientsArray = [];
    private $productsArray = [];

    public function __construct()
    {
        $this->initController(CTR_EMPLEADO);
        $this->saleModel = $this->model('Sale');
        $this->client = $this->model('Client');
        $this->saleProductModal = $this->model('SaleProduct');
        $this->productModel = $this->model('Product');
        $this->productLocalModel = $this->model('ProductLocal');
        $this->devolution = $this->model('Devolution');
        $this->devolutionProduct = $this->model('DevolutionProduct');
    }

    public function get()
    {
        $this->useGetRequest();
        $id_local = $this->get_current_id_local();
        $devolutions = $this->devolution->get($id_local);
        $devolutions = $this->parse_multiple_devolutions($devolutions);
        $this->response($devolutions);
    }

    public function get_one($id)
    {
        $this->useGetRequest();
        $devolution = $this->devolution->get_by_id($id);
        if (is_null($devolution)) {
            $this->response(null, ERROR_NOTFOUND);
        }
        $devolution = $this->parse_single_devolution($devolution, true);
        $this->response($devolution);
    }

    public function add($id_venta)
    {
        $this->usePostRequest();
        if (
            is_null($id_venta) ||
            !($id_venta > 0) ||
            $this->saleModel->get_by_id($id_venta) == null
        ) {
            $this->response(null, ERROR_NOTFOUND);
        }

        $data = $this->validate_new_devolution_data($id_venta, getJsonData());
        $id_local = $this->get_current_id_local();
        if ($data->id_local != $id_local) {
            $this->response(null, ERROR_FORBIDDEN);
        }

        $newId = $this->devolution->add($data);
        $this->checkNewId($newId);

        $this->saleModel->decrease_values(
            $id_venta,
            $data->sub_total_devuelto,
            $data->impuesto_devuelto,
            $data->total_devuelto
        );

        foreach ($data->productos as &$producto) {
            $producto->id_venta_producto = $producto->id;
            $producto->id_devolucion = $newId;
            if ($this->devolutionProduct->add($producto)) {
                if ($this->productLocalModel->add_inventario($producto->id_producto, $id_local, $producto->cantidad)) {
                    $this->productModel->add_inventario($producto->id_producto, $producto->cantidad);
                }
            }
        }
        $this->response(['id' => $newId]);
    }

    public function delete($id)
    {
        $this->useDeleteRequest();
        $devolution = $this->devolution->get_by_id($id);
        if (
            is_null($devolution) ||
            $devolution->id_local != $this->get_current_id_local()
        ) {
            $this->response(null, ERROR_NOTFOUND);
        }
        $this->devolution->delete_by_id($id, $this->get_current_employe_id());
        $this->response();
    }

    private function validate_new_devolution_data($id_venta, $data)
    {
        $errors = [];
        if (
            !isset($data->total_devuelto) ||
            !($data->total_devuelto > 0)
        ) {
            $errors['total_devuelto_error'] = "Campo invalido";
        }
        if (
            !isset($data->impuesto_devuelto) ||
            !($data->impuesto_devuelto > 0)
        ) {
            $errors['impuesto_devuelto_error'] = "Campo invalido";
        }
        if (
            !isset($data->sub_total_devuelto) ||
            !($data->sub_total_devuelto > 0)
        ) {
            $errors['sub_total_devuelto_error'] = "Campo invalido";
        }
        if (
            !isset($data->productos) ||
            !is_array($data->productos) ||
            !(count($data->productos) > 0)
        ) {
            $errors['productos_error'] = "Campo invalido";
        }
        if (
            !isset($data->id_local) ||
            !($data->id_local > 0)
        ) {
            $errors['local_error'] = "Campo invalido";
        }
        $this->checkErrors($errors);

        foreach ($data->productos as $producto) {
            if (!$this->valid_product_field_to_devolution($producto)) {
                $errors['producto_error'] = "Producto invalido";
                break;
            }
        }
        $this->checkErrors($errors);
        $data->id_venta = $id_venta;
        $data->id_empleado = $this->get_current_employe_id();
        $data->detalle = null;
        return $data;
    }

    // Helpers
    private function valid_product_field_to_devolution($producto_venta)
    {
        return (isset($producto_venta->id) && ($producto_venta->id > 0) &&
            isset($producto_venta->id_producto) && ($producto_venta->id_producto > 0) &&
            isset($producto_venta->cantidad) && ($producto_venta->cantidad > 0));
    }

    private function parse_multiple_devolutions($devolutions)
    {
        foreach ($devolutions as &$devolution) {
            $devolution = $this->parse_single_devolution($devolution);
        }
        return $devolutions;
    }

    private function parse_single_devolution($devolution, $is_unique = false)
    {
        $sale = $this->get_sale_by_id($devolution->id_venta, $is_unique);

        if ($is_unique) {
            $devolution->productos = $this->devolutionProduct->get($devolution->id);
            foreach ($devolution->productos as &$devolucion_producto) {
                $venta_producto = $this->saleProductModal->get_by_id($devolucion_producto->id_venta_producto);
                $devolucion_producto->precio = $venta_producto->precio;
                unset($venta_producto);
            }
        }
        if (isset($devolution->id_empleado_creado_por)) {
            $devolution->usuario_creador = $this->get_employe_by_id($devolution->id_empleado_creado_por);
            unset($devolution->id_empleado_creado_por);
        }
        $devolution->venta = $sale;
        return $devolution;
    }

    private function get_sale_by_id($id, $extended = false)
    {
        $sale = $this->saleModel->get_by_id($id);
        if (
            isset($sale->id_cliente) &&
            $sale->id_cliente > 0
        ) {
            $sale->cliente = $this->get_client_by_id($sale->id_cliente);
        }
        if (
            isset($sale->id_empleado_creado_por) &&
            $sale->id_empleado_creado_por > 0
        ) {
            $sale->usuario_creador = $this->get_employe_by_id($sale->id_empleado_creado_por);
        }
        if ($extended) {
            $sale->productos = $this->get_parsed_products_by_sell_id($id);
        }
        return $sale;
    }

    private function get_parsed_products_by_sell_id($id)
    {
        $productos = $this->saleProductModal->get_by_sale($id);
        foreach ($productos as &$producto) {
            if (!isset($this->productsArray[$producto->id_producto])) {
                $this->productsArray[$producto->id_producto] = $this->productModel->get_minified_by_id_for_sell_details($producto->id_producto);
            }
            $producto->codigo_barra = $this->productsArray[$producto->id_producto]->codigo_barra;
            $producto->nombre = $this->productsArray[$producto->id_producto]->nombre;
        }
        return $productos;
    }

    private function get_client_by_id($id)
    {
        if (!isset($this->clientsArray[$id])) {
            $this->clientsArray[$id] = $this->client->get_by_id($id);
        }
        return $this->clientsArray[$id];
    }

    private function get_employe_by_id($id)
    {
        if (!isset($this->employesArray[$id])) {
            $this->employesArray[$id] = $this->userModel->get_minified_user_by_id_empleado($id);
        }
        return $this->employesArray[$id];
    }
}

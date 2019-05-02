<?php

/* 
    Descripcion:
    Esta clase se encarga de responder a todas las consultas web
    referentes a VENTAS

    Acceso: 
    Administradores, Empleados
    */

class Sales extends Controller
{
    // Helper vars
    private $clientsArray = [];
    private $employesArray = [];
    private $localsArray = [];
    private $productsArray = [];

    public function __construct()
    {
        $this->initController(CTR_EMPLEADO);
        $this->saleModel = $this->model('Sale');
        $this->saleProduct = $this->model('SaleProduct');
        $this->clientModel = $this->model('Client');

        $this->localModel = $this->model('Local');
    }

    public function get()
    {
        $this->useGetRequest();
        $id_local = $this->get_current_id_local();
        $sales = null;
        if ($id_local > 0) {
            $sales = $this->saleModel->get_by_local($id_local);
        } elseif ($this->is_current_user_admin() 
                && $id_local == 0) {
            $sales = $this->saleModel->get();
        }
        if (!is_null($sales)) {
            $sales = $this->get_parsed_sales($sales, $id_local);
        }
        $this->response($sales);
    }

    public function get_one($id) {
        $this->useGetRequest();
        $sale = $this->get_parsed_single_sale_by_id($id);
        $sale->productos = $this->get_parsed_products_by_sell_id($id);
        $this->response($sale);
    }

    public function search() {
        $this->usePostRequest();
        $data = getJsonData();
        if (is_null($data)) {
            $this->response(null, ERROR_NOTFOUND);
        }
        $data = json_set_null_params_if_not_exists($data, ['id_local', 'id_cliente', 'codigo', 'con_factura', 'metodo_pago', 'fecha_inicio', 'fecha_final']);
        $id_local = $this->get_current_id_local();
        if ($id_local > 0) {
            $data->id_local = $id_local;

        } elseif ($data->id_local > 0 && 
                $data->id_local != $id_local && 
                !$this->is_current_user_admin()) {
            $this->response(null, ERROR_FORBIDDEN);

        } 
        $sales = $this->saleModel->search($data);
        if (!is_null($sales)) {
            $sales = $this->get_parsed_sales($sales, $data->id_local);
        }
        $this->response($sales);
    }

    public function add() {
        $this->usePostRequest();
        $data = $this->validate_add_data(getJsonData());
        $newId = $this->saleModel->add($data);
        $this->checkNewId($newId);
        $this->add_products_to_sell($data->productos, $newId);
        $this->response(['id' => $newId]);
    }

    private function validate_add_data($data) {
        $errors = [];

        if (!isset($data->sub_total) || 
            !($data->sub_total >= 0)) {
            $errors['sub_total_error'] = "Campo invalido";
        }
        if (!isset($data->impuesto) || 
            !($data->impuesto >= 0)) {
            $errors['impuesto_error'] = "Campo invalido";
        }
        if (!isset($data->total) || 
            !($data->total >= 0)) {
            $errors['total_error'] = "Campo invalido";
        }

        if (!isset($data->con_factura) || 
            !is_bool($data->con_factura)) {
            $errors['con_factura_error'] = "Campo invalido";
        }

        if (!isset($data->metodo_pago) || 
            empty($data->metodo_pago)) {
            $errors['metodo_pago_error'] = "Campo invalido";
        } else {
            $data->metodo_pago = strtolower($data->metodo_pago);
            if ($data->metodo_pago != "efectivo" || 
                $data->metodo_pago != "tarjeta") {
                $errors['metodo_pago_error'] = "Campo invalido";
            }
        }

        if (isset($data->id_cliente) && 
            $data->id_cliente > 0) {
            if (!$this->clientModel->exists_with_id($data->id_cliente))  {
                $errors['cliente_error'] = "Cliente invalido";
            }
        } else {
            $data->id_cliente = null;
        }

        if (!isset($data->productos) || 
            !is_array($data->productos) ||
            count($data->productos) == 0 ) {
            $errors['productos_error'] = "Campo invalido";
        }
        $this->checkErrors($errors);

        $number_of_invalid_products = 0;
        foreach($data->productos as &$producto) {
            if (!$this->valid_product_fields($producto)) {
                $producto->valido = false;
                $number_of_invalid_products++;
            }
        }

        if ($number_of_invalid_products > 0) {
            $errors['productos_error'] = $data->productos;
        }
        $this->checkErrors($errors);

        $data->es_cotizacion = false;
        return $data;
    }

    private function add_products_to_sell($productos, $id_venta) {
        foreach($productos as &$producto) {
            if ($this->valid_product_fields(($producto))) {
                $producto->id_venta = $id_venta;
                if (!isset($producto->oferta)) {
                    $producto->oferta = false;
                }
                $this->saleProduct->add($producto);
            }
        }
    } // END OF ADD

    

    // ====== Helpers ========

    // Parsed sale for /sales route
    private function get_parsed_sales($sales, $id_local) {

        foreach($sales as &$sale) {
            $sale = $this->get_parsed_single_sale($sale, $id_local);
        }
        return $sales;
    }

    private function get_parsed_single_sale_by_id($id) {
        $sale = $this->saleModel->get_by_id($id);
        if (is_null(($sale))) {
            $this->response(null, ERROR_NOTFOUND);
        }

        $id_local = $this->get_current_id_local();
        if ($id_local != $sale->id_local) {
            if (!$this->is_current_user_admin()) {
                $this->response(null, ERROR_NOTFOUND);
            }
        }

        $sale = $this->get_parsed_single_sale($sale, $id_local);
        return $sale;
    }

    private function get_parsed_single_sale($sale, $id_local) {
        if (isset($sale->id_cliente) && 
            $sale->id_cliente > 0) {
            if (!isset($this->clientsArray[$sale->id_cliente])) {
                $this->clientsArray[$sale->id_cliente] = $this->clientModel->get_by_id($sale->id_cliente);
            }
            $sale->cliente = $this->clientsArray[$sale->id_cliente];
        }
        if (isset($sale->id_empleado_creado_por) && 
            $sale->id_empleado_creado_por > 0) {
            if (!isset($this->employesArray[$sale->id_empleado_creado_por])) {
                $this->employesArray[$sale->id_empleado_creado_por] = $this->userModel->get_minified_user_by_id_empleado($sale->id_empleado_creado_por);
            }
            $sale->usuario_creador = $this->employesArray[$sale->id_empleado_creado_por];
        }
        if (isset($sale->id_local) && 
            $sale->id_local > 0 && 
            $this->is_current_user_admin() && 
            $id_local == 0) {
            if (!isset($this->localsArray[$sale->id_local])) {
                $this->localsArray[$sale->id_local] = $this->localModel->get_by_id($sale->id_local);
            }
            $sale->local = $this->localsArray[$sale->id_local];
        }
        return $sale;
    }

    private function get_parsed_products_by_sell_id($id) {
        $productos = $this->saleProduct->get_by_sale($id);
        foreach($productos as &$producto) {
            if (!isset($this->productsArray[$producto->id_producto])) {
                $this->productsArray[$producto->id_producto] = $this->productModel->get_minified_by_id_for_sell_details($producto->id_producto);
            }
            $producto->codigo_barra = $this->productsArray[$producto->id_producto]->codigo_barra;
            $producto->nombre = $this->productsArray[$producto->id_producto]->nombre;
        }
        return $productos;
    }

    private function valid_product_fields($producto) {
        return (
            isset($producto->id_producto) && 
            $producto->id_producto > 0 &&
            isset($producto->cantidad) && 
            $producto->cantidad > 0 &&
            isset($producto->precio) && 
            $producto->precio >= 0 &&
            isset($producto->total) && 
            $producto->total >= 0
        );
    }
}

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
        $this->productModel = $this->model('Product');
        $this->productLocalModel = $this->model('ProductLocal');
    }

    public function get()
    {
        $this->useGetRequest();
        $id_local = $this->get_current_id_local();
        $sales = null;
        if ($id_local > 0) {
            $sales = $this->saleModel->get_by_local($id_local);
        } elseif (
            $this->is_current_user_admin()
            && $id_local == 0
        ) {
            $sales = $this->saleModel->get();
        }
        if (!is_null($sales)) {
            $sales = $this->get_parsed_sales($sales, $id_local);
        }
        $this->response($sales);
    }

    public function getquotes()
    {
        $this->useGetRequest();
        $id_local = $this->get_current_id_local();
        $sales = null;
        if ($id_local > 0) {
            $sales = $this->saleModel->get_quotes_by_local($id_local);
        } elseif (
            $this->is_current_user_admin()
            && $id_local == 0
        ) {
            $sales = $this->saleModel->getquotes();
        }
        if (!is_null($sales)) {
            $sales = $this->get_parsed_sales($sales, $id_local);
        }
        $this->response($sales);
    }

    public function get_one($id)
    {
        $this->useGetRequest();
        $sale = $this->get_parsed_single_sale_by_id($id);
        $sale->productos = $this->get_parsed_products_by_sell_id($id);
        $this->response($sale);
    }

    public function get_quote($id)
    {
        $this->useGetRequest();
        $quote = $this->get_parsed_single_sale_by_id($id, true);
        $quote->productos = $this->get_parsed_products_by_sell_id($id);
        $this->response($quote);
    }

    public function search()
    {
        $this->usePostRequest();
        $data = getJsonData();
        if (is_null($data)) {
            $this->response(null, ERROR_NOTFOUND);
        }
        $data = json_set_null_params_if_not_exists($data, ['id_local', 'id_cliente', 'codigo', 'con_factura', 'metodo_pago', 'fecha_inicio', 'fecha_final']);
        $id_local = $this->get_current_id_local();
        if ($id_local > 0) {
            $data->id_local = $id_local;
        } elseif (
            $data->id_local > 0 &&
            $data->id_local != $id_local &&
            !$this->is_current_user_admin()
        ) {
            $this->response(null, ERROR_FORBIDDEN);
        }

        if (
            isset($data->field) &&
            !empty($data->field)
        ) {
            $data->codigo = $data->field;
        }

        if (!isset($data->es_cotizacion)) {
            $data->es_cotizacion = false;
            $sales = $this->saleModel->search($data);
        }
        $sales = $this->saleModel->search($data);

        if (
            isset($data->productos) &&
            is_array($data->productos)
        ) {
            $products_to_search = [];
            foreach ($data->productos as $producto) {
                if (
                    is_string($producto) &&
                    !empty($producto)
                ) {
                    array_push($products_to_search, $producto);
                }
            }

            if (count($products_to_search) > 0) {
                $newSales = [];
                foreach ($sales as $sale) {
                    $sale_productos = $this->saleProduct->get_minified_by_sale($sale->id);
                    $num_of_valid_products = 0;
                    foreach ($sale_productos as $producto) {
                        if (in_array($producto->codigo_barra, $products_to_search)) {
                            $num_of_valid_products++;
                        }
                    }
                    if ($num_of_valid_products >= count($products_to_search)) {
                        array_push($newSales, $sale);
                    }
                }
                $sales = $newSales;
            }
        }

        if (!is_null($sales)) {
            $sales = $this->get_parsed_sales($sales, $data->id_local);
        }
        $this->response($sales);
    }

    public function add()
    {
        $this->usePostRequest();
        $data = $this->validate_add_data(getJsonData());
        $newId = $this->saleModel->add($data);
        $this->checkNewId($newId);
        $this->add_products_to_sell($data->productos, $newId);
        $this->response(['id' => $newId]);
    }

    private function validate_add_data($data)
    {
        $errors = [];
        if (!isset($data->es_cotizacion)) {
            $data->es_cotizacion = false;
        }


        if (
            !isset($data->sub_total) ||
            !($data->sub_total >= 0)
        ) {
            $errors['sub_total_error'] = "Campo invalido";
        }
        if (
            !isset($data->impuesto) ||
            !($data->impuesto >= 0)
        ) {
            $errors['impuesto_error'] = "Campo invalido";
        }
        if (
            !isset($data->total) ||
            !($data->total >= 0)
        ) {
            $errors['total_error'] = "Campo invalido";
        }

        if (!$data->es_cotizacion) {
            if (
                !isset($data->con_factura) ||
                !is_bool($data->con_factura)
            ) {
                $errors['con_factura_error'] = "Campo invalido";
            }

            if (
                !isset($data->metodo_pago) ||
                empty($data->metodo_pago)
            ) {
                $errors['metodo_pago_error'] = "Campo invalido";
            } else {
                $data->metodo_pago = strtolower($data->metodo_pago);
                if (
                    $data->metodo_pago != "efectivo" &&
                    $data->metodo_pago != "tarjeta"
                ) {
                    $errors['metodo_pago_error'] = "Metodo de pago invalido: " . $data->metodo_pago;
                }
            }
        } else {
            $data->con_factura = false;
            $data->metodo_pago = null;
        }

        if (
            isset($data->id_cliente) &&
            $data->id_cliente > 0
        ) {
            if (!$this->clientModel->exists_with_id($data->id_cliente)) {
                $errors['cliente_error'] = "Cliente invalido";
            }
        } else {
            $data->id_cliente = null;
        }

        if (
            isset($data->codigo) &&
            !empty($data->codigo)
        ) {
            if ($this->saleModel->exists_by_code($data->codigo)) {
                $errors['codigo_error'] = "Codigo en uso";
            }
        } else {
            $data->codigo = null;
        }

        if (
            !isset($data->productos) ||
            !is_array($data->productos) ||
            count($data->productos) == 0
        ) {
            $errors['productos_error'] = "Campo invalido";
        }
        $this->checkErrors($errors);

        $number_of_invalid_products = 0;
        foreach ($data->productos as &$producto) {
            if (!$this->valid_product_fields($producto)) {
                $producto->valido = false;
                $number_of_invalid_products++;
            }
        }

        if ($number_of_invalid_products > 0) {
            $errors['productos_error'] = $data->productos;
        }
        $this->checkErrors($errors);

        $data->id_local = $this->get_current_id_local();
        $data->id_empleado = $this->get_current_employe_id();
        return $data;
    }

    private function add_products_to_sell($productos, $id_venta)
    {
        foreach ($productos as &$producto) {
            if ($this->valid_product_fields(($producto))) {
                $producto->total = (int)$producto->cantidad * (double)$producto->precio;
                $producto->id_venta = $id_venta;
                if (!isset($producto->oferta)) {
                    $producto->oferta = false;
                }
                if ($this->saleProduct->add($producto)) {
                    if ($this->productLocalModel->remove_inventario(
                        $producto->id_producto,
                        $this->get_current_id_local(),
                        $producto->cantidad
                    )) {
                        $this->productModel->remove_inventario($producto->id_producto, $producto->cantidad);
                    }
                }
            }
        }
    } // END OF ADD

    public function delete_quote($id)
    {
        $this->useDeleteRequest();
        $this->saleModel->delete_quote($id, $this->get_current_employe_id());
        $this->response();
    }

    // ====== Reports ========
    public function get_report()
    {
        $this->usePostRequest();
        $data = $this->validate_report_data(getJsonData());
        $sells = [];
        switch ($data->reporte_tipo) {
            case "ventas_totales":
                $sells = $this->saleModel->get_sells_reports_totals($data);
                break;

            case "ventas_detalle":
                $sells = $this->saleModel->get_sells_reports($data);
                $sells = $this->get_parsed_sales($sells, $data->id_local);
                foreach ($sells as &$sale) {
                    $sale->productos = $this->get_parsed_products_by_sell_id($sale->id);
                }
                break;
        }
        $response = [
            'fecha_inicio' => $data->fecha_inicio,
            'fecha_final' => $data->fecha_final,
            'type' => $data->reporte_tipo,
            'data' => $sells
        ];
        if ($data->id_local > 0) {
            $response['local'] = $this->localModel->get_by_id($data->id_local);
        }
        $this->response($response);
    }

    private function validate_report_data($data)
    {
        $data = json_set_null_params_if_not_exists($data, ['id_local', 'id_cliente', 'fecha_inicio', 'fecha_fin']);
        $id_local = $this->get_current_id_local();
        $errors = [];
        if (
            !isset($data->reporte_tipo) ||
            !is_string($data->reporte_tipo) ||
            empty($data->reporte_tipo)
        ) {
            $errors['reporte_tipo_error'] = "Campo invalido";
        } else {
            $data->reporte_tipo = strtolower($data->reporte_tipo);
        }
        if (
            !isset($data->fecha_inicio) ||
            !is_string($data->fecha_inicio) ||
            empty($data->fecha_inicio)
        ) {
            $errors['fecha_inicio_error'] = "Campo invalido";
        }
        if (
            !isset($data->fecha_final) ||
            !is_string($data->fecha_final) ||
            empty($data->fecha_final)
        ) {
            $errors['fecha_final_error'] = "Campo invalido";
        }
        if (is_null($data->id_local) && !$this->is_current_user_admin()) {
            $data->id_local = $id_local;
        }
        if ($data->id_local > 0 && $data->id_local != $id_local && !$this->is_current_user_admin()) {
            $errors['local_error'] = "Local invalido";
        }
        $this->checkErrors($errors);
        return $data;
    }

    // ====== Helpers ========
    // Parsed sale for /sales route
    private function get_parsed_sales($sales, $id_local)
    {
        foreach ($sales as &$sale) {
            $sale = $this->get_parsed_single_sale($sale, $id_local);
        }
        return $sales;
    }

    private function get_parsed_single_sale_by_id($id, $es_cotizacion = false)
    {
        $sale = null;
        if ($es_cotizacion) {
            $sale = $this->saleModel->get_quote_by_id($id);
        } else {
            $sale = $this->saleModel->get_by_id($id);
        }

        if (is_null(($sale))) {
            $this->response(["error" => "Venta no encontrada"], ERROR_NOTFOUND);
        }

        $id_local = $this->get_current_id_local();
        if ($id_local != $sale->id_local) {
            if (!$this->is_current_user_admin()) {
                $this->response(["error" => "El local actual no es valido"], ERROR_NOTFOUND);
            }
        }
        $sale = $this->get_parsed_single_sale($sale, $id_local);
        return $sale;
    }

    private function get_parsed_single_sale($sale, $id_local)
    {
        if (
            isset($sale->id_cliente) &&
            $sale->id_cliente > 0
        ) {
            if (!isset($this->clientsArray[$sale->id_cliente])) {
                $this->clientsArray[$sale->id_cliente] = $this->clientModel->get_by_id($sale->id_cliente);
            }
            $sale->cliente = $this->clientsArray[$sale->id_cliente];
        }
        if (
            isset($sale->id_empleado_creado_por) &&
            $sale->id_empleado_creado_por > 0
        ) {
            if (!isset($this->employesArray[$sale->id_empleado_creado_por])) {
                $this->employesArray[$sale->id_empleado_creado_por] = $this->userModel->get_minified_user_by_id_empleado($sale->id_empleado_creado_por);
            }
            $sale->usuario_creador = $this->employesArray[$sale->id_empleado_creado_por];
        }
        if (
            isset($sale->id_local) &&
            $sale->id_local > 0 &&
            $this->is_current_user_admin() &&
            $id_local == 0
        ) {
            if (!isset($this->localsArray[$sale->id_local])) {
                $this->localsArray[$sale->id_local] = $this->localModel->get_by_id($sale->id_local);
            }
            $sale->local = $this->localsArray[$sale->id_local];
        }
        return $sale;
    }

    private function get_parsed_products_by_sell_id($id)
    {
        $productos = $this->saleProduct->get_by_sale($id);
        foreach ($productos as &$producto) {
            if (!isset($this->productsArray[$producto->id_producto])) {
                $this->productsArray[$producto->id_producto] = $this->productModel->get_minified_by_id_for_sell_details($producto->id_producto);
            }
            $producto->codigo_barra = $this->productsArray[$producto->id_producto]->codigo_barra;
            $producto->nombre = $this->productsArray[$producto->id_producto]->nombre;
        }
        return $productos;
    }

    private function valid_product_fields($producto)
    {
        return (isset($producto->id_producto) &&
            $producto->id_producto > 0 &&
            isset($producto->cantidad) &&
            $producto->cantidad > 0 &&
            isset($producto->precio) &&
            $producto->precio >= 0);
    }
}

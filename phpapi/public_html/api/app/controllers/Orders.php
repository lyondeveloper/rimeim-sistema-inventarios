<?php

class Orders extends Controller
{

    public function __construct()
    {
        $this->initController(CTR_EMPLEADO);
        $this->order = $this->model('Order');
        $this->orderProduct = $this->model('OrderProduct');
        $this->orderProductDistribution = $this->model('OrderProductDistribution');
        $this->orderRequest = $this->model('OrderRequest');
        $this->provider = $this->model('Provider');
        $this->local = $this->model('Local');
        $this->product = $this->model('Product');
        $this->productLocal = $this->model('ProductLocal');
    }

    public function search()
    {
        $this->usePostRequest();
        $data = getJsonData();
        if (is_null($data)) {
            $this->response(null, ERROR_NOTFOUND);
        }
        $id_local = $this->get_current_id_local();
        $data = json_set_null_params_if_not_exists($data, ['id_local', 'id_local_solicitado', 'id_proveedor', 'codigo', 'recibido', 'fecha_inicio', 'fecha_final']);

        if ($id_local > 0) {
            $data->id_local = $id_local;
        } else if (
            !$this->is_current_user_admin() &&
            $data->id_local != $id_local
        ) {
            $this->response(null, ERROR_FORBIDDEN);
        }

        $orders = $this->order->search($data);

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
                $newOrders = [];
                foreach ($orders as $order) {
                    $order_products = $this->orderProduct->get_minified_by_order_id($order->id);
                    $num_of_valid_products = 0;
                    foreach ($order_products as $producto) {
                        if (in_array($producto->codigo_barra, $products_to_search)) {
                            $num_of_valid_products++;
                        }
                    }
                    if ($num_of_valid_products >= count($products_to_search)) {
                        array_push($newOrders, $order);
                    }
                }
                $orders = $newOrders;
            }
        }

        $orders = $this->parse_multiple_orders_to_send($orders);
        $this->response($orders);
    }

    public function get()
    {
        $this->useGetRequest();
        $id_local = $this->get_current_id_local();
        if ($id_local > 0) {
            $orders = $this->order->get_by_local($id_local);
        } elseif (
            $id_local == 0 &&
            $this->is_current_user_admin()
        ) {
            $orders = $this->order->get();
        }
        $orders = $this->parse_multiple_orders_to_send($orders);
        $this->response($orders);
    }

    public function get_one($id)
    {
        $this->useGetRequest();
        $order = $this->get_parsed_order_by_id($id);
        $this->response($order);
    }

    public function add()
    {
        $this->usePostRequest();
        $data = $this->validate_add_data(getJsonData());
        $newId = $this->order->add($data);
        $this->checkNewId($newId);
        $this->add_products_to_order($data->productos, $newId);

        $this->response(['id' => $newId]);
    }

    private function validate_add_data($data)
    {
        $errors = [];

        $data->es_compra = isset($data->id_proveedor) && $data->id_proveedor > 0;

        if (!isset($data->codigo)) {
            $errors['codigo_error'] = "Campo requerido";
        } elseif (!empty($data->codigo)) {
            if ($this->order->exists_pedido_with_code($data->codigo)) {
                $errors['codigo_error'] = "El codigo se encuentra actualmente en uso";
            }
        } else {
            $data->codigo = null;
        }

        if (
            !isset($data->fecha_entrega) ||
            empty($data->fecha_entrega)
        ) {
            $errors['fecha_entrega_error'] = "Campo requerido";
        }
        $this->checkErrors($errors);
        $data->id_empleado = $this->get_current_employe_id();
        $data->id_local = $this->get_current_id_local();

        if ($data->es_compra) {
            $data->id_local_solicitado = null;
            if (
                !isset($data->id_proveedor) ||
                !($data->id_proveedor > 0)
            ) {
                $errors['proveedor_error'] = "Campo invalido";
            } elseif ($this->provider->get_by_id($data->id_proveedor) == null) {
                $errors['proveedor_error'] = "Proveedor inexistente";
            }
        } else {
            $data->id_proveedor = null;
            if (
                !isset($data->id_local_solicitado) ||
                !($data->id_local_solicitado > 0)
            ) {
                $errors['local_solicitado_error'] = "Campo invalido";
            } elseif ($data->id_local_solicitado == $data->id_local) {
                $errors['local_solicitado_error'] = "El local solicitado es igual al local actual";
            } elseif ($this->local->get_by_id($data->id_local_solicitado) == null) {
                $errors['local_solicitado_error'] = "Local inexistente";
            }
        }

        if (
            !isset($data->productos) ||
            !is_array($data->productos)
        ) {
            $errors['productos_error'] = "Campo invalido";
        }
        $this->checkErrors($errors);

        $count_invalids = 0;
        foreach ($data->productos as &$producto) {
            $is_valid = false;

            if ($this->valid_order_product_fields($producto)) {

                $is_valid = true;

                if (
                    isset($producto->distribucion) &&
                    is_array($producto->distribucion) &&
                    count($producto->distribucion) > 0
                ) {

                    if (!$this->is_current_user_admin()) {
                        $is_valid = false;
                    } else {
                        foreach ($producto->distribucion as $distribucion) {
                            if ($this->valid_order_product_distribution_fields($distribucion)) {
                                $is_valid = true;
                            } else {
                                $is_valid = false;
                            }
                        }
                    }
                }
            }
            if (!$is_valid) {
                $count_invalids++;
            }
            $producto->valido = $is_valid;
        }

        if ($count_invalids > 0) {
            $errors['productos'] = $data->productos;
        }
        $this->checkErrors($errors);
        return $data;
    }

    private function add_products_to_order($productos, $id_pedido)
    {
        foreach ($productos as &$producto) {
            $producto->id_pedido = $id_pedido;
            $this->add_order_product_distribution($producto);
        }
    }

    private function add_order_product_distribution($producto)
    {
        $new_pedido_producto_id = $this->orderProduct->add($producto);

        if ($new_pedido_producto_id > 0) {

            if (
                isset($producto->distribucion) &&
                is_array($producto->distribucion)
            ) {

                foreach ($producto->distribucion as &$distribucion) {
                    if (
                        isset($distribucion->id_local) &&
                        $distribucion->id_local > 0 &&
                        isset($distribucion->cantidad) &&
                        $distribucion->cantidad >= 0
                    ) {

                        $distribucion->id_pedido_producto = $new_pedido_producto_id;
                        $this->orderProductDistribution->add($distribucion);
                    }
                }
            }
        }
    } // END OF ADD

    public function update($id)
    {
        $this->usePutRequest();
        if (!$this->order->exists_pedido_with_id($id)) {
            $this->response(null, ERROR_NOTFOUND);
        }
        $data = $this->validate_update_data(getJsonData(), $id);
        $success = $this->order->update($data);
        $this->update_order_products($data->productos, $id);

        $updated_product = $this->get_parsed_order_by_id($id);
        $this->response($updated_product);
    }

    private function validate_update_data($data, $id)
    {
        $errors = [];
        $data->es_compra = isset($data->id_proveedor) && $data->id_proveedor > 0;

        if (!isset($data->codigo)) {
            $errors['codigo_error'] = "Campo requerido";
        } elseif (!empty($data->codigo)) {
            if ($this->order->exists_pedido_with_code_and_not_same($data->codigo, $id)) {
                $errors['codigo_error'] = "El codigo se encuentra actualmente en uso";
            }
        } else {
            $data->codigo = null;
        }

        if (
            !isset($data->fecha_prevista_entrega) ||
            empty($data->fecha_prevista_entrega)
        ) {
            $errors['fecha_prevista_entrega_error'] = "Campo requerido";
        }

        if ($data->es_compra) {
            $data->id_local_solicitado = null;
            if (
                !isset($data->id_proveedor) ||
                !($data->id_proveedor > 0)
            ) {
                $errors['proveedor_error'] = "Campo invalido";
            } elseif ($this->provider->get_by_id($data->id_proveedor) == null) {
                $errors['proveedor_error'] = "Proveedor inexistente";
            }
        } else {
            $data->id_proveedor = null;
            if (
                !isset($data->id_local_solicitado) ||
                !($data->id_local_solicitado > 0)
            ) {
                $errors['local_solicitado_error'] = "Campo invalido";
            } elseif ($data->id_local_solicitado == $data->id_local) {
                $errors['local_solicitado_error'] = "El local solicitado es igual al local actual";
            } elseif ($this->local->get_by_id($data->id_local_solicitado) == null) {
                $errors['local_solicitado_error'] = "Local inexistente";
            }
        }

        if (
            !isset($data->productos) ||
            !is_array($data->productos)
        ) {
            $errors['productos_error'] = "Campo invalido";
        }
        $this->checkErrors($errors);
        $data->id = $id;
        return $data;
    }

    private function update_order_products($products, $id_pedido)
    {
        foreach ($products as &$product) {
            if ($this->valid_order_product_fields($product)) {
                if (
                    isset($product->eliminado) &&
                    $product->eliminado == true &&
                    isset($product->id)
                ) {
                    $this->orderProduct->delete($product->id);
                } elseif (
                    isset($product->actualizado) &&
                    $product->actualizado == true
                ) {
                    $this->orderProduct->update($product);
                    if (
                        isset($product->distribucion) &&
                        is_array($product->distribucion)
                    ) {
                        $this->update_order_product_distribution($product->distribucion);
                    }
                } elseif (
                    !isset($product->id) &&
                    $this->is_current_user_admin()
                ) {
                    $product->id_pedido = $id_pedido;
                    $this->add_order_product_distribution($product);
                }
            }
        }
    }

    private function update_order_product_distribution($distribucion)
    {
        foreach ($distribucion as $distro) {
            if (
                isset($distro->actualizado) &&
                $distro->actualizado == true
            ) {
                $this->orderProductDistribution->update($distro);
            }
        }
    } // End of update

    public function delete($id)
    {
        $this->useDeleteRequest();
        if (!$this->order->exists_pedido_with_id($id)) {
            $this->response(null, ERROR_NOTFOUND);
        }
        $products = $this->orderProduct->get_by_order_id($id);
        foreach ($products as $product) {
            $this->orderProduct->delete($product->id);
        }
        $success = $this->order->delete($id, $this->get_current_employe_id());
        if (!$success) {
            $this->response(null, ERROR_PROCESS);
        }
        $this->response();
    }

    public function mark_received($id)
    {
        $this->usePutRequest();
        $order = $this->order->get_by_id($id);
        if (is_null($order)) {
            $this->response(null, ERROR_NOTFOUND);
        }

        if ($order->recibido) {
            $this->response(['error' => "Este pedido ya fue recibido"], ERROR_PROCESS);
        }

        $products = $this->orderProduct->get_by_order_id($id);

        foreach ($products as $product) {
            $distribucion = $this->orderProductDistribution->get($product->id);
            if (count($distribucion) > 0) {
                foreach ($distribucion as $distro) {
                    $this->productLocal->add_inventario($product->id_producto, $distro->id_local, $distro->cantidad);
                }
            } elseif ($order->id_proveedor == null) {
                $this->productLocal->add_inventario($product->id_producto, $order->id_local, $product->cantidad);
            }

            $this->product->add_inventario($product->id_producto, $product->cantidad);
        }
        $this->order->mark_as_received($id);
        $this->response();
    }

    // ============= Helpers ==================
    private function get_parsed_order_by_id($id_pedido)
    {
        $order = $this->order->get_by_id($id_pedido);

        if (!is_null($order)) {

            $locales = [];
            $productos = [];

            if ($this->is_current_user_admin()) {
                if (!isset($locales[$order->id_local])) {
                    $locales[$order->id_local] = $this->local->get_by_id($order->id_local);
                }
                $order->local = $locales[$order->id_local];
            }

            if (
                isset($order->id_local_solicitado) &&
                !is_null($order->id_local_solicitado)
            ) {

                if (!isset($locales[$order->id_local_solicitado])) {
                    $locales[$order->id_local_solicitado] = $this->local->get_by_id($order->id_local_solicitado);
                }
                $order->local_solicitado = $locales[$order->id_local_solicitado];
            }

            if (
                isset($order->id_proveedor) &&
                !is_null($order->id_proveedor)
            ) {
                $order->proveedor = $this->provider->get_by_id($order->id_proveedor);
            }

            if (
                isset($order->id_empleado_creado_por) &&
                !is_null($order->id_empleado_creado_por)
            ) {
                $order->usuario_creador = $this->userModel->get_minified_user_by_id_empleado($order->id_empleado_creado_por);
            }

            $products = $this->orderProduct->get_by_order_id($id_pedido);

            foreach ($products as &$product) {
                $distribucion = $this->orderProductDistribution->get($product->id);

                if (!isset($productos[$product->id_producto])) {
                    $productos[$product->id_producto] = $this->product->get_minified_by_id($product->id_producto);
                }
                $product->nombre = $productos[$product->id_producto]->nombre;
                $product->producto = $productos[$product->id_producto];

                if ($this->is_current_user_admin()) {
                    foreach ($distribucion as &$distro) {
                        if (!isset($locales[$distro->id_local])) {
                            $locales[$distro->id_local] = $this->local->get_by_id($distro->id_local);
                        }
                        $distro->local = $locales[$distro->id_local];
                    }
                    $product->distribucion = $distribucion;
                }
            }
            $order->productos = $products;
        }
        return $order;
    }

    private function parse_multiple_orders_to_send($orders)
    {
        if (count($orders) > 0) {
            $locales = [];
            $proveedores = [];
            foreach ($orders as &$order) {

                if (
                    isset($order->id_local_solicitado) &&
                    $order->id_local_solicitado > 0
                ) {

                    if (!isset($locales[$order->id_local_solicitado])) {
                        $locales[$order->id_local_solicitado] = $this->local->get_by_id($order->id_local_solicitado);
                    }
                    $order->local_solicitado = $locales[$order->id_local_solicitado];
                }

                if (
                    isset($order->id_local) &&
                    $order->id_local > 0
                ) {

                    if (!isset($locales[$order->id_local])) {
                        $locales[$order->id_local] = $this->local->get_by_id($order->id_local);
                    }
                    $order->local = $locales[$order->id_local];
                }

                if (
                    isset($order->id_proveedor) &&
                    $order->id_proveedor > 0
                ) {
                    if (!isset($proveedores[$order->id_proveedor])) {
                        $proveedores[$order->id_proveedor] = $this->provider->get_by_id($order->id_proveedor);
                    }
                    $order->proveedor = $proveedores[$order->id_proveedor];
                }
            }
        }
        return $orders;
    }

    private function valid_order_product_fields($producto)
    {
        return (isset($producto->id_producto) &&
            $producto->id_producto > 0 &&
            isset($producto->cantidad) &&
            $producto->cantidad > 0 &&
            isset($producto->costo) &&
            $producto->costo >= 0);
    }

    private function valid_order_product_distribution_fields($distribucion)
    {
        return (isset($distribucion->id_local) &&
            $distribucion->id_local > 0 &&
            isset($distribucion->cantidad) &&
            $distribucion->cantidad > 0);
    }
}

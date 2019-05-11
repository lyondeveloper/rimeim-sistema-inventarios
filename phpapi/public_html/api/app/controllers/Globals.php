<?php

class Globals extends Controller
{
    private $key_impuesto = "K_IMPUESTO";
    private $key_rtn = "K_RTN";
    private $key_correo = "K_CORREO";

    public function __construct()
    {
        $this->initController();
        $this->globalV = $this->model('GlobalValues');
    }

    public function get()
    {
        $this->useGetRequest();
        $this->private_route(CTR_EMPLEADO);
        $this->send_values();
    }

    private function send_values()
    {
        $values = $this->globalV->get();

        $v_response = [
            'rtn' => "",
            'impuesto' => "",
            'correo' => ""
        ];
        foreach ($values as $value) {
            switch ($value->clave) {
                case $this->key_impuesto:
                    $v_response['impuesto'] = $value->valor;
                    break;

                case $this->key_rtn:
                    $v_response['rtn'] = $value->valor;
                    break;

                case $this->key_correo:
                    $v_response['correo'] = $value->valor;
                    break;

                default:
                    break;
            }
        }
        $this->response($v_response);
    }

    public function update()
    {
        $this->usePutRequest();
        $this->private_route(CTR_ADMIN);
        $data = getJsonData();
        if (
            isset($data->impuesto) &&
            $data->impuesto > 0
        ) {
            $this->globalV->update($this->key_impuesto, $data->impuesto);
        }

        if (
            isset($data->rtn) &&
            !empty($data->rtn)
        ) {
            $this->globalV->update($this->key_rtn, $data->rtn);
        }

        if (
            isset($data->correo) &&
            !empty($data->correo) &&
            isEmail($data->correo)
        ) {
            $this->globalV->update($this->key_correo, $data->correo);
        }
        $this->send_values();
    }
}

<?php

class Globals extends Controller
{
    private $key_impuesto = "K_IMPUESTO";
    private $key_rtn = "K_RTN";


    public function __construct()
    {
        $this->initController(CTR_ADMIN);
        $this->globalV = $this->model('GlobalValues');
    }

    public function get()
    {
        $this->useGetRequest();
        $this->send_values();
    }

    private function send_values()
    {
        $values = $this->globalV->get();

        $v_response = [
            'rtn' => "",
            'impuesto' => "0.15"
        ];
        foreach ($values as $value) {
            if ($value->key == $this->key_impuesto) {
                $v_response['impuesto'] = $value->valor;
            } elseif ($value->key == $this->key_rtn) {
                $v_response['rtn'] = $value->valor;
            }
        }
        $this->response($v_response);
    }

    public function update()
    {
        $this->usePutRequest();
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
        $this->send_values();
    }
}

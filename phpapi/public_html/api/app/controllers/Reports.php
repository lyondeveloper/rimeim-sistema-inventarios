<?php

class Reports extends Controller
{

    public function __construct()
    {
        $this->initController(CTR_EMPLEADO);

        $this->report = $this->model('Report');
    }

    public function get_products()
    {
        $this->usePostRequest();
        $data = $this->validate_get_products_data(getJsonData());
        $products = $this->report->products_report($data);
        $r_response = [
            'fecha_inicio' => $data->fecha_inicio,
            'fecha_final' => $data->fecha_final,
            'tipo_reporte' => $data->tipo_reporte,
            'local' => $data->local,
            'productos' => $products
        ];
        $this->response($r_response);
    }

    private function validate_get_products_data($data)
    {
        $errors = [];
        if (
            !isset($data->fecha_inicio) ||
            empty($data->fecha_inicio)
        ) {
            $errors['fecha_inicio_error'] = "Campo invalido";
        }
        if (
            !isset($data->fecha_final) ||
            empty($data->fecha_final)
        ) {
            $errors['fecha_final_error'] = "Campo invalido";
        }
        if (
            !isset($data->tipo_reporte) || ($data->tipo_reporte != "mas_vendidos" && $data->tipo_reporte != "menos_vendidos")
        ) {
            $errors['tipo_reporte_erro'] = "Campo invalido";
        } else {
            if ($data->tipo_reporte == "mas_vendidos") {
                $data->asc = true;
            } else if ($data->tipo_reporte == "menos_vendidos") {
                $data->asc = false;
            }
        }

        if (
            !isset($data->limite) ||
            !($data->limite > 0)
        ) {
            $errors['limite_erro'] = "Campo invalido";
        }

        $id_local = $this->get_current_id_local();
        if (
            isset($data->id_local) &&
            $data->id_local > 0 &&
            $data->id_local != $id_local &&
            !$this->is_current_user_admin()
        ) {
            $errors['local_error'] = "Local invalido";
        } elseif (!isset($data->id_local)) {
            $data->id_local = $id_local;
        }


        $this->checkErrors($errors);


        return $data;
    }
}

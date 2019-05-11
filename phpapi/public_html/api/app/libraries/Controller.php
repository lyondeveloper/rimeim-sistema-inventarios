<?php

/*
    Base controller
    Loads the functions
    */

class Controller
{

    private $current_token = null;
    private $current_id_local = null;
    private $current_id_employe = null;
    public $userModel;
    public $employeModel;

    public function initController($private_type = null)
    {
        $this->userModel = $this->model('User');
        $this->employeModel = $this->model('Employe');

        // Para la configuracion de controladores privados
        if (!is_null($private_type)) {
            $this->private_route($private_type);
        }
    }

    // Load model
    public function model($model)
    {
        return get_model($model);
    }

    // Funciones auxiliares

    public function sanitizePostString()
    {
        $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
    }

    public function redirect($url = null)
    {
        if (is_null($url) || empty($url)) {
            header('location:' . URL_ROOT);
        } else {
            header('location:' . URL_ROOT . $url);
        }
    }

    public function useGetRequest()
    {
        if (!is_get_request()) {
            notAuthorizedHeader(true);
        }
    }

    public function usePostRequest()
    {
        if (!is_post_request()) {
            notAuthorizedHeader(true);
        }
    }

    public function usePutRequest()
    {
        if (!is_put_request()) {
            notAuthorizedHeader(true);
        }
    }

    public function useDeleteRequest()
    {
        if (!is_delete_request()) {
            notAuthorizedHeader(true);
        }
    }

    public function response($data = null, $error = null, $addToken = true)
    {
        $data_response = [];
        if ($addToken && !is_null($this->current_token)) {
            $data_response['token'] = $this->get_updated_token();
        }
        if (!is_null($data)) {
            if (is_array($data) && isset($data['token'])) {
                $data_response['token'] = $data['token'];
                unset($data['token']);
            }
            $data_response['data'] = $data;
        }

        $id_local = $this->get_current_id_local();
        $notificationsModel = get_model('Notifications');
        $data_response['notificaciones'] = null;
        if ($this->is_current_user_admin() && $id_local == 0) {
            $data_response['notificaciones'] = $notificationsModel->get_for_admin();
        } else if ($id_local > 0) {
            $data_response['notificaciones'] = $notificationsModel->get_for_employe($id_local);
        }
        sendResponse($data_response, $error);
    }

    public function checkErrors($errors, $error = ERROR_FORBIDDEN)
    {
        if (!is_null($errors) && count($errors) > 0) {
            $this->response($errors, $error);
        }
    }

    public function checkNewId($id, $data = null, $error = ERROR_PROCESS)
    {
        if (
            !$id ||
            is_null($id) ||
            $id <= 0
        ) {
            $this->response($data, $error);
        }
    }

    private function get_updated_token()
    {
        if (!is_null($this->current_token)) {
            $this->current_token->dt_expire = strtotime("+" . TOKEN_DURATION . " seconds", curent_time());
        }
        return JWT::encode($this->current_token, KEY_TOKEN);
    }

    public function get_new_token($user)
    {
        $token_arr = [
            'id' => $user->id,
            'name' => $user->nombre,
            'admin' => $user->admin,
            'dt_expire' => strtotime("+" . TOKEN_DURATION . " seconds", curent_time())
        ];
        $token = JWT::encode($token_arr, KEY_TOKEN);
        return $token;
    }

    public function private_route($private_type = null, $id_user_request = 0)
    {
        $this->config_current_token();
        $this->config_route($private_type, $id_user_request);
    }

    private function config_current_token()
    {
        if (!is_null($this->current_token)) {
            return;
        }

        $token = $this->get_token_from_header();
        if (is_null($token)) {
            $this->response(['error' => "InvalidSession"], ERROR_FORBIDDEN);
        }
        $token = $this->get_decoded_token($token);

        if (!$this->userModel->is_user_enabled($token->id)) {
            $this->response(['error' => "NotValidUser"], ERROR_FORBIDDEN, false);
        }
        if ($token->dt_expire < curent_time()) {
            $this->response(['error' => "InvalidSession"], ERROR_FORBIDDEN, false);
        }
        $this->current_token = $token;
        $this->config_current_employe_id();
    }

    private function get_token_from_header()
    {
        $valid = false;
        $headers = apache_request_headers();
        $this->config_current_id_local_from_headers($headers);
        $token_header = $this->get_current_token_from_heders($headers);

        if (!is_null($token_header)) {
            $matches = [];
            if (preg_match('/' . KEY_BEARER . '\s(\S+)/', $token_header, $matches)) {
                $token_header = $matches[1];
                $valid = true;
            }
        }
        return $valid ? $token_header : null;
    }

    private function get_decoded_token($token_str)
    {
        try {
            $token_decoded = JWT::decode($token_str, KEY_TOKEN);
            return $token_decoded;
        } catch (Exception $e) {
            errorLog($e->getMessage());
        }
        $this->response(null, ERROR_FORBIDDEN);
    }

    public function route_for_admin()
    {
        if (!$this->is_current_user_admin()) {
            $this->response(['error' => "InvalidPermissions"], ERROR_FORBIDDEN);
        }
    }

    public function route_for_empleado()
    {
        if (
            is_null($this->get_current_id_local()) ||
            is_null($this->get_current_employe_id())
        ) {
            $this->response(['error' => "InvalidPermissions"], ERROR_FORBIDDEN);
        }
    }

    public function route_for_admin_or_same_user($id)
    {
        processLog("route_for_admin_or_same_user:  " . $id . " - current: " . $this->get_current_user_id());
        if (is_null($id)) {
            $this->response(['error' => "NotFoundUser"], ERROR_FORBIDDEN);
        } elseif ($this->get_current_user_id() == $id) {
            return;
        } elseif (!$this->is_current_user_admin()) {
            $this->response(['error' => "NotValidUser"], ERROR_FORBIDDEN);
        }
    }

    public function get_current_user_id()
    {
        return (!is_null($this->current_token) &&
            isset($this->current_token->id)) ? $this->current_token->id : 0;
    }

    public function get_current_employe_id()
    {
        return $this->current_id_employe;
    }

    public function get_current_id_local()
    {
        return $this->current_id_local;
    }
    public function config_route($private_type, $id_user_request = 0)
    {
        if (
            is_null($private_type) ||
            !in_array($private_type, [CTR_EMPLEADO, CTR_ADMIN, CTR_ADMIN_SAME_USER])
        ) {
            return;
        }

        switch ($private_type) {
            case CTR_EMPLEADO:
                if ($this->is_current_user_admin()) {
                    $id_local = $this->get_current_id_local();
                    if ($id_local == 0) {
                        return;
                    }
                }

                $this->route_for_empleado();
                break;

            case CTR_ADMIN_SAME_USER:
                $this->route_for_admin_or_same_user($id_user_request);
                break;

            default:
                $this->route_for_admin();
                break;
        }
    }

    public function is_current_user_admin()
    {
        return $this->userModel->is_user_admin($this->get_current_user_id());
    }

    private function get_current_token_from_heders($headers)
    {
        $possible_names = ['AUTH', 'Auth', 'auth', 'Authorization', 'authorization'];
        $token_header = null;

        foreach ($possible_names as $header_name) {
            if (
                isset($headers[$header_name]) &&
                is_null(
                    $token_header
                )
            ) {
                $token_header = $headers[$header_name];
                break;
            }
        }

        return $token_header;
    }

    private function config_current_id_local_from_headers($headers)
    {
        $possible_names = ['IDLocal', 'IDLOCAL', 'idlocal'];
        foreach ($possible_names as $id_name) {
            if (isset($headers[$id_name])) {
                $this->current_id_local = $headers[$id_name];
                break;
            }
        }
    }

    private function config_current_employe_id()
    {
        $id_local = $this->get_current_id_local();

        if (is_null($id_local)) {
            return;
        }

        $employe = $this->employeModel->get_by_user_and_local(
            $this->get_current_user_id(),
            $id_local
        );
        if (
            !is_null($employe) &&
            $employe->habilitado == true
        ) {
            $this->current_id_employe = $employe->id;
        }
    }
}

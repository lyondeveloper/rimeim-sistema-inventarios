<?php

/* 
    Esta clase controla todas las peticiones de inicio de sesion, 
    agregado de usuarios, eliminado, actualizaro.
    */

class Users extends Controller
{

    public function __construct()
    {
        $this->initController();
    }

    // ====== Login ======
    public function login()
    {
        $this->usePostRequest();
        $data = getJsonData();
        $this->validate_login_data($data);
        $user = $this->userModel->get_user_to_auth($data->user);
        $this->validate_user_status($user, $data);
        $new_token = $this->get_new_token($user);

        $this->response([
            'token' => $new_token,
            'primera_sesion' => $user->primera_sesion
        ]);
    }

    private function validate_login_data($data)
    {
        $errors = [];
        if (is_empty_array($data)) {
            $errors['params_error'] = "Parametros invalidos";
        }
        if (empty_json_params($data, ['user', 'password'])) {
            $errors['params_error'] = "Uno o mas parametros invalidos";
        }
        if (empty($data->user)) {
            $errors['user_error'] = "Usuario invalido";
        }
        if (!isValidPassword($data->password)) {
            $errors['password_error'] = "Clave invalida";
        }

        if (count($errors) > 0) {
            $this->response($errors, ERROR_FORBIDDEN, false);
        }
    }

    private function validate_user_status($user, $data)
    {
        if (
            !$user ||
            is_null($user) ||
            !password_verify($data->password, $user->clave)
        ) {
            $this->response(['password_error' => 'Usuario o clave incorrecta'], ERROR_NOTFOUND, false);
        } elseif (!$user->habilitado) {
            $this->response(['user_error' => 'Usuario invalido'], ERROR_FORBIDDEN, false);
        }
    }
    // ====== End Login ======

    public function get()
    {
        $this->useGetRequest();
        $this->private_route(CTR_ADMIN);
        $users = $this->userModel->get_users();
        $this->response($users);
    }

    public function get_one($id)
    {
        $this->useGetRequest();
        $this->private_route(CTR_ADMIN_SAME_USER, $id);
        $user = $this->userModel->get_by_id($id);
        if (is_null($user)) {
            $this->response(NULL, ERROR_NOTFOUND);
        }
        $user->usuario_creador = $this->userModel->get_by_id($user->id_usuario_creado_por);
        $this->response($user);
    }

    // ====== Add User ======
    public function add()
    {
        $this->usePostRequest();
        $this->private_route(CTR_ADMIN);

        $newUser = $this->validate_add_user_data(getJsonData());
        $success = $this->userModel->add_user($newUser);
        if (!$success) {
            $this->response(null, ERROR_NOTFOUND);
        }
        $this->response();
    }

    private function validate_add_user_data($data)
    {
        $errors = [];
        if (is_empty_array($data)) {
            $errors['params_error'] = "Parametros invalidos";
        } else {
            if (!isset($data->nombre) || empty($data->nombre)) {
                $errors['nombre_error'] = "Nombre invalido";
            }
            if (
                !isset($data->correo) ||
                empty($data->correo) ||
                !isEmail($data->correo)
            ) {
                $errors['correo_error'] = "Campo invalido";
            }
            if (!isset($data->nombre_usuario) || empty($data->nombre_usuario)) {
                $errors['nombre_usuario_error'] = "Campo invalido";
            }
            if (!isset($data->password) || empty($data->password)) {
                $errors['password_error'] = "Campo invalido";
            }
            if (!isset($data->admin) || !is_bool($data->admin)) {
                $errors['admin_error'] = "Campo invalido";
            }
            if (!isset($data->habilitado) || !is_bool($data->habilitado)) {
                $errors['habilitado_error'] = "Campo invalido";
            }
        }

        if (count($errors) == 0) {
            $data->nombre = trim($data->nombre);
            $data->nombre_usuario = trim(get_if_isset($data, 'nombre_usuario'));
            $data->correo = trim($data->correo);
            $data->password = trim($data->password);
            $data->id_usuario_agregado_por = $this->get_current_user_id();

            if (
                !isEmail($data->correo) ||
                $this->userModel->exists_user_with_email($data->correo)
            ) {
                $errors['correo_error'] = "Correo invalido o en uso";
            }
            if (
                !empty($data->nombre_usuario) &&
                $this->userModel->exists_user_with_username($data->nombre_usuario)
            ) {
                $errors['nombre_usuario_error'] = "Nombre de usuario en uso";
            }
            if (!isValidPassword($data->password)) {
                $errors['password_error'] = "Clave invalida";
            }
        }

        if (count($errors) > 0) {
            $this->response($errors, ERROR_FORBIDDEN, false);
        }
        $data->password = get_hash_password($data->password);
        return $data;
    }
    // ====== End Add User ======

    // ====== Update User  ======
    public function update($id)
    {
        $this->usePutRequest();
        $this->private_route(CTR_ADMIN_SAME_USER, $id);

        $data = $this->valid_update_user_data(getJsonData(), $id);
        $success = $this->userModel->update_user($data);
        if (!$success) {
            $this->response(null, ERROR_NOTFOUND);
        }
        $user = $this->userModel->get_by_id($id);
        $user->usuario_creador = $this->userModel->get_by_id($user->id_usuario_creado_por);
        $this->response($user);
    }

    private function valid_update_user_data($data, $id)
    {
        $errors = [];
        if (is_empty_array($data)) {
            $errors['params_error'] = "Parametros invalidos";
        } else {

            if (!isset($data->nombre) || empty($data->nombre)) {
                $errors['nombre_error'] = "Nombre invalido";
            }

            if (!isset($data->nombre_usuario) || empty($data->nombre_usuario)) {
                $errors['nombre_usuario_error'] = "Nombre de usuario invalido";
            } elseif (!$this->userModel->can_user_update_username($id, $data->nombre_usuario)) {
                $errors['nombre_usuario_error'] = "Nombre de usuario no disponible";
            }

            if (!isset($data->admin)) {
                $errors['admin_error'] = "Campo invalido";
            }

            if (!isset($data->habilitado)) {
                $errors['habilitado_error'] = "Campo invalido";
            }
        }

        if (count($errors) > 0) {
            $this->response($errors, ERROR_FORBIDDEN);
        }
        $data->id = $id;
        return $data;
    }
    // ====== End Update User  ======

    // ====== Update password  ======
    public function update_password($id)
    {
        $this->usePutRequest();
        $this->private_route(CTR_ADMIN_SAME_USER, $id);

        $data = $this->validate_update_password_data(getJsonData());
        $data->id = $id;
        $success = $this->userModel->update_user_password($data);
        if (!$success) {
            $this->response(null, ERROR_NOTFOUND);
        }
        $this->response();
    }

    private function validate_update_password_data($data)
    {
        $errors = [];

        if (!isset($data->password) || empty($data->password)) {
            $errors['password_error'] = "Uno o mas parametros invalidos";
        } else {
            if (!isValidPassword($data->password)) {
                $errors['password_error'] = "Clave invalida";
            }
        }

        if (count($errors) > 0) {
            $this->response($errors, ERROR_FORBIDDEN);
        }

        $data->password = get_hash_password($data->password);

        return $data;
    }
    // ====== End Update password ===


    // ====== Update user to admin ===
    public function update_to_admin($id)
    {
        $this->usePutRequest();
        $this->private_route(CTR_ADMIN);

        $success = $this->userModel->update_user_to_admin($id, $this->get_current_user_id());
        if (!$success) {
            $this->response(null, ERROR_NOTFOUND);
        }
        $this->response();
    }
    // ====== End Update user to admin ===

    public function disable($id)
    {
        $this->usePutRequest();
        $this->private_route(CTR_ADMIN);

        $success = $this->userModel->disable_user_by_id($id);
        if (!$success) {
            $this->response(null, ERROR_NOTFOUND);
        }
        $this->response();
    }

    public function enable($id)
    {
        $this->usePutRequest();
        $this->private_route(CTR_ADMIN);

        $success = $this->userModel->enable_user_by_id($id);
        if (!$success) {
            $this->response(null, ERROR_NOTFOUND);
        }
        $this->response();
    }

    public function delete($id)
    {
        $this->useDeleteRequest();
        $this->private_route(CTR_ADMIN);

        $success = $this->userModel->delete_user_by_id($id, $this->get_current_user_id());
        if (!$success) {
            $this->response(null, ERROR_NOTFOUND);
        }
        $this->response();
    }

    // Advance functions
    public function search($field)
    {
        $this->useGetRequest();
        $this->private_route(CTR_ADMIN);
        $results = $this->userModel->search_user($field);
        $this->response($results);
    }

    // Helpers
    public function get_locals()
    {
        $this->useGetRequest();
        $this->private_route();
        $locals = $this->employeModel->get_locals_for_employe_by_userid($this->get_current_user_id());
        $this->response($locals);
    }
}

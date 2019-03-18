<?php 
    function curent_time() {
        return strtotime(date('Y-m-d H:i:s'));
    }

    function array_to_obj($array) {
        return json_decode(json_encode($array), false);
    }

    function get_config_values() {
        $direction = '/../../../vars/config.ini';
        if (!file_exists(APP_ROOT . $direction)) {
            serverErrorHeader(true);
        }
        $values = parse_ini_file(APP_ROOT . $direction);
        if(is_null($values)) {
            serverErrorHeader(true);
        }
        return array_to_obj($values);
    }

    function get_hash_password($password) {
        $options = [
            'cost' => 11,
            'salt' => random_bytes(22)
        ];
        return password_hash($password, PASSWORD_BCRYPT, $options);
    }

    function get_if_isset($var, $key, $default = "") {
        if (is_null($var)) {
            return $default;
        }

        if (is_object($var)) {
            if (!isset($var->$key)) {
                return $default;
            } 
            return $var->$key;
        } else {
            if (!isset($var[$key])) {
                return $default;
            } 
            return $var[$key];
        }
    }

    function json_set_null_params_if_not_exists($json, $params = []) {
        if (count($params) > 0 && 
            is_object($json)) {
            foreach($params as &$param) {
                if (!isset($json->$param)) {
                    $json->$param = null;
                }
            }
        }
        return $json;
    }

    function convert_to_bool_values($json, $params = []) {
        if(count($params) > 0 && 
            is_object($json)) {
            
            foreach($params as $param) {
                if (isset($json->$param)) {
                    $json->$param = $json->$param == true;
                }
            }
        }
        return $json;
    }
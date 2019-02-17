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
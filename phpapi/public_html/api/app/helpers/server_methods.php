<?php 
    function getRequestMethod() {
        return $_SERVER['REQUEST_METHOD'];
    }

    // Headers de respuesta
    function jsonHeader() {
        header('Content-Type: application/json');
    }

    function notFoundHeader($endRequest = false) {
        header("HTTP/1.0 404 Not Found");
        if ($endRequest) { die(); }
    }

    function notAuthorizedHeader($endRequest = false) {
        header("HTTP/1.0 403 Forbidden");
        if ($endRequest) { die(); }
    }

    function serverErrorHeader($endRequest = false) {
        header("HTTP/1.0 500 Internal Error");
        if ($endRequest) { die(); }
    }

    function is_get_request() {
        return getRequestMethod() == "GET";
    }

    function is_post_request() {
        return getRequestMethod() == "POST";
    }

    function is_put_request() {
        return getRequestMethod() == "PUT";
    }

    function is_delete_request() {
        return getRequestMethod() == "DELETE";
    }

    function sendJsonData($data, $die = false) {
        jsonHeader();
        echo json_encode($data);
        if ($die) { die(); }
    }
        
    function getJsonData() {
        $data = json_decode(file_get_contents('php://input'), true);
        if (!is_null($data)) {
            $data = array_to_obj($data);
        }
        return $data;
    }

    function errorLog($str) {

    }

    function processLog($str) {

    }

    function sendResponse($data = null, $error = null) {
        if (!is_null($error)) {
            switch($error) {
                case 404:
                    notFoundHeader();
                break;

                case 403:
                    notAuthorizedHeader();
                break;

                case 500:
                    serverErrorHeader();
                break;
            }
        }
        if (!is_null($data)) {
            jsonHeader();
            echo json_encode($data);
        }
        die();
    }
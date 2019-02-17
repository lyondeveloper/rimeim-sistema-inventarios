<?php
    define('APP_ROOT', dirname(dirname(__FILE__)));

    $values = get_config_values();
    define('DB_HOST', $values->db_host);
    define('DB_USER', $values->db_user);
    define('DB_PASS', $values->db_pass);
    DEFINE('DB_NAME', $values->db_name);
    define('KEY_BEARER', $values->key_bearer);
    define('KEY_TOKEN', $values->key_token);
    define('TOKEN_DURATION', $values->token_duration);
    unset($values);

    define('URLROOT', 'http://localhost/');
    define('SITENAME', 'TraversyMVC');


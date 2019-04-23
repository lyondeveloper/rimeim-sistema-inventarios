<?php 
    /* 
    PROVIDERS

    Esta clase se encarga de ejecutar todas las peticiones HTTP
    para todo lo relacionado a PROVEEDORES
    */

    class Providers extends Controller {

        public function __construct()
        {
            $this->initController(CTR_EMPLEADO);
        }
        
    }
<?php 

    /* 
    Descripcion:
    Este controlador maneja todas las peticiones web referentes a Productos

    Acceso:
    Empleados
    */

    class Products extends Controller {

        public function __construct()
        {
            $this->initController(CTR_EMPLEADO);
            $this->productModel = $this->model('Product');
        }

        public function get() {
            $this->useGetRequest();

        }
    }
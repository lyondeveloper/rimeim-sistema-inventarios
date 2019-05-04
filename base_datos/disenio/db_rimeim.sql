-- MySQL Script generated by MySQL Workbench
-- Sat May  4 13:13:39 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Table `tb_usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_usuario` ;

CREATE TABLE IF NOT EXISTS `tb_usuario` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_usuario_creado_por` BIGINT NULL,
  `id_usuario_eliminado_por` BIGINT NULL,
  `nombre` VARCHAR(200) NOT NULL,
  `nombre_usuario` VARCHAR(100) NULL,
  `correo` VARCHAR(200) NOT NULL,
  `clave` VARCHAR(255) NOT NULL,
  `admin` TINYINT NOT NULL DEFAULT 0,
  `primera_sesion` TINYINT NOT NULL DEFAULT 1,
  `habilitado` TINYINT NOT NULL DEFAULT 1,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_local`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_local` ;

CREATE TABLE IF NOT EXISTS `tb_local` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_usuario_creado_por` BIGINT NOT NULL,
  `id_usuario_eliminado_por` BIGINT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  `codigo` VARCHAR(100) NULL,
  `descripcion` TEXT NULL,
  `descripcion_ubicacion` TEXT NULL,
  `color_hex` VARCHAR(50) NULL,
  `es_bodega` TINYINT NOT NULL DEFAULT 0,
  `latitud` DOUBLE NULL,
  `longitud` DOUBLE NULL,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_local_id_usuario_creado_por_idx` (`id_usuario_creado_por` ASC),
  INDEX `fk_local_id_usuario_eliminado_por_idx` (`id_usuario_eliminado_por` ASC),
  CONSTRAINT `fk_local_id_usuario_creado_por`
    FOREIGN KEY (`id_usuario_creado_por`)
    REFERENCES `tb_usuario` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_local_id_usuario_eliminado_por`
    FOREIGN KEY (`id_usuario_eliminado_por`)
    REFERENCES `tb_usuario` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_archivo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_archivo` ;

CREATE TABLE IF NOT EXISTS `tb_archivo` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_usuario_creado_por` BIGINT NOT NULL,
  `url` TEXT NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `eliminado` TINYINT(1) NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_tipo_vehiculo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_tipo_vehiculo` ;

CREATE TABLE IF NOT EXISTS `tb_tipo_vehiculo` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_archivo` BIGINT NULL,
  `nombre` VARCHAR(200) NOT NULL,
  `descripcion` TEXT NULL,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tipo_vehiculo_id_archivo_idx` (`id_archivo` ASC),
  CONSTRAINT `fk_tipo_vehiculo_id_archivo`
    FOREIGN KEY (`id_archivo`)
    REFERENCES `tb_archivo` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_marca`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_marca` ;

CREATE TABLE IF NOT EXISTS `tb_marca` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_archivo` BIGINT NULL,
  `nombre` VARCHAR(200) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_marca_id_archivo_idx` (`id_archivo` ASC),
  CONSTRAINT `fk_marca_id_archivo`
    FOREIGN KEY (`id_archivo`)
    REFERENCES `tb_archivo` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_producto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_producto` ;

CREATE TABLE IF NOT EXISTS `tb_producto` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_tipo_vehiculo` BIGINT NULL,
  `id_marca` BIGINT NULL,
  `codigo_barra` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  `descripcion` TEXT NULL,
  `raro` TINYINT NOT NULL DEFAULT 0,
  `precio` DOUBLE NOT NULL,
  `existencia` BIGINT NOT NULL DEFAULT 0 COMMENT 'Este campo almacena la cantidad global en existencia para este producto',
  `cantidad_minima` INT NOT NULL DEFAULT 0,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `codigo_barra_UNIQUE` (`codigo_barra` ASC),
  INDEX `fk_producto_id_tipo_vehiculo_idx` (`id_tipo_vehiculo` ASC),
  INDEX `fk_producto_id_marca_idx` (`id_marca` ASC),
  CONSTRAINT `fk_producto_id_tipo_vehiculo`
    FOREIGN KEY (`id_tipo_vehiculo`)
    REFERENCES `tb_tipo_vehiculo` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_producto_id_marca`
    FOREIGN KEY (`id_marca`)
    REFERENCES `tb_marca` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_empleado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_empleado` ;

CREATE TABLE IF NOT EXISTS `tb_empleado` (
  `id` BIGINT NOT NULL,
  `id_local` BIGINT NOT NULL,
  `id_usuario` BIGINT NOT NULL,
  `id_usuario_creado_por` BIGINT NOT NULL,
  `id_usuario_eliminado_por` BIGINT NULL,
  `admin` TINYINT NOT NULL DEFAULT 0,
  `habilitado` TINYINT NOT NULL DEFAULT 1,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_empleado_id_usuario_idx` (`id_usuario` ASC),
  INDEX `fk_empleado_id_local_idx` (`id_local` ASC),
  INDEX `fk_empleado_id_usuario_creado_por_idx` (`id_usuario_creado_por` ASC),
  INDEX `fk_empleado_id_usuario_eliminado_por_idx` (`id_usuario_eliminado_por` ASC),
  CONSTRAINT `fk_empleado_id_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `tb_usuario` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_empleado_id_local`
    FOREIGN KEY (`id_local`)
    REFERENCES `tb_local` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_empleado_id_usuario_creado_por`
    FOREIGN KEY (`id_usuario_creado_por`)
    REFERENCES `tb_usuario` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_empleado_id_usuario_eliminado_por`
    FOREIGN KEY (`id_usuario_eliminado_por`)
    REFERENCES `tb_usuario` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_cliente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_cliente` ;

CREATE TABLE IF NOT EXISTS `tb_cliente` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_local_registrado` BIGINT NOT NULL COMMENT 'Este campo almacena el id del local en el que fue registrado este cliente',
  `id_empleado_creado_por` BIGINT NOT NULL,
  `id_empleado_eliminado_por` BIGINT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  `codigo` VARCHAR(50) NULL,
  `rtn` VARCHAR(100) NULL,
  `correo` VARCHAR(100) NULL,
  `telefono` VARCHAR(50) NULL,
  `es_empresa` TINYINT NOT NULL DEFAULT 0,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `rtn_UNIQUE` (`rtn` ASC),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC),
  UNIQUE INDEX `telefono_UNIQUE` (`telefono` ASC),
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC),
  INDEX `fk_cliente_id_local_registrado_idx` (`id_local_registrado` ASC),
  INDEX `fk_cliente_id_empleado_creado_por_idx` (`id_empleado_creado_por` ASC),
  INDEX `fk_cliente_id_usuario_eliminado_por_idx` (`id_empleado_eliminado_por` ASC),
  CONSTRAINT `fk_cliente_id_empleado_creado_por`
    FOREIGN KEY (`id_empleado_creado_por`)
    REFERENCES `tb_empleado` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_cliente_id_local_registrado`
    FOREIGN KEY (`id_local_registrado`)
    REFERENCES `tb_local` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_cliente_id_usuario_eliminado_por`
    FOREIGN KEY (`id_empleado_eliminado_por`)
    REFERENCES `tb_empleado` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_proveedor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_proveedor` ;

CREATE TABLE IF NOT EXISTS `tb_proveedor` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_empleado_creado_por` BIGINT NULL,
  `id_imagen` BIGINT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `rtn` VARCHAR(100) NULL,
  `telefono` VARCHAR(100) NULL,
  `correo` VARCHAR(100) NULL,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `tb_proveedorcol_UNIQUE` (`rtn` ASC),
  UNIQUE INDEX `telefono_UNIQUE` (`telefono` ASC),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC),
  INDEX `fk_proveedor_id_empleado_creado_por_idx` (`id_empleado_creado_por` ASC),
  INDEX `fk_proveedor_id_imagen_idx` (`id_imagen` ASC),
  CONSTRAINT `fk_proveedor_id_empleado_creado_por`
    FOREIGN KEY (`id_empleado_creado_por`)
    REFERENCES `tb_empleado` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_proveedor_id_imagen`
    FOREIGN KEY (`id_imagen`)
    REFERENCES `tb_archivo` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_pedido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_pedido` ;

CREATE TABLE IF NOT EXISTS `tb_pedido` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_empleado_creado_por` BIGINT NOT NULL,
  `id_empleado_eliminado_por` BIGINT NULL,
  `id_local` BIGINT NOT NULL,
  `id_local_solicitado` BIGINT NULL COMMENT 'Este campo almacena el id del local al cual se le esta solicitando los productos en caso de que no sea una compra a proveedores',
  `id_proveedor` BIGINT NULL,
  `codigo` VARCHAR(50) NULL,
  `es_compra` TINYINT NOT NULL DEFAULT 1,
  `recibido` TINYINT NOT NULL DEFAULT 0,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `fecha_prevista_entrega` DATETIME NULL,
  `fecha_recibido` DATETIME NULL,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC),
  INDEX `fk_pedido_id_empleado_creado_por_idx` (`id_empleado_creado_por` ASC),
  INDEX `fk_pedido_id_empleado_eliminado_por_idx` (`id_empleado_eliminado_por` ASC),
  INDEX `fk_pedido_id_local_idx` (`id_local` ASC),
  INDEX `fk_pedido_id_local_solicitado_idx` (`id_local_solicitado` ASC),
  INDEX `fk_pedido_id_proveedor_idx` (`id_proveedor` ASC),
  CONSTRAINT `fk_pedido_id_empleado_creado_por`
    FOREIGN KEY (`id_empleado_creado_por`)
    REFERENCES `tb_empleado` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_pedido_id_empleado_eliminado_por`
    FOREIGN KEY (`id_empleado_eliminado_por`)
    REFERENCES `tb_empleado` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_pedido_id_local`
    FOREIGN KEY (`id_local`)
    REFERENCES `tb_local` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_pedido_id_local_solicitado`
    FOREIGN KEY (`id_local_solicitado`)
    REFERENCES `tb_local` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_pedido_id_proveedor`
    FOREIGN KEY (`id_proveedor`)
    REFERENCES `tb_proveedor` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_venta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_venta` ;

CREATE TABLE IF NOT EXISTS `tb_venta` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_local` BIGINT NOT NULL,
  `id_cliente` BIGINT NULL,
  `id_empleado_creado_por` BIGINT NOT NULL,
  `id_empleado_eliminado_por` BIGINT NULL,
  `codigo` VARCHAR(50) NULL,
  `con_factura` TINYINT NOT NULL DEFAULT 1,
  `sub_total` DOUBLE NOT NULL,
  `impuesto` DOUBLE NOT NULL,
  `total` DOUBLE NOT NULL,
  `metodo_pago` VARCHAR(100) NULL,
  `es_cotizacion` TINYINT NOT NULL DEFAULT 0,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC),
  INDEX `fk_venta_id_local_idx` (`id_local` ASC),
  INDEX `fk_venta_id_cliente_idx` (`id_cliente` ASC),
  INDEX `fk_venta_id_empleado_creado_por_idx` (`id_empleado_creado_por` ASC),
  INDEX `fk_venta_id_empleado_eliminado_por_idx` (`id_empleado_eliminado_por` ASC),
  CONSTRAINT `fk_venta_id_local`
    FOREIGN KEY (`id_local`)
    REFERENCES `tb_local` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_venta_id_cliente`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `tb_cliente` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_venta_id_empleado_creado_por`
    FOREIGN KEY (`id_empleado_creado_por`)
    REFERENCES `tb_empleado` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_venta_id_empleado_eliminado_por`
    FOREIGN KEY (`id_empleado_eliminado_por`)
    REFERENCES `tb_empleado` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_devolucion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_devolucion` ;

CREATE TABLE IF NOT EXISTS `tb_devolucion` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_venta` BIGINT NOT NULL,
  `id_empleado_creado_por` BIGINT NOT NULL,
  `id_empleado_eliminado_por` BIGINT NULL,
  `detalle` TEXT NULL,
  `total_devuelto` DOUBLE NOT NULL DEFAULT 0,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_devolucion_id_empleado_creado_por_idx` (`id_empleado_creado_por` ASC),
  INDEX `fk_devolucion_id_empleado_eliminado_por_idx` (`id_empleado_eliminado_por` ASC),
  INDEX `fk_devolucion_id_venta_idx` (`id_venta` ASC),
  CONSTRAINT `fk_devolucion_id_empleado_creado_por`
    FOREIGN KEY (`id_empleado_creado_por`)
    REFERENCES `tb_empleado` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_devolucion_id_empleado_eliminado_por`
    FOREIGN KEY (`id_empleado_eliminado_por`)
    REFERENCES `tb_empleado` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_devolucion_id_venta`
    FOREIGN KEY (`id_venta`)
    REFERENCES `tb_venta` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_pedido_solicitud`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_pedido_solicitud` ;

CREATE TABLE IF NOT EXISTS `tb_pedido_solicitud` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_pedido` BIGINT NOT NULL,
  `id_local` BIGINT NOT NULL,
  `id_empleado_encargado` BIGINT NULL,
  `enviado` TINYINT NOT NULL DEFAULT 0,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_enviado` DATETIME NULL,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pedido_solicitud_id_pedido_idx` (`id_pedido` ASC),
  INDEX `fk_pedido_solicitud_id_local_idx` (`id_local` ASC),
  INDEX `fk_pedido_solicitud_id_empleado_encargado_idx` (`id_empleado_encargado` ASC),
  CONSTRAINT `fk_pedido_solicitud_id_pedido`
    FOREIGN KEY (`id_pedido`)
    REFERENCES `tb_pedido` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_pedido_solicitud_id_local`
    FOREIGN KEY (`id_local`)
    REFERENCES `tb_local` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_pedido_solicitud_id_empleado_encargado`
    FOREIGN KEY (`id_empleado_encargado`)
    REFERENCES `tb_empleado` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_producto_imagenes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_producto_imagenes` ;

CREATE TABLE IF NOT EXISTS `tb_producto_imagenes` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_producto` BIGINT NOT NULL,
  `id_archivo` BIGINT NOT NULL,
  `principal` TINYINT NOT NULL DEFAULT 0,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_producto_imagenes_id_producto_idx` (`id_producto` ASC),
  INDEX `fk_producto_imagenes_id_archivo_idx` (`id_archivo` ASC),
  CONSTRAINT `fk_producto_imagenes_id_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `tb_producto` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_producto_imagenes_id_archivo`
    FOREIGN KEY (`id_archivo`)
    REFERENCES `tb_archivo` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_producto_local`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_producto_local` ;

CREATE TABLE IF NOT EXISTS `tb_producto_local` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_producto` BIGINT NOT NULL,
  `id_local` BIGINT NOT NULL,
  `existencia` BIGINT NOT NULL DEFAULT 0,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `cantidad_minima` INT NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_producto_local_id_local_idx` (`id_local` ASC),
  INDEX `fk_producto_local_id_producto_idx` (`id_producto` ASC),
  CONSTRAINT `fk_producto_local_id_local`
    FOREIGN KEY (`id_local`)
    REFERENCES `tb_local` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_producto_local_id_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `tb_producto` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_producto_local_ubicacion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_producto_local_ubicacion` ;

CREATE TABLE IF NOT EXISTS `tb_producto_local_ubicacion` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_producto_local` BIGINT NOT NULL,
  `ubicacion` VARCHAR(100) NOT NULL,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_producto_local_ubicacion_id_producto_local_idx` (`id_producto_local` ASC),
  CONSTRAINT `fk_producto_local_ubicacion_id_producto_local`
    FOREIGN KEY (`id_producto_local`)
    REFERENCES `tb_producto_local` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_venta_producto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_venta_producto` ;

CREATE TABLE IF NOT EXISTS `tb_venta_producto` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_venta` BIGINT NOT NULL,
  `id_producto` BIGINT NOT NULL,
  `oferta` TINYINT NOT NULL DEFAULT 0 COMMENT 'Este campo indica cuando un producto ha recibido un precio diferente al puesto como base\n',
  `precio` DOUBLE NOT NULL,
  `cantidad` INT NOT NULL,
  `total` DOUBLE NOT NULL,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_venta_produco_id_producto_idx` (`id_producto` ASC),
  INDEX `fk_venta_producto_id_venta_idx` (`id_venta` ASC),
  CONSTRAINT `fk_venta_producto_id_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `tb_producto` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_venta_producto_id_venta`
    FOREIGN KEY (`id_venta`)
    REFERENCES `tb_venta` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_devolucion_producto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_devolucion_producto` ;

CREATE TABLE IF NOT EXISTS `tb_devolucion_producto` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_devolucion` BIGINT NOT NULL,
  `id_venta_producto` BIGINT NOT NULL,
  `cantidad` INT NOT NULL DEFAULT 0,
  `eliminado` TINYINT(1) NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_devolucion_producto_id_devolucion_idx` (`id_devolucion` ASC),
  INDEX `fk_devolucion_producto_id_venta_producto_idx` (`id_venta_producto` ASC),
  CONSTRAINT `fk_devolucion_producto_id_devolucion`
    FOREIGN KEY (`id_devolucion`)
    REFERENCES `tb_devolucion` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_devolucion_producto_id_venta_producto`
    FOREIGN KEY (`id_venta_producto`)
    REFERENCES `tb_venta_producto` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_proveedor_producto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_proveedor_producto` ;

CREATE TABLE IF NOT EXISTS `tb_proveedor_producto` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_proveedor` BIGINT NOT NULL,
  `id_producto` BIGINT NOT NULL,
  `precio` DOUBLE NOT NULL,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_proveedor_producto_id_proveedor_idx` (`id_proveedor` ASC),
  INDEX `fk_proveedor_producto_id_producto_idx` (`id_producto` ASC),
  CONSTRAINT `fk_proveedor_producto_id_proveedor`
    FOREIGN KEY (`id_proveedor`)
    REFERENCES `tb_proveedor` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_proveedor_producto_id_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `tb_producto` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_pedido_producto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_pedido_producto` ;

CREATE TABLE IF NOT EXISTS `tb_pedido_producto` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_pedido` BIGINT NOT NULL,
  `id_producto` BIGINT NOT NULL,
  `cantidad` INT NOT NULL,
  `costo` DOUBLE NOT NULL,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pedido_producto_id_pedido_idx` (`id_pedido` ASC),
  INDEX `fk_pedido_producto_id_producto_idx` (`id_producto` ASC),
  CONSTRAINT `fk_pedido_producto_id_pedido`
    FOREIGN KEY (`id_pedido`)
    REFERENCES `tb_pedido` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_pedido_producto_id_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `tb_producto` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_pedido_producto_reparto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_pedido_producto_reparto` ;

CREATE TABLE IF NOT EXISTS `tb_pedido_producto_reparto` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_pedido_producto` BIGINT NOT NULL,
  `id_local` BIGINT NOT NULL,
  `cantidad` INT NOT NULL,
  `recibido` TINYINT NOT NULL DEFAULT 0,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pedido_producto_reparto_id_pedido_producto_idx` (`id_pedido_producto` ASC),
  INDEX `fk_pedido_producto_reparto_id_local_idx` (`id_local` ASC),
  CONSTRAINT `fk_pedido_producto_reparto_id_pedido_producto`
    FOREIGN KEY (`id_pedido_producto`)
    REFERENCES `tb_pedido_producto` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_pedido_producto_reparto_id_local`
    FOREIGN KEY (`id_local`)
    REFERENCES `tb_local` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_cliente_producto_precio`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_cliente_producto_precio` ;

CREATE TABLE IF NOT EXISTS `tb_cliente_producto_precio` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_cliente` BIGINT NOT NULL,
  `id_producto` BIGINT NOT NULL,
  `precio` DOUBLE NULL,
  `eliminado` TINYINT NOT NULL DEFAULT 0,
  `fecha_creado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminado` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cliente_producto_precio_id_cliente_idx` (`id_cliente` ASC),
  INDEX `fk_cliente_producto_precio_id_producto_idx` (`id_producto` ASC),
  CONSTRAINT `fk_cliente_producto_precio_id_cliente`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `tb_cliente` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_cliente_producto_precio_id_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `tb_producto` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


drop function if exists func_get_next_venta_id;
delimiter $$
create function func_get_next_venta_id()
returns bigint 
begin
	set @new_id = (select id from tb_venta order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;


drop function if exists funct_exists_sale_with_code;
delimiter $$
create function funct_exists_sale_with_code(p_codigo varchar(50))
returns boolean
begin
	set @response = false;
	set p_codigo = trim(p_codigo);
    
    if (!is_empty(p_codigo)) then 
		set @response = exists(
			select * from tb_venta v
            where v.codigo = p_codigo
        );
    end if;
    
    return @response;
end $$
delimiter ;


drop procedure if exists proc_search_ventas;
delimiter $$
create procedure proc_search_ventas(in p_id_local bigint,
                                    in p_id_cliente bigint,
                                    in p_codigo varchar(50),
                                    in p_con_factura boolean,
                                    in p_metodo_pago varchar(100),
                                    in p_es_cotizacion boolean,
                                    in p_fecha_inicio datetime,
                                    in p_fecha_final datetime)
begin
    set p_codigo = trim(p_codigo);
    set p_metodo_pago = trim_and_lower(p_metodo_pago);
    set @sql_query = "select distinct v.id,
                v.id_local,
                v.id_cliente,
                v.id_empleado_creado_por,
                v.codigo,
                v.con_factura,
                v.total,
                v.fecha_creado
        from tb_venta v 
        where v.eliminado = false ";
    
    if (valid_int_id(p_id_local)) then 
        set @sql_query = concat(@sql_query, " and v.id_local = ", p_id_local);
    end if;

    if (valid_int_id(p_id_cliente)) then 
        set @sql_query = concat(@sql_query, " and v.id_cliente = ", p_id_cliente);
    end if;

    if (p_fecha_inicio is not null and 
        p_fecha_final is not null) then
        set @sql_query = concat(@sql_query, " and v.fecha_creado between ", p_fecha_inicio , " and ", p_fecha_final);
    end if;

    if (!is_empty(p_codigo)) then 
        set @sql_query = concat(@sql_query, " and v.codigo like concat('%', '", p_codigo, "', '%') ");
    end if; 

    if (p_con_factura is not null) then 
        set @sql_query = concat(@sql_query, " and v.con_factura = ", p_con_factura);
    end if;
    
    if (!is_empty(p_metodo_pago)) then 
        set @sql_query = concat(@sql_query, " and v.metodo_pago = '", p_metodo_pago, "' ");
    end if;

    if (p_es_cotizacion is not null) then 
        set @sql_query = concat(@sql_query, " and v.es_cotizacion = ", p_es_cotizacion);
    else 
        set @sql_query = concat(@sql_query, " and v.es_cotizacion = false ");
    end if;

    set @sql_query = concat(@sql_query, " order by v.fecha_creado desc;");

    PREPARE sql_statement FROM @sql_query;
    EXECUTE sql_statement;
end $$
delimiter ;


drop procedure if exists proc_get_ventas;
delimiter $$
create procedure proc_get_ventas()
begin
    select v.id,
            v.id_local,
            v.id_cliente,
            v.id_empleado_creado_por,
            v.codigo,
            v.con_factura,
            v.total,
            v.fecha_creado
    from tb_venta v 
    where v.eliminado = false 
    and v.es_cotizacion = false
    order by v.fecha_creado desc;
end $$
delimiter ;

drop procedure if exists proc_get_cotizaciones;
delimiter $$
create procedure proc_get_cotizaciones()
begin
    select v.id,
            v.id_local,
            v.id_cliente,
            v.id_empleado_creado_por,
            v.codigo,
            v.total,
            v.fecha_creado
    from tb_venta v 
    where v.eliminado = false 
    and v.es_cotizacion = true
    order by v.fecha_creado desc;
end $$
delimiter ;

drop procedure if exists proc_get_venta_by_id;
delimiter $$
create procedure proc_get_venta_by_id(in p_id bigint)
begin

    if (valid_int_id(p_id)) then
        select v.id,
                v.id_local,
                v.id_cliente,
                v.id_empleado_creado_por,
                v.codigo,
                v.con_factura,
                v.sub_total,
                v.impuesto,
                v.total,
                v.metodo_pago,
                v.fecha_creado
        from tb_venta v 
        where v.eliminado = false 
        and v.id = p_id
        and v.es_cotizacion = false;
    end if;

end $$
delimiter ;

drop procedure if exists proc_get_cotizacion_by_id;
delimiter $$
create procedure proc_get_cotizacion_by_id(in p_id bigint)
begin

    if (valid_int_id(p_id)) then
        select v.id,
                v.id_local,
                v.id_cliente,
                v.id_empleado_creado_por,
                v.codigo,
                v.sub_total,
                v.impuesto,
                v.total,
                v.fecha_creado
        from tb_venta v 
        where v.eliminado = false 
        and v.id = p_id
        and v.es_cotizacion = true;
    end if;

end $$
delimiter ;

drop procedure if exists proc_get_venta_by_id_local;
delimiter $$
create procedure proc_get_venta_by_id_local(in p_id_local bigint)
begin

    if (valid_int_id(p_id_local)) then
        select v.id,
                v.id_local,
                v.id_cliente,
                v.id_empleado_creado_por,
                v.codigo,
                v.con_factura,
                v.total,
                v.fecha_creado
        from tb_venta v 
        where v.eliminado = false 
        and v.id_local = p_id_local
        and v.es_cotizacion = false
	order by v.fecha_creado desc;
    end if;

end $$
delimiter ;

drop procedure if exists proc_get_cotizaciones_by_id_local;
delimiter $$
create procedure proc_get_cotizaciones_by_id_local(in p_id_local bigint)
begin

    if (valid_int_id(p_id_local)) then
        select v.id,
                v.id_local,
                v.id_cliente,
                v.id_empleado_creado_por,
                v.codigo,
                v.total,
                v.fecha_creado
        from tb_venta v 
        where v.eliminado = false 
        and v.id_local = p_id_local
        and v.es_cotizacion = true
	order by v.fecha_creado desc;
    end if;

end $$
delimiter ;

drop procedure if exists proc_add_venta;
delimiter $$
create procedure proc_add_venta(in p_id_local bigint,
                                in p_id_cliente bigint,
                                in p_id_empleado_creado_por bigint,
                                in p_codigo varchar(50),
                                in p_con_factura boolean,
                                in p_sub_total double,
                                in p_impuesto double,
                                in p_total double,
                                in p_metodo_pago varchar(100),
                                in p_es_cotizacion boolean )
begin
    set p_codigo = trim(p_codigo);
    set p_con_factura = default_bool_value(p_con_factura, true);
    set p_es_cotizacion = default_bool_value(p_es_cotizacion, false);

    set @new_id = null;

    if (valid_int_id(p_id_empleado_creado_por) and 
        valid_int_id(p_id_local) and 
        p_sub_total >= 0 and 
        p_impuesto >= 0) then

        set @new_id = func_get_next_venta_id();
        insert into tb_venta(
            `id`,
            `id_local`,
            `id_cliente`,
            `id_empleado_creado_por`,
            `codigo`,
            `con_factura`,
            `sub_total`,
            `impuesto`,
            `total`,
            `metodo_pago`,
            `es_cotizacion`
        ) values (
            @new_id,
            p_id_local,
            p_id_cliente,
            p_id_empleado_creado_por,
            p_codigo,
            p_con_factura,
            p_sub_total,
            p_impuesto,
            p_total,
            p_metodo_pago,
            p_es_cotizacion
        );

    end if;

    select @new_id as 'id';
end $$
delimiter ;


drop procedure if exists proc_update_venta_by_id;
delimiter $$
create procedure proc_update_venta_by_id( in p_id bigint,
                                            in p_codigo varchar(50),
                                            in p_con_factura boolean,
                                            in p_sub_total double,
                                            in p_impuesto double,
                                            in p_total double,
                                            in p_metodo_pago varchar(100),
                                            in p_es_cotizacion boolean )
begin
    set p_con_factura = default_bool_value(p_con_factura, true);
    set p_es_cotizacion = default_bool_value(p_es_cotizacion, false);

    if (p_sub_total >= 0 and 
        p_impuesto >= 0 and 
        valid_int_id(p_id)) then

        update tb_venta
        set codigo = p_codigo,
            con_factura = p_con_factura,
            sub_total = p_sub_total,
            impuesto = p_impuesto,
            total = p_total,
            metodo_pago = p_metodo_pago,
            es_cotizacion = p_es_cotizacion
        where id = p_id
        and eliminado = false;
    end if;

end $$
delimiter ;

drop procedure if exists proc_delete_venta_by_id;
delimiter $$
create procedure proc_delete_venta_by_id(in p_id bigint,
                                        in p_id_empleado_eliminado_por bigint)
begin
    if (valid_int_id(p_id) and 
        valid_int_id(p_id_empleado_eliminado_por)) then

        update tb_venta 
        set id_empleado_eliminado_por = p_id_empleado_eliminado_por,
            eliminado = true,
            fecha_eliminado = current_timestamp()
        where id = p_id 
        and es_cotizacion = false;
    end if;
end $$
delimiter ; 

drop procedure if exists proc_delete_cotizacion_by_id;
delimiter $$
create procedure proc_delete_cotizacion_by_id(in p_id bigint,
                                        in p_id_empleado_eliminado_por bigint)
begin
    if (valid_int_id(p_id) and 
        valid_int_id(p_id_empleado_eliminado_por)) then

        update tb_venta 
        set id_empleado_eliminado_por = p_id_empleado_eliminado_por,
            eliminado = true,
            fecha_eliminado = current_timestamp()
        where id = p_id 
        and es_cotizacion = true;
    end if;
end $$
delimiter ; 


drop function if exists func_get_next_venta_producto_id;
delimiter $$
create function func_get_next_venta_producto_id()
returns bigint 
begin
	set @new_id = (select id from tb_venta_producto order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;

drop procedure if exists proc_get_venta_producto_by_venta;
delimiter $$
create procedure proc_get_venta_producto_by_venta(in p_id_venta bigint)
begin
    if (valid_int_id(p_id_venta)) then
        select v.id,
                v.id_producto,
                v.oferta,
                v.precio,
                v.cantidad,
                v.total,
                v.fecha_creado
        from tb_venta_producto v 
        where v.id_venta = p_id_venta
        and v.eliminado = false
        order by v.fecha_creado asc;
    end if;
end $$
delimiter ;

drop procedure if exists proc_get_venta_productos_minified_by_venta;
delimiter $$
create procedure proc_get_venta_productos_minified_by_venta(in p_id_venta bigint)
begin
    if (valid_int_id(p_id_venta)) then
        select v.id,
                v.id_producto,
                p.codigo_barra
        from tb_venta_producto v 
        join tb_producto p on p.id = v.id_producto
        where v.id_venta = p_id_venta
        and v.eliminado = false
        order by v.fecha_creado asc;
    end if;
end $$
delimiter ;

drop procedure if exists proc_add_venta_producto;
delimiter $$
create procedure proc_add_venta_producto(in p_id_venta bigint,
                                        in p_id_producto bigint,
                                        in p_oferta boolean,
                                        in p_precio double,
                                        in p_cantidad int(11),
                                        in p_total double)
begin

    set p_oferta = default_bool_value(p_oferta, false);

    set @new_id = null;

    if (valid_int_id(p_id_venta) and 
        valid_int_id(p_id_producto) and 
        p_precio >= 0 and 
        p_cantidad >= 0 and 
        p_total >= 0) then

        set @new_id = func_get_next_venta_producto_id();

        insert into tb_venta_producto (
            `id`,
            `id_venta`,
            `id_producto`,
            `oferta`,
            `precio`,
            `cantidad`,
            `total`
        ) values (
            @new_id,
            p_id_venta,
            p_id_producto,
            p_oferta,
            p_precio,
            p_cantidad,
            p_total
        );
    end if;

    select @new_id as 'id';
end $$
delimiter ;

drop procedure if exists proc_update_venta_producto;
delimiter $$
create procedure proc_update_venta_producto(in p_id bigint,
                                            in p_oferta boolean,
                                            in p_precio double,
                                            in p_cantidad int(11),
                                            in p_total double)
begin

    if (valid_int_id(p_id) and 
        p_precio >= 0 and 
        p_cantidad >= 0 and 
        p_total >= 0) then

        update tb_venta_producto 
        set oferta = p_oferta,
            precio = p_precio,
            cantidad = p_cantidad,
            total = p_total
        where eliminado = false 
        and id = p_id;
    end if;

end $$
delimiter ;

drop procedure if exists proc_delete_venta_producto_by_id;
delimiter $$
create procedure proc_delete_venta_producto_by_id(in p_id bigint)
begin

    if (valid_int_id(p_id)) then

        update tb_venta_producto 
        set eliminado = true,
            fecha_eliminado = current_timestamp()
        where id = p_id;
    end if;

end $$
delimiter ;
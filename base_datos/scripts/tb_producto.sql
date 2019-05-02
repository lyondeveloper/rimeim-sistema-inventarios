/*
drop function if exists func_get_next_producto_id;
delimiter $$
create function func_get_next_producto_id()
returns bigint 
begin
	set @new_id = (select id from tb_producto order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;

drop procedure if exists `proc_get_productos`;
delimiter $$
create procedure proc_get_productos()
begin
    select p.id,
            p.id_tipo_vehiculo,
            p.id_marca,
            p.nombre,
            p.precio,
            p.existencia
    from tb_producto p
    where p.eliminado = false
    order by p.nombre asc;
end $$
delimiter ;
*/

/*
drop procedure if exists `proc_search_producto`;
delimiter $$
create procedure proc_search_producto(in p_field varchar(255), in p_id_local bigint)
begin
    set p_field = trim(p_field);
    if (!is_empty(p_field)) then 
        if (p_id_local > 0) then 
            select pl.id,
                    pl.id_producto,
                    pl.id_local,
                    pl.existencia
            from tb_producto_local pl
            join tb_producto p on p.id = pl.id_producto
            where p.eliminado = false and
            pl.eliminado = false and 
            (
                p.nombre like concat('%', p_field ,'%') or 
                p.codigo_barra like concat('%', p_field ,'%')
            ) and 
            pl.id_local = p_id_local
            order by p.nombre asc;   

        else 
            select p.id,
                    p.id_tipo_vehiculo,
                    p.id_marca,
                    p.nombre,
                    p.precio,
                    p.existencia
            from tb_producto p
            where p.eliminado = false
            and (
                p.nombre like concat('%', p_field ,'%') or 
                p.codigo_barra like concat('%', p_field ,'%')
            )
            order by p.nombre asc;
        end if;
    end if;
end $$
delimiter ;
*/

/*
drop procedure if exists `proc_get_producto_by_id`;
delimiter $$
create procedure proc_get_producto_by_id(in p_id bigint)
begin
    if (valid_int_id(p_id)) then
        select p.id,
                p.id_tipo_vehiculo,
                p.id_marca,
                p.codigo_barra,
                p.nombre,
                p.descripcion,
                p.raro,
                p.precio,
                p.existencia,
                p.cantidad_minima,
                p.fecha_creado
        from tb_producto p
        where p.eliminado = false
        and p.id = p_id;
    end if;
end $$
delimiter ;
*/

/*
drop procedure if exists proc_get_producto_minified_by_id;
delimiter $$
create procedure proc_get_producto_minified_by_id(in p_id bigint)
begin
	if (valid_int_id(p_id)) then
		select p.id,
				p.id_tipo_vehiculo,
				p.id_marca,
                p.codigo_barra,
				p.nombre,
				p.precio,
				p.existencia
		from tb_producto p
		where p.eliminado = false
		and p.id = p_id;
    end if;
end $$
delimiter ;
*/

/*
drop procedure if exists `proc_get_producto_by_codigo_barra`;
delimiter $$
create procedure proc_get_producto_by_codigo_barra(in p_codigo_barra varchar(100))
begin
    set p_codigo_barra = trim(p_codigo_barra);
    if (!is_empty(p_codigo_barra)) then
        select p.id,
                p.id_tipo_vehiculo,
                p.id_marca,
                p.codigo_barra,
                p.nombre,
                p.descripcion,
                p.raro,
                p.precio,
                p.existencia,
                p.cantidad_minima,
                p.fecha_creado
        from tb_producto p
        where p.codigo_barra = p_codigo_barra
        and p.eliminado = false;
    end if;
end $$
delimiter ;
*/

/*
drop procedure if exists proc_get_producto_minified_by_codigo_barra_and_local;
delimiter $$
create procedure proc_get_producto_minified_by_codigo_barra_and_local(in p_codigo_barra varchar(100),
																		in p_id_local bigint)
begin
	set p_codigo_barra = trim(p_codigo_barra);
    if (!is_empty(p_codigo_barra) and
		valid_int_id(p_id_local)) then
		
        select p.id,
				p.codigo_barra,
                p.nombre,
                (
					select m.nombre
                    from tb_marca m
                    where m.id = p.id_marca 
                ) as 'marca_nombre',
                (
					select tv.nombre
                    from tb_tipo_vehiculo tv
                    where tv.id = p.id_tipo_vehiculo
                ) as 'tipo_vehiculo',
                p.precio
        from tb_producto p
        join tb_producto_local pl on pl.id_local = p_id_local
								and pl.id_producto = p.id
        and p.codigo_barra = p_codigo_barra
        and p.eliminado = false
        and pl.eliminado = false;
    end if;
end $$
delimiter ;
*/

drop procedure if exists proc_get_producto_minified_by_id_for_selldetails;
delimiter $$
create procedure proc_get_producto_minified_by_id_for_selldetails(in p_id bigint)
begin
    if (valid_int_id(p_id)) then
		
        select p.id,
				p.codigo_barra,
                p.nombre,
                (
					select m.nombre
                    from tb_marca m
                    where m.id = p.id_marca 
                ) as 'marca_nombre',
                (
					select tv.nombre
                    from tb_tipo_vehiculo tv
                    where tv.id = p.id_tipo_vehiculo
                ) as 'tipo_vehiculo',
                p.precio
        from tb_producto p
        where p.id = p_id;
    end if;
end $$
delimiter ;

/*
drop procedure if exists `proc_add_producto`;
delimiter $$
create procedure proc_add_producto(in p_id_tipo_vehiculo bigint,
                                    in p_id_marca bigint,
                                    in p_codigo_barra varchar(100),
                                    in p_nombre varchar(255),
                                    in p_descripcion text,
                                    in p_raro boolean,
                                    in p_precio double,
                                    in p_existencia bigint,
                                    in p_cantidad_minima int(11))
begin
    set p_codigo_barra = trim(p_codigo_barra);
    set p_nombre = trim_and_lower(p_nombre);
    set p_descripcion = trim(p_descripcion);
    set p_raro = default_bool_value(p_raro, false);

    set @new_id = null;

    if (!is_empty(p_codigo_barra) and 
        !is_empty(p_nombre) and 
        p_precio >= 0 and 
        p_existencia >= 0 and
        p_cantidad_minima >= 0) then

        set @new_id = func_get_next_producto_id();

        insert into tb_producto(
            `id`,
            `id_tipo_vehiculo`,
            `id_marca`,
            `codigo_barra`,
            `nombre`,
            `descripcion`,
            `raro`,
            `precio`,
            `existencia`,
            `cantidad_minima`
        ) values (
            @new_id,
            p_id_tipo_vehiculo,
            p_id_marca,
            p_codigo_barra,
            p_nombre,
            p_descripcion,
            p_raro,
            p_precio,
            p_existencia,
            p_cantidad_minima
        );
    end if;

    select @new_id as 'id';
end $$
delimiter ;

drop procedure if exists `proc_update_producto_by_id`;
delimiter $$
create procedure proc_update_producto_by_id(in p_id bigint,
                                            in p_id_tipo_vehiculo bigint,
                                            in p_id_marca bigint,
                                            in p_codigo_barra varchar(100),
                                            in p_nombre varchar(255),
                                            in p_descripcion text,
                                            in p_raro boolean,
                                            in p_precio double,
                                            in p_existencia bigint,
                                            in p_cantidad_minima int(11))
begin
    set p_codigo_barra = trim(p_codigo_barra);
    set p_nombre = trim_and_lower(p_nombre);
    set p_descripcion = trim(p_descripcion);
    set p_raro = default_bool_value(p_raro, false);

    if (valid_int_id(p_id) and 
        !is_empty(p_codigo_barra) and 
        !is_empty(p_nombre) and 
        p_precio >= 0 and 
        p_existencia >= 0 and
        p_cantidad_minima >= 0) then

        update tb_producto 
        set id_tipo_vehiculo = p_id_tipo_vehiculo,
            id_marca = p_id_marca,
            codigo_barra = p_codigo_barra,
            nombre = p_nombre,
            descripcion = p_descripcion,
            raro = p_raro,
            precio = p_precio,
            existencia = p_existencia,
            cantidad_minima = p_cantidad_minima
        where id = p_id
        and eliminado = false;

    end if;
end $$
delimiter ;
*/

/*
drop procedure if exists `proc_delete_producto_by_id`;
delimiter $$
create procedure proc_delete_producto_by_id(in p_id bigint)
begin
    if (valid_int_id(p_id)) then
		update tb_producto_imagenes
        set eliminado = true
        where id_producto = p_id ;
        
        update tb_producto_local
        set eliminado = true 
        where id_producto = p_id;
        
        update tb_producto
        set eliminado = true,
            fecha_eliminado = current_timestamp()
        where id = p_id;
    end if;
end $$
delimiter ;
*/

/*
drop procedure if exists proc_add_producto_inventario;
delimiter $$
create procedure proc_add_producto_inventario(in p_id bigint,
												in p_cantidad int(255))
begin
	if (valid_int_id(p_id) and 
		p_cantidad > 0) then
		update tb_producto 
		set existencia = (existencia + p_cantidad)
        where id = p_id
        and eliminado = false;
	end if;
end $$
delimiter ;
*/

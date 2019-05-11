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
create procedure proc_search_producto(in p_field varchar(255), 
										in p_id_local bigint,
										in p_id_marca bigint,
                                        in p_id_tipo_vehiculo bigint,
                                        in p_inventario_min int(255),
                                        in p_inventario_max int(255))
begin
    set p_field = trim(p_field);
    set @sql_query = "";
	set @p_field = p_field;
	set @p_id_local = p_id_local;
	set @p_id_marca = p_id_marca;
	set @p_id_tipo_vehiculo = p_id_tipo_vehiculo;
    set @p_inventario_min = p_inventario_min;
    set @p_inventario_max = p_inventario_max;
	
	if (p_id_local > 0) then 
		set @sql_query = "
		select pl.id,
				pl.id_producto,
				pl.id_local,
				pl.existencia,
                p.codigo_barra
		from tb_producto_local pl
		join tb_producto p on p.id = pl.id_producto
		where p.eliminado = false and
		pl.eliminado = false and 
		pl.id_local = @p_id_local
		";
		
        if (p_inventario_min > 0) then
			set @sql_query = concat(@sql_query, " and pl.existencia >= @p_inventario_min ");
        end if;
        
        if (p_inventario_max > 0) then
			set @sql_query = concat(@sql_query, " and pl.existencia <= @p_inventario_max ");
        end if;
        
		if (!is_empty(p_field)) then 
			set @sql_query = concat(@sql_query, " and (
			p.nombre like concat('%', @p_field ,'%') or 
			p.codigo_barra like concat('%', @p_field ,'%') or 
			p.id = @p_field
		) ");
		end if;
	else 
		set @sql_query = "
		select p.id,
				p.id_tipo_vehiculo,
				p.id_marca,
                p.codigo_barra,
				p.nombre,
				p.precio,
				p.existencia
		from tb_producto p
		where p.eliminado = false ";
        
        if (p_inventario_min > 0) then
			set @sql_query = concat(@sql_query, " and p.existencia >= @p_inventario_min ");
        end if;
        
        if (p_inventario_max > 0) then
			set @sql_query = concat(@sql_query, " and p.existencia <= @p_inventario_max ");
        end if;
		
		if (!is_empty(p_field)) then 
			set @sql_query = concat(@sql_query, " and (
			p.nombre like concat('%', @p_field ,'%') or 
			p.codigo_barra like concat('%', @p_field ,'%') or 
			p.id = @p_field
		) ");
		end if;
	end if;
	
	if (valid_int_id(p_id_marca)) then
		set @sql_query = concat(@sql_query, " and p.id_marca = @p_id_marca ");
	end if;
	
	if (valid_int_id(p_id_tipo_vehiculo)) then 
		set @sql_query = concat(@sql_query, " and p.id_tipo_vehiculo = @p_id_tipo_vehiculo ");
	end if;
	set @sql_query = concat(@sql_query, " order by p.nombre asc;");  
	
	PREPARE sql_statement FROM @sql_query;
	EXECUTE sql_statement;
end $$
delimiter ;




drop procedure if exists `proc_search_producto_by_field_and_provider`;
delimiter $$
create procedure proc_search_producto_by_field_and_provider(in p_field varchar(255), 
                                                            in p_id_local bigint,
                                                            in p_id_proveedor bigint,
                                                            in p_id_marca bigint,
															in p_id_tipo_vehiculo bigint,
                                                            in p_inventario_min int(255),
															in p_inventario_max int(255))
begin
    set p_field = trim(p_field);
    
    set @sql_query = "";
	set @p_field = p_field;
	set @p_id_local = p_id_local;
	set @p_id_proveedor = p_id_proveedor;
	set @p_id_marca = p_id_marca;
	set @p_id_tipo_vehiculo = p_id_tipo_vehiculo;
    set @p_inventario_min = p_inventario_min;
    set @p_inventario_max = p_inventario_max;

	if (p_id_local > 0) then 
		set @sql_query = "
		select distinct pl.id,
				pl.id_producto,
				pl.id_local,
				pl.existencia,
                p.codigo_barra,
				(
					select pp.precio
					from tb_proveedor_producto pp 
					where pp.id_producto = pl.id_producto
					and pp.id = @p_id_proveedor
					and pp.eliminado = false
				) as 'precio'
		from tb_producto_local pl
		join tb_producto p on p.id = pl.id_producto
		where p.eliminado = false and
		pl.eliminado = false and 
        pl.id_local = @p_id_local 
		";
        
        if (p_inventario_min > 0) then
			set @sql_query = concat(@sql_query, " and pl.existencia >= @p_inventario_min ");
        end if;
        
        if (p_inventario_max > 0) then
			set @sql_query = concat(@sql_query, " and pl.existencia <= @p_inventario_max ");
        end if;
        
        if (!is_empty(p_field)) then 
			set @sql_query = concat(@sql_query, " and (
			p.nombre like concat('%', @p_field ,'%') or 
			p.codigo_barra like concat('%', @p_field ,'%') or 
			p.id = @p_field
		) ");
        end if;
	else 
		set @sql_query = "
		select distinct p.id,
				p.id_tipo_vehiculo,
				p.id_marca,
				p.nombre,
                p.codigo_barra,
				(
					select pp.precio
					from tb_proveedor_producto pp 
					where pp.id_producto = p.id
					and pp.id = @p_id_proveedor
					and pp.eliminado = false
				) as 'precio',
				p.existencia
		from tb_producto p
		where p.eliminado = false";
        
        if (p_inventario_min > 0) then
			set @sql_query = concat(@sql_query, " and p.existencia >= @p_inventario_min ");
        end if;
        
        if (p_inventario_max > 0) then
			set @sql_query = concat(@sql_query, " and p.existencia <= @p_inventario_max ");
        end if;
        
        if (!is_empty(p_field)) then 
			set @sql_query = concat(@sql_query, " and (
			p.nombre like concat('%', @p_field ,'%') or 
			p.codigo_barra like concat('%', @p_field ,'%') or 
			p.id = @p_field
		) ");
        end if;
	end if;
	
	if (valid_int_id(p_id_marca)) then
		set @sql_query = concat(@sql_query, " and p.id_marca = @p_id_marca ");
	end if;
	
	if (valid_int_id(p_id_tipo_vehiculo)) then 
		set @sql_query = concat(@sql_query, " and p.id_tipo_vehiculo = @p_id_tipo_vehiculo ");
	end if;
	
	if (!valid_int_id(p_id_local)) then
		set @sql_query = concat(@sql_query, " order by p.nombre asc;");  
	end if;
	
	PREPARE sql_statement FROM @sql_query;
	EXECUTE sql_statement;
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

/*
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
*/

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
    set p_nombre = trim(p_nombre);
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
    set p_nombre = trim(p_nombre);
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

/*
drop procedure if exists proc_remove_producto_inventario;
delimiter $$
create procedure proc_remove_producto_inventario(in p_id bigint,
												in p_cantidad int(255))
begin
	if (valid_int_id(p_id) and 
		p_cantidad > 0) then
        set @nueva_existencia = (
            select existencia
            from tb_producto prod 
            where prod.id = p_id
            limit 1
        );

        set @nueva_existencia = @nueva_existencia - p_cantidad;
        if (@nueva_existencia < 0 ) then
            set @nueva_existencia = 0;
        end if;

		update tb_producto 
		set existencia = @nueva_existencia
        where id = p_id
        and eliminado = false;
	end if;
end $$
delimiter ;
*/

drop procedure if exists proc_get_productos_to_export;
delimiter $$
create procedure proc_get_productos_to_export()
begin
    select p.id,
            p.codigo_barra as 'codigo',
            p.nombre as 'descripcion',
            p.precio,
            p.existencia as 'cantidad',
            p.cantidad_minima
    from tb_producto p
    where p.eliminado = false;
end $$
delimiter ;
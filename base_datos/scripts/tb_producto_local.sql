/*
drop function if exists func_get_next_producto_local_id;
delimiter $$
create function func_get_next_producto_local_id()
returns bigint 
begin
	set @new_id = (select id from tb_producto_local order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;
*/

-- Verifica si existe un producto en un local 
/*
drop function if exists func_exists_producto_local_by_idp_idl;
delimiter $$
create function func_exists_producto_local_by_idp_idl(p_id_producto bigint,
														p_id_local bigint)
returns bool
begin
	set @response = false;
    
    if (valid_int_id(p_id_producto) and 
		valid_int_id(p_id_local)) then
		set @response = exists(
			select * from tb_producto_local p
            where p.id_producto = p_id_producto
            and p.id_local = p_id_local
            and p.eliminado = false
        );
	end if;
    
    return @response;
end $$
delimiter ;
*/

/*
drop procedure if exists `proc_get_producto_local`;
delimiter $$
create procedure proc_get_producto_local(in p_id_local bigint)
begin
    if (valid_int_id(p_id_local)) then
        select pl.id,
                pl.id_producto,
                pl.id_local,
                pl.existencia,
                pl.cantidad_minima,
                p.nombre,
                p.precio
        from tb_producto_local pl
        join tb_producto p on p.id = pl.id_producto
        where p.eliminado = false and
        pl.eliminado = false and
        pl.id_local = p_id_local;
    end if;
end $$
delimiter ;
*/

/*
drop procedure if exists proc_get_producto_local_distribucion_by_id;
delimiter $$
create procedure proc_get_producto_local_distribucion_by_id(in p_id_producto bigint)
begin
	if (valid_int_id(p_id_producto)) then
		select pl.id,
				pl.id_local,
                pl.existencia,
                pl.cantidad_minima,
                pl.fecha_creado
        from tb_producto_local pl
        where pl.id_producto = p_id_producto
        and pl.eliminado = false;
    end if;
end $$
delimiter ;
*/

/*
drop procedure if exists proc_get_producto_local_by_product_and_local;
delimiter $$
create procedure proc_get_producto_local_by_product_and_local(in p_id_producto bigint,
																in p_id_local bigint)
begin 
	if (valid_int_id(p_id_producto) and 
		valid_int_id(p_id_local)) then
		select p.id,
				pl.id as 'id_producto_local',
				pl.id_local,
                pl.existencia,
                pl.cantidad_minima,
                p.nombre,
                p.descripcion,
                p.precio,
                p.raro,
                p.codigo_barra,
                p.id_tipo_vehiculo,
                p.id_marca,
                p.fecha_creado
        from tb_producto_local pl
        join tb_producto p on p.id = pl.id_producto
						and p.eliminado = false
        where pl.id_producto = p_id_producto
        and pl.id_local = p_id_local
        and pl.eliminado = false;
    end if;
end $$
delimiter ;
*/


        
/*
drop procedure if exists proc_get_producto_local_by_id;
delimiter $$
create procedure proc_get_producto_local_by_id(in p_producto_local_id bigint)
begin 
	if (valid_int_id(p_producto_local_id)) then
		select p.id,
				pl.id as 'id_producto_local',
				pl.id_local,
                pl.existencia,
                p.nombre,
                p.descripcion,
                p.raro,
                p.codigo_barra,
                p.id_tipo_vehiculo,
                p.id_marca,
                p.fecha_creado
        from tb_producto_local pl
        join tb_producto p on p.id = pl.id_producto
						and p.eliminado = false
        where pl.id = p_producto_local_id
        and pl.eliminado = false;
    end if;
end $$
delimiter ;
*/

/*
drop procedure if exists `proc_update_producto_and_producto_local_by_plid`;
delimiter $$
create procedure proc_update_producto_and_producto_local_by_plid(
													in p_id bigint,
                                                    in p_id_producto bigint,
                                                    in p_id_tipo_vehiculo bigint,
													in p_id_marca bigint,
													in p_existencia bigint,
                                                    in p_cantidad_minima int(11),
													in p_codigo_barra varchar(100),
													in p_nombre varchar(255),
													in p_descripcion text,
													in p_raro boolean)
begin
    if (valid_int_id(p_id) and 
		valid_int_id(p_id_producto) and
        p_existencia >= 0 and 
        p_cantidad_minima >= 0) then

		update tb_producto 
        set id_tipo_vehiculo = p_id_tipo_vehiculo,
			id_marca = p_id_marca,
            codigo_barra = p_codigo_barra,
            nombre = p_nombre,
            descripcion = p_descripcion,
            raro = p_raro
		where eliminado = false 
        and id = p_id_producto;
            
        update tb_producto_local 
        set existencia = p_existencia,
            cantidad_minima = p_cantidad_minima
        where eliminado = false 
        and id = p_id;
        
    end if;
end $$
delimiter ;
*/

/*
drop procedure if exists proc_get_minified_producto_local_byid;
delimiter $$
create procedure proc_get_minified_producto_local_byid(in p_id bigint)
begin
	if (valid_int_id(p_id)) then
		select pl.id,
				pl.id_producto,
				pl.id_local,
                pl.existencia,
                pl.cantidad_minima,
                pl.fecha_creado
        from tb_producto_local pl
        where pl.id = p_id
        and pl.eliminado = false;
    end if;
end $$
delimiter ;



drop procedure if exists `proc_add_producto_local`;
delimiter $$
create procedure proc_add_producto_local(in p_id_producto bigint,
                                        in p_id_local bigint,
                                        in p_existencia bigint(20),
                                        in p_cantidad_minima int(11))
begin
    set @new_id = null;

    if (valid_int_id(p_id_producto) and 
        valid_int_id(p_id_local) and 
        p_existencia >= 0 and 
        p_cantidad_minima >= 0) then

        set @new_id = func_get_next_producto_local_id();

        insert into tb_producto_local(
            `id`,
            `id_producto`,
            `id_local`,
            `existencia`,
            `cantidad_minima`
        ) values (
            @new_id,
            p_id_producto,
            p_id_local,
            p_existencia,
            p_cantidad_minima
        );
    end if;

    select @new_id as 'id';
end $$
delimiter ;

drop procedure if exists `proc_update_producto_local_by_id`;
delimiter $$
create procedure proc_update_producto_local_by_id(in p_id bigint,
                                                    in p_existencia bigint,
                                                    in p_cantidad_minima int(11))
begin
    if (valid_int_id(p_id) and 
        p_existencia >= 0 and 
        p_cantidad_minima >= 0) then

        update tb_producto_local 
        set existencia = p_existencia,
            cantidad_minima = p_cantidad_minima
        where eliminado = false and 
        id = p_id;
    end if;
end $$
delimiter ;
*/

/*
drop procedure if exists `proc_delete_producto_local_by_id`;
delimiter $$
create procedure proc_delete_producto_local_by_id(in p_id bigint)
begin
    if (valid_int_id(p_id)) then
		update tb_producto_local_ubicacion
        set eliminado = true
        where id_producto_local = p_id;
        
        
        update tb_producto_local
        set eliminado = true,
            fecha_eliminado = current_timestamp()
        where id = p_id;
    end if;
end $$
delimiter ;
*/

drop procedure if exists proc_add_producto_local_inventario;
delimiter $$
create procedure proc_add_producto_local_inventario(in p_id_producto bigint,
													in p_id_local bigint,
													in p_cantidad int(255))
begin
	if (valid_int_id(p_id_producto) and 
		valid_int_id(p_id_local) and
		p_cantidad > 0) then
        
		update tb_producto_local
			set existencia = (existencia + p_cantidad)
        where id_producto = p_id_producto
        and id_local = p_id_local
        and eliminado = false;
        
	end if;
end $$
delimiter ;

drop procedure if exists proc_remove_producto_local_inventario;
delimiter $$
create procedure proc_remove_producto_local_inventario(in p_id_producto bigint,
                                                        in p_id_local bigint,
                                                        in p_cantidad int(255))
begin
    if (p_cantidad > 0 and 
        valid_int_id(p_id_producto) and 
        valid_int_id(p_id_local)) then 

        set @nueva_existencia = (
            select existencia from tb_producto_local pl 
            where pl.id_producto = p_id_producto 
            and pl.id_local = p_id_local
            limit 1
        );

        set @nueva_existencia = @nueva_existencia - p_cantidad;
        if (@nueva_existencia < 0 ) then 
            set @nueva_existencia = 0;
        end if;

        update tb_producto_local
            set existencia = @nueva_existencia
        where id_producto = p_id_producto
        and id_local = p_id_local
        and eliminado = false;
    end if;
end $$
delimiter ;


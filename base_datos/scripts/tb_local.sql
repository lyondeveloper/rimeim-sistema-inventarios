/*
drop function if exists func_get_next_local_id;
delimiter $$
create function func_get_next_local_id()
returns bigint 
begin
	set @new_id = (select id from tb_local order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;



drop procedure if exists proc_get_locales;
delimiter $$
create procedure proc_get_locales()
begin
	select l.id,
            l.nombre,
            l.codigo,
            l.es_bodega,
            l.color_hex
	from tb_local l
    where l.eliminado = false
    order by l.fecha_creado desc;
            
end $$
delimiter ;



drop function if exists func_exists_local_with_code;
delimiter $$
create function func_exists_local_with_code(p_codigo varchar(100))
returns boolean
begin 
	set @response = false;
	set p_codigo = trim(p_codigo);
	
	if (!is_empty(p_codigo)) then
		set @response = exists(
			select * from tb_local l
			where l.codigo = p_codigo
		);
	end if;	

	return @response;
end $$
delimiter ;



drop function if exists func_exists_local_with_code_and_not_same;
delimiter $$
create function func_exists_local_with_code_and_not_same(p_codigo varchar(100),
														p_id bigint)
returns boolean
begin 
	set @response = false;
	set p_codigo = trim(p_codigo);
	
	if (!is_empty(p_codigo) and 
		valid_int_id(p_id)) then
		set @response = exists(
			select * from tb_local l
			where l.codigo = p_codigo
			and l.id != p_id
		);
	end if;	

	return @response;
end $$
delimiter ;



drop procedure if exists proc_get_local_by_id;
delimiter $$
create procedure proc_get_local_by_id(in p_id bigint)
begin
	if (valid_int_id(p_id)) then
		select l.id,
				l.id_usuario_creado_por,
				l.nombre,
				l.codigo,
				l.descripcion,
				l.descripcion_ubicacion,
				l.color_hex,
				l.es_bodega,
				l.latitud,
				l.longitud,
				l.fecha_creado
		from tb_local l
		where l.eliminado = false
		and l.id = p_id;
    end if;
            
end $$
delimiter ;
*/

drop procedure if exists proc_add_local;
delimiter $$
create procedure proc_add_local(in p_id_usuario_creado_por bigint,
								in p_nombre varchar(255),
								in p_codigo varchar(100),
								in p_descripcion text,
								in p_descripcion_ubicacion text,
								in p_color_hex varchar(50),
								in p_es_bodega boolean,
								in p_latitud double,
								in p_longitud double)
begin
	set p_nombre = trim(p_nombre);
    set p_codigo = trim(p_codigo);
    set p_descripcion = trim(p_descripcion);
    set p_descripcion_ubicacion = trim(p_descripcion_ubicacion);
    set p_color_hex = remove_spaces(p_color_hex);
    set p_es_bodega = default_bool_value(p_es_bodega, false);

	set @new_id = null;
    
	if (valid_int_id(p_id_usuario_creado_por) and
		!is_empty(p_nombre)) then
		set @new_id = func_get_next_local_id();
        INSERT INTO tb_local
				(`id`,
				`id_usuario_creado_por`,
				`nombre`,
				`codigo`,
				`descripcion`,
				`descripcion_ubicacion`,
				`color_hex`,
				`es_bodega`,
				`latitud`,
				`longitud`)
				VALUES
				(@new_id,
				p_id_usuario_creado_por,
				p_nombre,
				p_codigo,
				p_descripcion,
				p_descripcion_ubicacion,
				p_color_hex,
				p_es_bodega,
				p_latitud,
				p_longitud);
		
        call proc_add_empleado(@new_id, 
								p_id_usuario_creado_por, 
                                p_id_usuario_creado_por,
                                true, 
                                true);
    end if;
    
    select @new_id as 'id';
end $$
delimiter ;


/*
drop procedure if exists `proc_update_local_by_id`;
delimiter $$
create procedure proc_update_local_by_id(in p_id bigint,
										 in p_nombre varchar(255),
                                         in p_codigo varchar(100),
                                         in p_descripcion text,
                                         in p_descripcion_ubicacion text,
										 in p_color_hex varchar(50),
                                         in p_es_bodega boolean,
                                         in p_latitud double,
                                         in p_longitud double)
begin
    
    if (valid_int_id(p_id)) then
		set p_nombre = trim(p_nombre);
		set p_codigo = trim(p_codigo);
		set p_descripcion = trim(p_descripcion);
		set p_descripcion_ubicacion = trim(p_descripcion_ubicacion);
		set p_color_hex = remove_spaces(p_color_hex);
        
        update tb_local 
        set nombre = p_nombre,
			codigo = p_codigo,
            descripcion = p_descripcion,
            descripcion_ubicacion = p_descripcion_ubicacion,
            color_hex = p_color_hex,
            es_bodega = p_es_bodega,
            latitud = p_latitud,
            longitud = p_longitud
        where id = p_id
        and eliminado = false;
    end if;
end $$
delimiter ;



drop procedure if exists `proc_delete_local_by_id`;
delimiter $$
create procedure proc_delete_local_by_id(in p_id bigint,
										 in p_id_usuario bigint)
begin
	if (valid_int_id(p_id) and
		valid_int_id(p_id_usuario)) then
		update tb_local
        set eliminado = true,
			fecha_eliminado = current_timestamp(),
            id_usuario_eliminado_por = p_id_usuario
		where id = p_id;
        
        update tb_empleado 
        set eliminado = true,
			fecha_eliminado = current_timestamp()
		where id_local = p_id;
        
    end if;
end $$
delimiter ;
*/



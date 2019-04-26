
drop function if exists func_get_next_cliente_id;
delimiter $$
create function func_get_next_cliente_id()
returns bigint
begin
	set @new_id = (select id from tb_cliente order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;


drop procedure if exists proc_get_clientes;
delimiter $$
create procedure proc_get_clientes()
begin
	select c.id,
			c.id_archivo,
			c.nombre,
            c.codigo,
            c.rtn,
            c.correo,
            c.telefono,
            c.es_empresa
    from tb_cliente c
    where c.eliminado = false
    order by c.nombre asc;
end $$
delimiter ;

drop procedure if exists proc_get_cliente_by_id;
delimiter $$
create procedure proc_get_cliente_by_id(in p_id bigint)
begin
	if (valid_int_id(p_id)) then
		select c.id,
				c.id_archivo,
				c.nombre,
				c.codigo,
				c.rtn,
				c.correo,
				c.telefono,
				c.es_empresa
		from tb_cliente c
		where c.eliminado = false
        and c.id = p_id;
    end if;
end $$
delimiter ;

drop procedure if exists proc_get_cliente_by_codigo;
delimiter $$
create procedure proc_get_cliente_by_codigo(in p_codigo varchar(50) )
begin
	set p_codigo = trim(p_codigo);
	if (!is_empty(p_codigo)) then
		select c.id,
				c.id_archivo,
				c.nombre,
				c.codigo,
				c.rtn,
				c.correo,
				c.telefono,
				c.es_empresa
		from tb_cliente c
		where c.eliminado = false
        and c.codigo = p_codigo;
    end if;
end $$
delimiter ;

drop procedure if exists proc_get_cliente_by_email;
delimiter $$
create procedure proc_get_cliente_by_email(in p_correo varchar(100) )
begin
	set p_correo = remove_spaces(p_correo);
	if (!is_empty(p_correo)) then
		select c.id,
				c.id_archivo,
				c.nombre,
				c.codigo,
				c.rtn,
				c.correo,
				c.telefono,
				c.es_empresa
		from tb_cliente c
		where c.eliminado = false
        and c.correo = p_correo;
    end if;
end $$
delimiter ;

drop procedure if exists proc_get_cliente_by_rtn;
delimiter $$
create procedure proc_get_cliente_by_rtn(in p_rtn varchar(100) )
begin
	set p_rtn = remove_spaces(p_rtn);
	if (!is_empty(p_rtn)) then
		select c.id,
				c.id_archivo,
				c.nombre,
				c.codigo,
				c.rtn,
				c.correo,
				c.telefono,
				c.es_empresa
		from tb_cliente c
		where c.eliminado = false
        and c.rtn = p_rtn;
    end if;
end $$
delimiter ;

drop procedure if exists proc_get_cliente_by_telefono;
delimiter $$
create procedure proc_get_cliente_by_telefono(in p_telefono varchar(100) )
begin
	set p_telefono = remove_spaces(p_telefono);
	if (!is_empty(p_telefono)) then
		select c.id,
				c.id_archivo,
				c.nombre,
				c.codigo,
				c.rtn,
				c.correo,
				c.telefono,
				c.es_empresa
		from tb_cliente c
		where c.eliminado = false
        and c.telefono = p_telefono;
    end if;
end $$
delimiter ;

drop procedure if exists `proc_add_cliente`;
delimiter $$
create procedure proc_add_cliente(in id_local_registrado bigint,
									in id_empleado_creado_por bigint,
									in p_id_archivo bigint,
									in p_nombre varchar(255),
                                    in p_codigo varchar(50),
                                    in p_rtn varchar(100),
                                    in p_correo varchar(100),
                                    in p_telefono varchar(50),
                                    in p_es_empresa boolean)
begin
	set p_nombre = trim_and_lower(p_nombre);
    set p_codigo = trim(p_codigo);
    set p_rtn = lower(remove_spaces(p_rtn));
    set p_correo = lower(remove_spaces(p_correo));
    set p_telefono = remove_spaces(p_telefono);
    set p_es_empresa = default_bool_value(p_es_empresa, false);
    
    set @new_id = null;
    
    if (valid_int_id(id_local_registrado) and 
		valid_int_id(id_empleado_creado_por) and
        !is_empty(p_nombre)) then
		
        set @new_id = func_get_next_cliente_id();
        INSERT INTO tb_cliente
					(`id`,
					`id_archivo`,
					`id_local_registrado`,
					`id_empleado_creado_por`,
					`nombre`,
					`codigo`,
					`rtn`,
					`correo`,
					`telefono`,
					`es_empresa`)
					VALUES
					(@new_id,
                    p_id_archivo,
					id_local_registrado,
					id_empleado_creado_por,
					p_nombre,
					p_codigo,
					p_rtn,
					p_correo,
					p_telefono,
					p_es_empresa);
    end if;
    
    select @new_id as 'id';
end $$
delimiter ;



drop procedure if exists `proc_delete_cliente_by_id`;
delimiter $$
create procedure proc_delete_cliente_by_id(in p_id bigint, 
											in p_id_empleado_eliminado_por bigint)
begin
	if (valid_int_id(p_id) and 
		valid_int_id(p_id_empleado_eliminado_por)) then
		update tb_cliente
        set eliminado = true,
			fecha_eliminado = current_timestamp(),
            id_empleado_eliminado_por = p_id_empleado_eliminado_por
		where id = p_id;
        
        update tb_cliente_producto_precio 
        set eliminado = true,
			fecha_eliminado = current_timestamp()
		where id_cliente = p_id;
    end if;
end $$
delimiter ;



drop procedure if exists `proc_update_cliente_by_id`;
delimiter $$
create procedure proc_update_cliente_by_id(in p_id bigint,
											in p_id_archivo bigint,
											in p_nombre varchar(255),
                                            in p_codigo varchar(50),
                                            in p_rtn varchar(100),
                                            in p_correo varchar(100),
                                            in p_telefono varchar(50),
                                            in p_es_empresa boolean)
begin
	set p_nombre = trim_and_lower(p_nombre);
    set p_codigo = trim(p_codigo);
    set p_rtn = lower(remove_spaces(p_rtn));
    set p_correo = lower(remove_spaces(p_correo));
    set p_telefono = remove_spaces(p_telefono);
    set p_es_empresa = default_bool_value(p_es_empresa, false);
    
    if (valid_int_id(p_id) and
		!is_empty(p_nombre)) then
		update tb_cliente 
        set nombre = p_nombre,
			codigo = p_codigo,
            rtn = p_rtn,
            correo = p_correo,
            telefono = p_telefono,
            es_empresa = p_es_empresa,
            id_archivo = p_id_archivo
		where id = p_id;
    end if;
end $$
delimiter ;



drop procedure if exists proc_search_client;
delimiter $$
create procedure proc_search_client(in p_field varchar(255))
begin
	set p_field = trim_and_lower(p_field);
    if (!is_empty(p_field)) then
		select distinct 
			c.id,
            c.id_archivo,
			c.nombre,
            c.codigo,
            c.rtn,
            c.correo,
            c.telefono,
            c.es_empresa
        from tb_cliente c
        where c.eliminado = false
        and 
        ( c.nombre like concat('%', p_field, '%')
        or c.codigo like concat('%', p_field, '%')
        or c.rtn like concat('%', p_field, '%')
        or c.correo like concat('%', p_field, '%')
        or c.id = p_field
        )
        order by c.nombre asc;
    end if;
end $$
delimiter ;



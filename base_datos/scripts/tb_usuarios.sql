/*
drop function if exists func_exists_usuario_with_email_or_username;
delimiter $$
create function func_exists_usuario_with_email_or_username(p_correo varchar(200),
															p_nombre_usuario varchar(100))
returns bool
begin
	set @response = false;
    
    if (!is_empty(p_correo) and is_empty(p_nombre_usuario))  then
		set @response = exists(select * from tb_usuario u 
								where u.correo = p_correo);
                
	elseif (!is_empty(p_nombre_usuario) and is_empty(p_correo)) then
		set @response = exists(select * from tb_usuario u 
							where u.nombre_usuario = p_nombre_usuario);
	else 
		set @response = exists(select * from tb_usuario u 
							where u.correo = p_correo or 
                            u.nombre_usuario = p_nombre_usuario);
    end if;
	return @response;
end $$
delimiter ;



drop function if exists func_exists_usuario_with_email;
delimiter $$
create function func_exists_usuario_with_email(p_correo varchar(200))
returns bool
begin
	set @response = exists(select * from tb_usuario u 
								where u.correo = p_correo);
	return @response;
end $$
delimiter ;



drop function if exists func_exists_usuario_with_username;
delimiter $$
create function func_exists_usuario_with_username(p_nombre_usuario varchar(100))
returns bool
begin
	set @response = exists(select * from tb_usuario u 
							where u.nombre_usuario = p_nombre_usuario);
	
	return @response;
end $$
delimiter ;



drop function if exists func_exists_usuario_with_username_and_not_same;
delimiter $$
create function func_exists_usuario_with_username_and_not_same(p_nombre_usuario varchar(100),
																p_id bigint)
returns bool
begin
	set @response = exists(select * from tb_usuario u 
							where u.nombre_usuario = p_nombre_usuario
							and u.id != p_id);
	
	return @response;
end $$
delimiter ;



drop function if exists func_is_usuario_enabled;
delimiter $$
create function func_is_usuario_enabled(p_id bigint) 
returns bool
begin 
	set @response = false;
    
    if (valid_int_id(p_id)) then
		set @response = exists(select * from tb_usuario 
								where eliminado = false and 
                                habilitado = true and
								id = p_id );
    end if;
    
    return @response;
end $$
delimiter ;



drop function if exists func_get_id_usuario_by_email;
delimiter $$
create function func_get_id_usuario_by_email(p_email varchar(200))
returns bigint
begin
	set @response_id = (select id 
						from tb_usuario 
						where correo = p_email and
								eliminado = false);
	return @response_id;
end $$
delimiter ;



drop function if exists func_is_user_admin;
delimiter $$
create function func_is_user_admin(p_id bigint)
returns boolean
begin
	set @r_admin = false;
    if(valid_int_id(p_id)) then
		set @r_admin = (select admin from tb_usuario
						where id = p_id
                        and eliminado = false);
		if(@r_admin is null) then
			set @r_admin = false;
        end if;
    end if;
    return @r_admin;
end $$
delimiter ;



drop procedure if exists proc_get_usuario_by_id;
delimiter $$
create procedure proc_get_usuario_by_id(in p_id bigint)
begin
	if (valid_int_id(p_id)) then 
		select u.id,
				u.id_usuario_creado_por,
				u.nombre,
				u.nombre_usuario,
                u.correo,
				u.admin,
				u.habilitado,
                u.fecha_creado,
                u.primera_sesion
		from tb_usuario u where
			u.eliminado = false
			and u.id = p_id;
    end if;
    
end $$
delimiter ;




drop procedure if exists `proc_get_usuarios`;
delimiter $$
create procedure proc_get_usuarios()
begin
	select u.id,
			u.nombre,
            u.nombre_usuario,
            u.admin,
            u.habilitado
    from tb_usuario u where
    u.eliminado = false
    order by u.nombre asc;
end $$
delimiter ;



drop procedure if exists `proc_get_usuario_by_email`;
delimiter $$
create procedure proc_get_usuario_by_email(in p_correo varchar(200))
begin
	set p_correo = trim_and_lower(p_correo);
    select u.id,
			u.nombre,
            u.nombre_usuario,
            u.admin,
            u.habilitado,
            u.primera_sesion
    from tb_usuario u where
    u.correo = p_correo
	and u.eliminado = false;
end $$
delimiter ;



drop procedure if exists proc_get_usuario_to_auth;
delimiter $$ 
create procedure proc_get_usuario_to_auth(in p_field varchar(200))
begin
	set p_field = trim_and_lower(p_field);
	if (!is_empty(p_field)) then
		select u.id,
				u.nombre,
                u.admin,
                u.habilitado,
                u.primera_sesion,
				u.clave
		from tb_usuario u 
		where u.correo = p_field or 
				u.nombre_usuario = p_field
		and u.eliminado = false;
	end if;
end $$
delimiter ;



drop procedure if exists `proc_add_usuario`;
delimiter $$
create procedure proc_add_usuario(in p_nombre varchar(200),
									in p_nombre_usuario varchar(100),
									in p_correo varchar(200),
                                    in p_clave varchar(255),
                                    in p_admin boolean,
                                    in p_id_usuario_agregado_por bigint(20))
begin
	set p_nombre = trim_and_lower(p_nombre);
    set p_nombre_usuario = trim_and_lower(p_nombre_usuario);
    set p_correo = trim_and_lower(p_correo);
    set p_admin = default_bool_value(p_admin, false);
    
    set @new_id = get_next_tb_usario_id();
    
    INSERT INTO `tb_usuario`
				(`id`,
				`id_usuario_creado_por`,
				`nombre`,
				`nombre_usuario`,
				`correo`,
				`clave`,
				`admin`)
				VALUES
				(@new_id,
				p_id_usuario_agregado_por,
				p_nombre,
				p_nombre_usuario,
				p_correo,
				p_clave,
				p_admin);

    select @new_id as 'id';
end $$
delimiter ;



drop procedure if exists `proc_delete_usuario_by_id`;
delimiter $$
create procedure proc_delete_usuario_by_id(in p_id bigint,
											in p_id_usuario_eliminado_por bigint)
begin

    if (valid_int_id(p_id) and 
		valid_int_id(p_id_usuario_eliminado_por)) then
        UPDATE tb_usuario SET
		`id_usuario_eliminado_por` = p_id_usuario_eliminado_por,
		`habilitado` = false,
		`eliminado` = true,
		`fecha_eliminado` = current_timestamp()
		WHERE `id` = p_id;
        
        update tb_empleado 
        set eliminado = true,
			id_usuario_eliminado_por = p_id_usuario_eliminado_por,
			fecha_eliminado = current_timestamp()
		where id_usuario = p_id;
		
    end if;
end $$
delimiter ;



drop procedure if exists `proc_disable_usuario_by_id`;
delimiter $$
create procedure proc_disable_usuario_by_id(in p_id_usuario bigint)
begin
	if(valid_int_id(p_id_usuario)) then
		update tb_usuario
        set habilitado = false
        where id = p_id_usuario
        and eliminado = false;
    end if;
end $$
delimiter ;



drop procedure if exists `proc_enable_usuario_by_id`;
delimiter $$
create procedure proc_enable_usuario_by_id(in p_id_usuario bigint)
begin
	if(valid_int_id(p_id_usuario)) then
		update tb_usuario
        set habilitado = true
        where id = p_id_usuario
        and eliminado = false;
    end if;
end $$
delimiter ;

*/

/*
drop procedure if exists `proc_update_usuario_by_id`;
delimiter $$
create procedure proc_update_usuario_by_id(in p_id_usuario bigint,
											in p_nombre varchar(200),
                                            in p_nombre_usuario varchar(100),
											in p_habilitado boolean,
                                            in p_admin boolean)
begin
	if(valid_int_id(p_id_usuario) and
		p_habilitado is not null and
        p_admin is not null) then
		set p_nombre = trim_and_lower(p_nombre);
		set p_nombre_usuario = trim_and_lower(p_nombre_usuario);
    
		UPDATE tb_usuario
		set nombre = p_nombre,
			nombre_usuario = p_nombre_usuario,
            habilitado = p_habilitado,
            admin = p_admin
		where id = p_id_usuario
		and eliminado = false;
    end if;
	
end $$
delimiter ;
*/

/*
drop procedure if exists `proc_update_password_usuario_by_id`;
delimiter $$
create procedure proc_update_password_usuario_by_id(in p_id_usuario bigint,
													in p_clave varchar(255))
begin
	if (is_empty(p_clave) = false and
		valid_int_id(p_id_usuario)) then
		update tb_usuario 
        set clave = p_clave,
			primera_sesion = false
        where id = p_id_usuario
        and eliminado = false;
    end if;
end $$
delimiter ;



drop procedure if exists `proc_set_usuario_admin_by_id`;
delimiter $$
create procedure proc_set_usuario_admin_by_id(in p_id_usuario bigint,
												in p_id_usuario_admin bigint)
begin
	if(valid_int_id(p_id_usuario) and
		valid_int_id(p_id_usuario_admin) and
        func_is_user_admin(id_usuario_admin)) then
		update tb_usuario set admin = true
        where id = p_id_usuario and eliminado = false;
    end if;
end $$
delimiter ;



drop procedure if exists proc_search_user;
delimiter $$
create procedure proc_search_user(in p_field varchar(255))
begin
	set p_field = trim(p_field);
    
    if (is_empty(p_field) = false) then
		select u.id,
				u.nombre,
				u.admin,
				u.habilitado
        from tb_usuario u
        where u.nombre like concat('%',p_field,'%')
        or u.id like concat('%', p_field, '%')
        or u.nombre_usuario like concat('%', p_field, '%')
        and u.eliminado = false;
    end if;
end $$
delimiter ;
*/

drop procedure if exists proc_get_minified_usuario_by_id_empleado;
delimiter $$
create procedure proc_get_minified_usuario_by_id_empleado(in p_id_empleado bigint)
begin
	if (valid_int_id(p_id_empleado)) then
		select u.id,
			   u.nombre
		from tb_usuario u 
        join tb_empleado em on em.id = p_id_empleado
        where u.id = em.id_usuario;
    end if;
end $$
delimiter ;


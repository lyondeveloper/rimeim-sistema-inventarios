
/*
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
*/

/*
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
*/

/*
drop procedure if exists `proc_get_usuarios`;
delimiter $$
create procedure proc_get_usuarios()
begin
	select u.id,
			u.nombre,
            u.nombre_usuario,
            u.admin,
            u.habilitado,
            u.primera_sesion
    from tb_usuario u where
    u.eliminado = false
    order by u.nombre asc;
end $$
delimiter ;
*/

/*
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
*/

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

/*
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
    
    INSERT INTO `db_rimeim`.`tb_usuario`
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
*/

/*
drop procedure if exists `proc_delete_usuario_by_id`;
delimiter $$
create procedure proc_delete_usuario_by_id(in p_id bigint,
											in p_id_usuario_eliminado_por bigint)
begin

    if (valid_int_id(p_id) and 
		valid_int_id(p_id_usuario_eliminado_por)) then
        UPDATE `db_rimeim`.`tb_usuario` SET
		`id_usuario_eliminado_por` = p_id_usuario_eliminado_por,
		`habilitado` = false,
		`eliminado` = true,
		`fecha_eliminado` = current_timestamp()
		WHERE `id` = p_id;
		
    end if;
end $$
delimiter ;
*/

/*
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
*/

/*
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
                                            in p_nombre_usuario varchar(100))
begin
	if(valid_int_id(p_id_usuario)) then
		set p_nombre = trim_and_lower(p_nombre);
		set p_nombre_usuario = trim_and_lower(p_nombre_usuario);
    
		if (is_empty(p_nombre_usuario)) then
			UPDATE tb_usuario
			set nombre = p_nombre
			where id = p_id_usuario
            and eliminado = false;
        else 
			UPDATE tb_usuario
			set nombre = p_nombre,
				nombre_usuario = p_nombre_usuario
			where id = p_id_usuario
			and eliminado = false;
        end if;
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
		int_valid_id(p_id_usuario)) then
		update tb_usuario 
        set clave = p_clave
        where id = p_id_usuario
        and eliminado = false;
    end if;
end $$
delimiter ;
*/

/*
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
*/



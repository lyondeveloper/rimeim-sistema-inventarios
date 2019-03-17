/*
drop function if exists func_get_next_empledo_id;
delimiter $$
create function func_get_next_empledo_id()
returns bigint
begin
	set @new_id = (select id from tb_empleado order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;

drop function if exists func_exists_user_in_local;
delimiter $$
create function func_exists_user_in_local(p_id_usuario bigint,
											p_id_local bigint)
returns boolean
begin
	set @response = false;
    if (valid_int_id(p_id_usuario) and 
		valid_int_id(p_id_local)) then
		
		set @response = exists(
			select * from tb_empleado e 
			where e.id_usuario = p_id_usuario and 
			e.id_local = p_id_local
		);

    end if;
    
	return @response;
end $$
delimiter ;

drop function if exists func_is_employe_enabled;
delimiter $$
create function func_is_employe_enabled(p_id_empleado bigint)
returns boolean
begin
	set @response = false;
    if (valid_int_id(p_id_empleado)) then
		
		set @response = exists(
			select * from tb_empleado e 
			where e.id = p_id_empleado 
			and e.habilitado = true
			and e.eliminado = false
		);

    end if;
    
	return @response;
end $$
delimiter ;

drop procedure if exists `proc_get_empleados`;
delimiter $$
create procedure proc_get_empleados()
begin
	select e.id,
			e.id_local,
			e.id_usuario,
            e.id_usuario_creado_por,
            e.admin,
            e.habilitado,
            e.fecha_creado
    from tb_empleado e
    where e.eliminado = false;
end $$
delimiter ;

drop procedure if exists `proc_get_empleados_by_local`;
delimiter $$
create procedure proc_get_empleados_by_local(in p_id_local bigint)
begin
	if (valid_int_id(p_id_local)) then
		select e.id,
				e.id_usuario,
				e.id_usuario_creado_por,
				e.admin,
				e.habilitado,
				e.fecha_creado
		from tb_empleado e
		where e.eliminado = false
        and e.id_local = p_id_local;
    end if;
	
end $$
delimiter ;

drop procedure if exists `proc_get_empleado_by_id`;
delimiter $$
create procedure proc_get_empleado_by_id(in p_id bigint)
begin
	if (valid_int_id(p_id)) then
		select e.id,
				e.id_local,
				e.id_usuario,
				e.id_usuario_creado_por,
				e.admin,
				e.habilitado,
				e.fecha_creado
		from tb_empleado e
		where e.id = p_id 
        and e.eliminado = false;
    end if;
end $$
delimiter ;

drop procedure if exists `proc_get_empleado_by_user_id`;
delimiter $$
create procedure proc_get_empleado_by_user_id(in p_id bigint)
begin
	if (valid_int_id(p_id)) then
		select e.id,
				e.id_local,
				e.id_usuario,
				e.id_usuario_creado_por,
				e.admin,
				e.habilitado,
				e.fecha_creado
		from tb_empleado e
		where e.id_usuario = p_id 
        and e.eliminado = false;
    end if;
end $$
delimiter ;

drop procedure if exists `proc_add_empleado`;
delimiter $$
create procedure proc_add_empleado(in p_id_local bigint,
									in p_id_usuario_creado_por bigint,
                                    in p_id_usuario bigint,
									in p_admin boolean,
                                    in p_habilitado boolean)
begin
	
    set p_admin = default_bool_value(p_admin, false);
    set p_habilitado = default_bool_value(p_habilitado, true);

	set @new_id = null;
    
	if (valid_int_id(p_id_local) and 
		valid_int_id(p_id_usuario_creado_por) and 
        valid_int_id(p_id_usuario)) then
        set @new_id = func_get_next_empledo_id();
		insert into tb_empleado(
		`id`,
        `id_local`,
        `id_usuario`,
        `id_usuario_creado_por`,
        `admin`,
        `habilitado`) 
        values(
        @new_id,
        p_id_local,
        p_id_usuario,
        p_id_usuario_creado_por,
        p_admin,
        p_habilitado);
    end if;
    
    select @new_id as 'id';
end $$
delimiter ;

drop procedure if exists `proc_update_empleado_by_id`;
delimiter $$
create procedure proc_update_empleado_by_id(in p_id bigint,
											in p_id_local bigint,
                                            in p_admin boolean,
                                            in p_habilitado boolean)
begin
	if (valid_int_id(p_id) and 
		valid_int_id(p_id_local)) then
		update tb_empleado
        set admin = p_admin,
			habilitado = p_habilitado,
            id_local = p_id_local
		where id = p_id;
    end if;
end $$
delimiter ;

drop procedure if exists proc_delete_empleado_by_id;
delimiter $$
create procedure proc_delete_empleado_by_id(in p_id bigint,
											in p_id_usuario_eliminado_por bigint)
begin
	if (valid_int_id(p_id) and 
		valid_int_id(p_id_usuario_eliminado_por)) then
		update tb_empleado
        set eliminado = true,
			fecha_eliminado = current_timestamp(),
            id_usuario_eliminado_por = p_id_usuario_eliminado_por
		where id = p_id;
    end if;
end $$
delimiter ;
*/

drop procedure if exists proc_get_locals_for_employe_by_userid;
delimiter $$
create procedure proc_get_locals_for_employe_by_userid(in p_id bigint)
begin
	if (valid_int_id(p_id)) then 
		
        if (func_is_user_admin(p_id)) then 
			select l.id, 
					l.codigo,
                    l.nombre 
			from tb_local l 
            where l.eliminado = false;
        else 
			select distinct 
					l.id,
					l.codigo,
					l.nombre
			from tb_local l
			join tb_empleado e on e.id_local = l.id
								and e.id_usuario = p_id
			where e.eliminado = false and
					l.eliminado = false;
        end if;
    end if;
end $$
delimiter ;




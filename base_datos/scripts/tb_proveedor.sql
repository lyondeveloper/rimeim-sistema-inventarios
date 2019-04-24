
drop function if exists func_get_next_proveedor_id;
delimiter $$
create function func_get_next_proveedor_id()
returns bigint 
begin
	set @new_id = (select id from tb_proveedor order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;



drop function if exists func_exists_proveedor_by_telefono;
delimiter $$
create function func_exists_proveedor_by_telefono(p_telefono varchar(100))
returns bool
begin 
	set @response = false;
	set p_telefono = trim(p_telefono);
    
    if (!is_empty(p_telefono)) then 
		set @response = exists(
			select * from 
            tb_proveedor p
            where p.telefono = p_telefono
            and p.eliminado = false
        );
    end if;
    
    return @response;
end $$
delimiter ;


drop function if exists func_exists_proveedor_by_correo;
delimiter $$
create function func_exists_proveedor_by_correo(p_correo varchar(100))
returns bool
begin 
	set @response = false;
	set p_correo = trim(p_correo);
    
    if (!is_empty(p_correo)) then 
		set @response = exists(
			select * from 
            tb_proveedor p
            where p.correo = p_correo
            and p.eliminado = false
        );
    end if;
    
    return @response;
end $$
delimiter ;



drop procedure if exists `proc_get_proveedores`;
delimiter $$
create procedure proc_get_proveedores()
begin
    select p.id,
            p.id_imagen,
            p.nombre,
            p.fecha_creado
    from tb_proveedor p 
    where p.eliminado = false
    order by p.nombre asc;
end $$
delimiter ;


drop procedure if exists `proc_get_proveedor_by_id`;
delimiter $$
create procedure proc_get_proveedor_by_id(in p_id bigint)
begin
    if (valid_int_id(p_id)) then
        select p.id,
                p.id_empleado_creado_por,
                p.id_imagen,
                p.nombre,
                p.rtn,
                p.telefono,
                p.correo,
                p.fecha_creado
        from tb_proveedor p 
        where p.eliminado = false
        and p.id = p_id;
    end if;
end $$
delimiter ;

drop procedure if exists `proc_get_proveedor_by_rtn`;
delimiter $$
create procedure proc_get_proveedor_by_rtn(in p_rtn varchar(100))
begin
    set p_rtn = remove_spaces(p_rtn);
    if (!is_empty(p_rtn)) then
        select p.id,
                p.id_empleado_creado_por,
                p.id_imagen,
                p.nombre,
                p.rtn,
                p.telefono,
                p.correo,
                p.fecha_creado
        from tb_proveedor p 
        where p.eliminado = false
        and p.rtn = p_rtn;
    end if;
end $$
delimiter ;


drop procedure if exists `proc_get_proveedor_by_telefono`;
delimiter $$
create procedure proc_get_proveedor_by_telefono(in p_telefono varchar(100))
begin
    set p_telefono = trim(p_telefono);
    if (!is_empty(p_telefono)) then
        select p.id,
                p.id_empleado_creado_por,
                p.id_imagen,
                p.nombre,
                p.rtn,
                p.telefono,
                p.correo,
                p.fecha_creado
        from tb_proveedor p 
        where p.eliminado = false
        and p.telefono = p_telefono;
    end if;
end $$
delimiter ;



drop procedure if exists `proc_get_proveedor_by_correo`;
delimiter $$
create procedure proc_get_proveedor_by_correo(in p_correo varchar(100))
begin
    set p_correo = trim(p_correo);
    if (!is_empty(p_correo)) then
        select p.id,
                p.id_empleado_creado_por,
                p.id_imagen,
                p.nombre,
                p.rtn,
                p.telefono,
                p.correo,
                p.fecha_creado
        from tb_proveedor p 
        where p.eliminado = false
        and p.correo = p_correo;
    end if;
end $$
delimiter ;




drop procedure if exists `proc_add_proveedor`;
delimiter $$
create procedure proc_add_proveedor(in p_id_empleado_creado_por bigint,
                                    in p_id_imagen bigint,
                                    in p_nombre varchar(100),
                                    in p_rtn varchar(100),
                                    in p_telefono varchar(100),
                                    in p_correo varchar(100))
begin
    set p_nombre = trim_and_lower(p_nombre);
    set p_rtn = remove_spaces(p_rtn);
    set p_telefono = trim(p_telefono);
    set p_correo = remove_spaces(lower(p_correo));

    set @p_id = null;
    if (!is_empty(p_nombre)) then

        set @p_id = func_get_next_proveedor_id();

        insert into tb_proveedor(
            `id`,
            `id_empleado_creado_por`,
            `nombre`,
            `rtn`,
            `telefono`,
            `correo`
        ) values (
            @new_id,
            p_id_empleado_creado_por,
            p_nombre,
            p_rtn,
            p_telefono,
            p_correo
        );

    end if;

    select @p_id as 'id';
end $$
delimiter ;




drop procedure if exists `proc_update_proveedor_by_id`;
delimiter $$
create procedure proc_update_proveedor_by_id(in p_id bigint,
                                                in p_id_imagen bigint,
                                                in p_nombre varchar(100),
                                                in p_rtn varchar(100),
                                                in p_telefono varchar(100),
                                                in p_correo varchar(100))
begin
    set p_nombre = trim_and_lower(p_nombre);
    set p_rtn = remove_spaces(p_rtn);
    set p_telefono = trim(p_telefono);
    set p_correo = remove_spaces(lower(p_correo));

    if (!is_empty(p_nombre) and 
        valid_int_id(p_id)) then

        update tb_proveedor
        set nombre = p_nombre,
            rtn = p_rtn,
            telefono = p_telefono,
            correo = p_correo
        where id = p_id
        and eliminado = false;

    end if;

end $$
delimiter ;



drop procedure if exists `proc_delete_proveedor_by_id`;
delimiter $$
create procedure proc_delete_proveedor_by_id(in p_id bigint)
begin 
    if (valid_int_id(p_id)) then
        update tb_proveedor
        set eliminado = true,
            fecha_eliminado = current_timestamp()
        where id = p_id;
        
        update tb_proveedor_producto
        set eliminado = true,
			fecha_eliminado = current_timestamp()
		where id_proveedor = p_id;
    end if;
end $$
delimiter ;


drop function if exists func_get_next_tipo_vehiculo_id;
delimiter $$
create function func_get_next_tipo_vehiculo_id()
returns bigint 
begin
	set @new_id = (select id from tb_tipo_vehiculo order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;

drop procedure if exists proc_get_tipo_vehiculos;
delimiter $$
create procedure proc_get_tipo_vehiculos()
begin
    select t.id,
            t.nombre,
            t.descripcion,
            t.fecha_creado
    from tb_tipo_vehiculo t 
    where t.eliminado = false;
end $$
delimiter ;

drop procedure if exists proc_add_tipo_vehiculo;
delimiter $$
create procedure proc_add_tipo_vehiculo(in p_nombre varchar(200),
                                        in p_descripcion text)
begin
    set p_nombre = trim_and_lower(p_nombre);
    set p_descripcion = trim(p_descripcion);
    set @new_id = null;

    if (!is_empty(p_nombre)) then

        set @new_id = func_get_next_tipo_vehiculo_id();

        insert into tb_tipo_vehiculo(
            `id`,
            `nombre`,
            `descripcion`
        ) values (
            @new_id,
            p_nombre,
            p_descripcion
        );
    end if;

    select @new_id as 'id';
end $$
delimiter ;

drop procedure if exists proc_update_tipo_vehiculo_by_id;
delimiter $$
create procedure proc_update_tipo_vehiculo_by_id(in p_id bigint,
                                                    in p_nombre varchar(200),
                                                    in p_descripcion text)
begin
    set p_nombre = trim_and_lower(p_nombre);
    set p_descripcion = trim(p_descripcion);

    if (valid_int_id(p_id) and 
        !is_empty(p_nombre)) then
        
        update tb_tipo_vehiculo
        set nombre = p_nombre,
            descripcion = p_descripcion
        where id = p_id
        and eliminado = false;
    end if;
end $$
delimiter ;

drop procedure if exists proc_delete_tipo_vehiculo_by_id;
delimiter $$
create procedure proc_delete_tipo_vehiculo_by_id(in p_id bigint)
begin
    if (valid_int_id(p_id)) then
        update tb_tipo_vehiculo
        set eliminado = true,
            fecha_eliminado = current_timestamp()
        where id = p_id;
    end if;
end $$
delimiter ;
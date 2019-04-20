drop function if exists func_get_next_producto_local_ubicacion_id;
delimiter $$
create function func_get_next_producto_local_ubicacion_id()
returns bigint 
begin
	set @new_id = (select id from tb_producto_local_ubicacion order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;


drop procedure if exists `proc_get_producto_local_ubicacion`;
delimiter $$
create procedure proc_get_producto_local_ubicacion(in p_id_producto_local bigint)
begin
    if (valid_int_id(p_id_producto_local)) then
        select p.id,
                p.id_producto_local,
                p.ubicacion,
                p.fecha_creado
        from tb_producto_local_ubicacion p
        where p.id_producto_local = p_id_producto_local
        and p.eliminado = false;
    end if;
end $$
delimiter ;

drop procedure if exists `proc_add_producto_local_ubicacion`;
delimiter $$
create procedure proc_add_producto_local_ubicacion(in p_id_producto_local bigint,
                                                    in p_ubicacion varchar(100))
begin
    set p_ubicacion = trim(p_ubicacion);
    set @new_id  = null;

    if (valid_int_id(p_id_producto_local)) then
        set @new_id = func_get_next_producto_local_ubicacion_id();
        insert into tb_producto_local_ubicacion(
            `id`,
            `id_producto_local`,
            `ubicacion`
        ) values (
            @new_id,
            p_id_producto_local,
            p_ubicacion
        );
    end if;

    select @new_id as 'id';
end $$
delimiter ;


drop procedure if exists `proc_update_producto_local_ubicacion_by_id`;
delimiter $$
create procedure proc_update_producto_local_ubicacion_by_id(in p_id_producto_local bigint,
                                                            in p_ubicacion varchar(100))
begin
    if (valid_int_id(p_id_producto_local)) then
        set p_ubicacion = trim(p_ubicacion);

        update tb_producto_local_ubicacion
        set ubicacion = p_ubicacion
        where id = p_id_producto_local
        and eliminado = false;
    end if;
end $$
delimiter ;

drop procedure if exists `proc_delete_producto_local_ubicacion_by_id`;
delimiter $$
create procedure proc_delete_producto_local_ubicacion_by_id(in p_id bigint)
begin
    if (valid_int_id(p_id)) then
        update tb_producto_local_ubicacion
        set eliminado = true,
            fecha_eliminado = current_timestamp()
        where id = p_id;
    end if;
end $$
delimiter ;

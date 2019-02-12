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

drop procedure if exists `proc_get_producto_local`;
delimiter $$
create procedure proc_get_producto_local(in p_id_local bigint)
begin
    if (valid_int_id(p_id_local)) then
        select p.id,
                p.id_producto,
                p.id_local,
                p.existencia,
                p.cantidad_minima
        from tb_producto_local p
        where p.eliminado = false and
        p.id_local = p_id_local;
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

drop procedure if exists `proc_delete_producto_local_by_id`;
delimiter $$
create procedure proc_delete_producto_local_by_id(in p_id bigint)
begin
    if (valid_int_id(p_id)) then
        update tb_producto_local
        set eliminado = true,
            fecha_eliminado = current_timestamp()
        where id = p_id;
    end if;
end $$
delimiter ;
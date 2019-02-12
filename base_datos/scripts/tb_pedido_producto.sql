drop function if exists func_get_next_pedido_producto_id;
delimiter $$
create function func_get_next_pedido_producto_id()
returns bigint 
begin
	set @new_id = (select id from tb_pedido_producto order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;

drop procedure if exists `proc_get_pedido_productos_by_pedido`;
delimiter $$
create procedure proc_get_pedido_productos_by_pedido(in p_id_pedido bigint )
begin
    if (valid_int_id(p_id_pedido)) begin
        select p.id,
                p.id_producto,
                p.cantidad,
                p.fecha_creado
        from tb_pedido_producto p 
        where p.eliminado = false;
    end if;
delimiter ;
end $$

drop procedure if exists `proc_add_pedido_producto`;
delimiter $$
create procedure proc_add_pedido_producto(in p_id_pedido bigint,
                                            in p_id_producto bigint,
                                            in p_cantidad int(11))
begin
    set @new_id = null;
    if (valid_int_id(p_id_pedido) and 
        valid_int_id(p_id_producto) and 
        p_cantidad > 0) then

        set @new_id = func_get_next_pedido_producto_id();
        insert into tb_pedido_producto(
            `id`,
            `id_pedido`,
            `id_producto`,
            `cantidad`
        ) values (
            @new_id,
            p_id_pedido,
            p_id_producto,
            p_cantidad
        );
    end if;
    select @new_id as 'id';
end $$
delimiter ;

drop procedure if exists `proc_update_pedido_producto_by_id`;
delimiter $$
create procedure proc_update_pedido_producto_by_id(in p_id bigint,
                                                    in p_cantidad)
begin
    if (valid_int_id(p_id)) then
        update tb_pedido_producto
        set cantidad = p_cantidad
        where id = p_id 
        and eliminado = false;
    end if;
end $$
delimiter ; 

drop procedure if exists `proc_delete_pedido_producto_by_id`;
delimiter $$
create procedure proc_delete_pedido_producto_by_id(in p_id bigint)
begin
    if (valid_int_id(p_id)) then
        update tb_pedido_producto
        set eliminado = true,
            fecha_eliminado = current_timestamp()
        where id = p_id;
    end if;
end $$
delimiter ;
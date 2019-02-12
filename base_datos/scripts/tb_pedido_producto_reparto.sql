drop function if exists func_get_next_pedido_producto_reparto_id;
delimiter $$
create function func_get_next_pedido_producto_reparto_id()
returns bigint 
begin
	set @new_id = (select id from tb_pedido_producto_reparto order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;

drop procedure if exists `proc_get_pedidos_producto_reparto_by_pedido_producto`;
delimiter $$
create procedure proc_get_pedidos_producto_reparto_by_pedido_producto(in p_id_pedido_producto bigint)
begin
    if (valid_int_id(p_id_pedido_producto)) then
        select p.id,
                p.id_local,
                p.cantidad,
                p.recibido
        from tb_pedido_producto_reparto p
        where p.id_pedido_producto = p_id_pedido_producto
        and p.eliminado = false;
    end if;
end $$
delimiter ;

drop procedure if exists `proc_add_pedido_producto_reparto`;
delimiter $$
create procedure proc_add_pedido_producto_reparto(in p_id_pedido_producto bigint,
                                                    in p_id_local bigint,
                                                    in p_cantidad int(11))
begin
    set @new_id = null;
    if (valid_int_id(p_id_pedido_producto) and 
        valid_int_id(p_id_local) and 
        p_cantidad > 0) then

        set @new_id = func_get_next_pedido_producto_reparto_id();
        insert into tb_pedido_producto_reparto(
            `id`,
            `id_pedido_producto`,
            `id_local`,
            `cantidad`
        ) values (
            @new_id,
            p_id_pedido_producto,
            p_id_local,
            p_cantidad
        );
    end if;
    select @new_id as 'id';
end $$
delimiter ;


drop procedure if exists `proc_update_pedido_producto_reparto_by_id`;
delimiter $$
create procedure proc_update_pedido_producto_reparto_by_id(in p_id bigint,
                                                            in p_cantidad int(11),
                                                            in p_recibido boolean)
begin
    if (valid_int_id(p_id)) then
        update tb_pedido_producto_reparto
        set cantidad = p_cantidad,
            recibido = p_recibido
        where id = p_id;
    end if; 
end $$
delimiter ; 

drop procedure if exists `proc_delete_pedido_producto_by_id`;
delimiter $$
create procedure proc_delete_pedido_producto_by_id(in p_id bigint)
begin
    if (valid_int_id(p_id)) then
        update tb_pedido_producto_reparto
        set eliminado = true,
            fecha_eliminado = current_timestamp()
        where id = p_id;
    end if;
end $$
delimiter ;
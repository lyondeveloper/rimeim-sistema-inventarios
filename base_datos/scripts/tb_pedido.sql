drop function if exists func_get_next_pedido_id;
delimiter $$
create function func_get_next_pedido_id()
returns bigint 
begin
	set @new_id = (select id from tb_pedido order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;

drop procedure if exists `proc_get_pedidos`;
delimiter $$
create procedure proc_get_pedidos()
begin
    select p.id,
            p.id_empleado_creado_por,
            p.id_local,
            p.id_local_solicitado,
            p.id_proveedor,
            p.codigo,
            p.es_compra,
            p.recibido,
            p.fecha_creado
    from tb_pedido p 
    where p.eliminado = false
    order by p.fecha_creado desc;
end $$
delimiter ;

drop procedure if exists `proc_get_pedidos_by_local`;
delimiter $$
create procedure proc_get_pedidos_by_local(in p_id_local bigint)
begin
    if (valid_int_id(p_id_local)) then
        select p.id,
                p.id_empleado_creado_por,
                p.id_local_solicitado,
                p.id_proveedor,
                p.codigo,
                p.es_compra,
                p.recibido,
                p.fecha_creado
        from tb_pedido p 
        where p.eliminado = false and
                p.id_local = p_id_local
        order by p.fecha_creado desc;
    end if;
end $$
delimiter ;

drop procedure if exists `proc_add_pedido`;
delimiter $$
create procedure proc_add_pedido(in p_id_empleado_creado_por bigint,
                                    in p_id_local bigint,
                                    in p_id_local_solicitado bigint,
                                    in p_id_proveedor bigint,
                                    in p_codigo varchar(50),
                                    in p_fecha_prevista_entrega datetime)
begin
    set p_codigo = trim(p_codigo);
    set @new_id = null;

    if (valid_int_id(p_id_empleado_creado_por) and 
        valid_int_id(p_id_local)) then
        
        set @new_id = func_get_next_pedido_id();

        insert into tb_pedido(
            `id`,
            `id_empleado_creado_por`,
            `id_local`,
            `id_local_solicitado`,
            `id_proveedor`,
            `codigo`,
            `fecha_prevista_entrega`
        ) values (
            @new_id,
            p_id_empleado_creado_por,
            p_id_local,
            p_id_local_solicitado,
            p_id_proveedor,
            p_codigo,
            p_fecha_prevista_entrega
        );
    end if;

    select @new_id as 'id';
end $$
delimiter ; 

drop procedure if exists `proc_update_pedido_by_id`;
delimiter $$
create procedure proc_update_pedido_by_id(in p_id bigint,
                                            in p_fecha_prevista_entrega datetime,
                                            in p_recibido boolean)
begin
    if (valid_int_id(p_id)) then
        update tb_pedido 
        set fecha_prevista_entrega = p_fecha_prevista_entrega,
            recibido = p_recibido
        where id = p_id and 
        eliminado = false;

    end if;
end $$
delimiter ; 

drop procedure if exists `proc_delete_pedido_by_id`;
delimiter $$
create procedure proc_delete_pedido_by_id(in p_id bigint,
                                            in p_id_empleado_eliminado_por bigint)
begin
    if (valid_int_id(p_id) and 
        valid_int_id(p_id_empleado_eliminado_por)) then
        update tb_pedido 
        set eliminado = true,
            fecha_eliminado = current_timestamp(),
            id_empleado_eliminado_por = p_id_empleado_eliminado_por
        where id = p_id;

    end if;
end $$
delimiter ;
drop function if exists func_get_next_pedido_solicitud_id;
delimiter $$
create function func_get_next_pedido_solicitud_id()
returns bigint 
begin
	set @new_id = (select id from tb_pedido_solicitud order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;

drop procedure if exists `proc_get_pedidos_solicitud_by_local`;
delimiter $$
create procedure proc_get_pedidos_solicitud_by_local(in p_id_local bigint)
begin
    if (valid_int_id(p_id_local)) then
        select p.id,
                p.id_pedido,
                p.id_empleado_encargado,
                p.enviado,
                p.fecha_creado
        from tb_pedido_solicitud p 
        where p.id_local = p_id_local 
        and p.eliminado = false;
        
    end if;
end $$
delimiter ;

drop procedure if exists `proc_get_pedido_solicitud_by_pedido`;
delimiter $$
create procedure if exists proc_get_pedido_solicitud_by_pedido(in p_id_pedido bigint)
begin
    if (valid_int_id(p_id_pedido)) then
        select p.id,
                p.id_local,
                p.enviado,
                p.id_empleado_encargado,
                p.fecha_creado
        from tb_pedido_solicitud p 
        where p.id_pedido = p_id_pedido 
        and p.eliminado = false;
        
    end if;
end $$
delimiter ; 

drop procedure if exists `proc_add_pedido_solicitud`;
delimiter $$
create procedure proc_add_pedido_solicitud(in p_id_pedido bigint,
                                            in p_id_local bigint)
begin
    set @new_id = null;
    if (valid_int_id(p_id_pedido) and 
        valid_int_id(p_id_local)) then 

        set @new_id = func_get_next_pedido_solicitud_id();
        insert into tb_pedido_solicitud(
            `id`,
            `id_pedido`,
            `id_local`
        ) values (
            @new_id,
            p_id_pedido,
            p_id_local
        );
    end if;

    select @new_id as 'id';
end $$
delimiter ;

drop procedure if exists `proc_update_pedido_solicitud_by_id`;
delimiter $$
create procedure proc_update_pedido_solicitud_by_id(in p_id bigint,
                                                    in p_id_empleado_encargado bigint,
                                                    in p_enviado boolean)
begin
    if (valid_int_id(p_id)) then

        update tb_pedido_solicitud
        set id_empleado_encargado = p_id_empleado_encargado,
            enviado = p_enviado
        where id = p_id;
    end if;
end $$
delimiter ;

drop procedure if exists `proc_delete_pedido_solicitud_by_id`;
delimiter $$ 
create procedure proc_delete_pedido_solicitud_by_id(in p_id bigint)
begin
    if (valid_int_id(p_id)) then
        update tb_pedido_solicitud
        set eliminado = true,
            fecha_eliminado = current_timestamp()
        where id = p_id;
    end if;
end $$
delimiter ;





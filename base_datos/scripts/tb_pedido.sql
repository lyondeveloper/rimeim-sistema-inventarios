/*
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
*/

/*
drop function if exists func_exists_pedido_with_code;
delimiter $$
create function func_exists_pedido_with_code(p_codigo varchar(50))
returns bool
begin
	set p_codigo = trim(p_codigo);
    set @response = false;
    
    if (!is_empty(p_codigo)) then
		set @response = exists(
			select * from tb_pedido p
            where p.codigo = p_codigo
        );
    end if;
    
    return @response;
end $$
delimiter ;
*/

/*
drop function if exists func_exists_pedido_with_id;
delimiter $$
create function func_exists_pedido_with_id(p_id bigint)
returns bool
begin
    set @response = false;
    
    if (valid_int_id(p_id)) then
		set @response = exists(
			select * from tb_pedido p
            where p.id = p_id
            and p.eliminado = false
        );
    end if;
    
    return @response;
end $$
delimiter ;
*/

/*
drop function if exists func_exists_order_by_code_and_not_same ;
delimiter $$
create function func_exists_order_by_code_and_not_same(p_codigo varchar(50),
														p_id bigint)
returns bool
begin 
	set @response = false;
    set p_codigo = trim(p_codigo);
    
    if (!is_empty(p_codigo) and 
		valid_int_id(p_id)) then
		set @response = exists(
			select * from 
            tb_pedido p
            where p.codigo = p_codigo
            and p.id != p_id
        );
    end if;
    
    return @response;
end $$
delimiter ;
*/


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
            p.fecha_recibido,
            p.fecha_creado
    from tb_pedido p 
    where p.eliminado = false
    order by p.fecha_creado desc;
end $$
delimiter ;

drop procedure if exists proc_search_pedidos;
delimiter $$
create procedure proc_search_pedidos(in p_id_local bigint,
                                    in p_id_local_solicitado bigint,
                                    in p_id_proveedor bigint,
                                    in p_codigo varchar(50),
                                    in p_recibido boolean,
                                    in p_fecha_inicio datetime,
                                    in p_fecha_final datetime)
begin
    set p_codigo = trim(p_codigo);
    set @sql_query = "select distinct p.id,
                    p.id_empleado_creado_por,
                    p.id_local,
                    p.id_local_solicitado,
                    p.id_proveedor,
                    p.codigo,
                    p.es_compra,
                    p.recibido,
                    p.fecha_recibido,
                    p.fecha_creado
            from tb_pedido p 
            where p.eliminado = false";
    
    if (valid_int_id(p_id_local)) then 
        set @sql_query = concat(@sql_query, " and p.id_local = ", p_id_local);
    end if;

    if (valid_int_id(p_id_local_solicitado)) then 
        set @sql_query = concat(@sql_query, " and p.id_local_solicitado = ", p_id_local_solicitado);
    end if;

    if (valid_int_id(p_id_proveedor)) then 
        set @sql_query = concat(@sql_query, " and p.id_proveedor = ", p_id_proveedor);
    end if;

    if (p_fecha_inicio is not null and 
        p_fecha_final is not null) then
        set @sql_query = concat(@sql_query, " and p.fecha_creado between ", p_fecha_inicio , " and ", p_fecha_final);
    end if;

    if (!is_empty(p_codigo)) then 
        set @sql_query = concat(@sql_query, " and p.codigo like concat('%', '", p_codigo, "', '%') ");
    end if; 

    if (p_recibido is not null) then 
        set @sql_query = concat(@sql_query, " and p.recibido = ", p_recibido);
    end if;

    set @sql_query = concat(@sql_query, " order by p.fecha_creado desc;");

    PREPARE sql_statement FROM @sql_query;
    EXECUTE sql_statement;
end $$
delimiter ;



drop procedure if exists `proc_get_pedido_by_id`;
delimiter $$
create procedure proc_get_pedido_by_id(in p_id bigint)
begin
	if (valid_int_id(p_id)) then
		select p.id,
				p.id_empleado_creado_por,
				p.id_local,
				p.id_local_solicitado,
				p.id_proveedor,
				p.codigo,
				p.es_compra,
				p.recibido,
				p.fecha_creado,
                p.fecha_recibido,
                p.fecha_prevista_entrega
		from tb_pedido p 
		where p.eliminado = false
        and p.id = p_id;
    end if;
end $$
delimiter ;




drop procedure if exists `proc_get_pedidos_by_local`;
delimiter $$
create procedure proc_get_pedidos_by_local(in p_id_local bigint)
begin
    if (valid_int_id(p_id_local)) then
        select p.id,
                p.id_local_solicitado,
                p.id_proveedor,
                p.codigo,
                p.es_compra,
                p.recibido,
                p.fecha_recibido,
                p.fecha_creado
        from tb_pedido p 
        where p.eliminado = false and
                p.id_local = p_id_local
        order by p.fecha_creado desc;
    end if;
end $$
delimiter ;


/*
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
		set @es_compra = (p_id_proveedor is not null);
        
        insert into tb_pedido(
            `id`,
            `id_empleado_creado_por`,
            `id_local`,
            `id_local_solicitado`,
            `id_proveedor`,
            `codigo`,
            `fecha_prevista_entrega`,
            `es_compra`
        ) values (
            @new_id,
            p_id_empleado_creado_por,
            p_id_local,
            p_id_local_solicitado,
            p_id_proveedor,
            p_codigo,
            p_fecha_prevista_entrega,
            @es_compra
        );
    end if;

    select @new_id as 'id';
end $$
delimiter ; 
*/

/*
drop procedure if exists `proc_update_pedido_by_id`;
delimiter $$
create procedure proc_update_pedido_by_id(in p_id bigint,
											in p_id_proveedor bigint,
                                            in p_id_local_solicitado bigint,
											in p_codigo varchar(50),
                                            in p_fecha_prevista_entrega datetime)
begin
    if (valid_int_id(p_id)) then
        update tb_pedido 
        set fecha_prevista_entrega = p_fecha_prevista_entrega,
			id_proveedor = p_id_proveedor,
			id_local_solicitado = p_id_local_solicitado,
            codigo = p_codigo
        where id = p_id and 
        eliminado = false;

    end if;
end $$
delimiter ; 
*/

/*
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
*/

/*
drop procedure if exists proc_update_pedido_mark_received_by_id;
delimiter $$
create procedure proc_update_pedido_mark_received_by_id(in p_id bigint)
begin
	if (valid_int_id(p_id)) then
		update tb_pedido
        set recibido = true,
			fecha_recibido = current_timestamp()
        where id = p_id;
    end if;
end $$
delimiter ;
*/


-- FALTA TODO GET




drop function if exists func_get_next_cliente_producto_precio_id;
delimiter $$
create function func_get_next_cliente_producto_precio_id()
returns bigint
begin
	set @new_id = (select id from tb_cliente_producto_precio order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;


drop procedure if exists proc_get_cliente_producto_precio;
delimiter $$ 
create procedure proc_get_cliente_producto_precio(in p_id bigint) 
begin
	if (valid_int_id(p_id)) then
		select p.id,
				p.id_producto,
                prod.nombre,
                prod.descripcion,
				p.precio
		from tb_cliente_producto_precio p 
        join tb_producto prod on prod.id = p.id_producto
		where p.id = p_id
		and p.eliminado = false
        and prod.eliminado = false;
	end if; 
end $$
delimiter ;

drop procedure if exists proc_get_cliente_productos_precio;
delimiter $$ 
create procedure proc_get_cliente_productos_precio(in p_id_cliente bigint) 
begin
	if (valid_int_id(p_id_cliente)) then
		select p.id,
				p.id_producto,
                prod.nombre,
                prod.descripcion,
				p.precio
		from tb_cliente_producto_precio p 
        join tb_producto prod on prod.id = p.id_producto
								and prod.eliminado = false
		where p.id_cliente = p_id_cliente
		and p.eliminado = false;
	end if; 
end $$
delimiter ;

drop procedure if exists proc_get_cliente_producto_precio_by_idc_idp;
delimiter $$ 
create procedure proc_get_cliente_producto_precio_by_idc_idp(in p_id_cliente bigint,
															in p_id_producto bigint) 
begin
	if (valid_int_id(p_id_cliente) and 
		valid_int_id(p_id_producto)) then
		select p.id,
				p.id_producto,
                prod.nombre,
                prod.descripcion,
				p.precio
		from tb_cliente_producto_precio p 
        join tb_producto prod on prod.id = p.id_producto
								and prod.eliminado = false
		where p.id_cliente = p_id_cliente
		and p.id_producto = p_id_producto
		and p.eliminado = false;
	end if; 
end $$
delimiter ;


drop procedure if exists proc_add_cliente_producto_precio;
delimiter $$
create procedure proc_add_cliente_producto_precio(in p_id_cliente bigint,
													in p_id_producto bigint,
                                                    in p_precio double)
begin
	set @new_id = null;
	if (valid_int_id(p_id_cliente) and
		valid_int_id(p_id_producto) and
        p_precio >= 0) then
        
        if not exists(select * from 
					tb_cliente_producto_precio p 
                    where p.id_cliente = p_id_cliente and 
                    p.id_producto = p_id_producto and
                    p.eliminado = false) then
			set @new_id = func_get_next_cliente_producto_precio_id();
        
			insert into tb_cliente_producto_precio(
						`id`,
						`id_cliente`,
						`id_producto`,
						`precio`)
			values(@new_id,
					p_id_cliente,
					p_id_producto,
					p_precio);
        end if;
    end if;
    
    select @new_id as 'id';
end $$
delimiter ;



drop procedure if exists `proc_update_cliente_producto_precio_by_id`;
delimiter $$
create procedure proc_update_cliente_producto_precio_by_id(in p_id bigint,
															in p_precio double)
begin
	if (valid_int_id(p_id) and 
		p_precio >= 0) then
		update tb_cliente_producto_precio
        set precio = p_precio
        where id = p_id 
        and eliminado = false;
    end if;
end $$
delimiter ;



drop procedure if exists `proc_update_cliente_producto_precio_by_idp_idc`;
delimiter $$
create procedure proc_update_cliente_producto_precio_by_idp_idc(in p_id_cliente bigint,
																in p_id_producto bigint,
                                                                in p_precio double)
begin
	if (valid_int_id(p_id_cliente) and
        valid_int_id(p_id_producto) and
        p_precio >= 0) then
		
        update tb_cliente_producto_precio
        set precio = p_precio
        where id_cliente = p_id_cliente and
				id_producto = p_id_producto and
                eliminado = false;
    end if;
end $$
delimiter ;



drop procedure if exists `proc_delete_cliente_producto_precio_by_id`;
delimiter $$
create procedure proc_delete_cliente_producto_precio_by_id(in p_id bigint)
begin
	if (valid_int_id(p_id)) then
		update tb_cliente_producto_precio
        set eliminado = true,
			fecha_eliminado = current_timestamp()
		where id = p_id;
    end if;
end $$
delimiter ;



drop procedure if exists `proc_delete_cliente_producto_precio_by_idp_idc`;
delimiter $$
create procedure proc_delete_cliente_producto_precio_by_idp_idc(in p_id_cliente bigint,
																in p_id_producto bigint)
begin
	if (valid_int_id(p_id)) then
		update tb_cliente_producto_precio
        set eliminado = true,
			fecha_eliminado = current_timestamp()
		where id_cliente = p_id_cliente
        and id_producto = p_id_producto;
    end if;
end $$
delimiter ;




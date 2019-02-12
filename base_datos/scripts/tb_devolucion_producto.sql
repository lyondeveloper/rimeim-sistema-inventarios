
drop function if exists func_get_next_devolucion_producto_id;
delimiter $$
create function func_get_next_devolucion_producto_id()
returns bigint
begin
	set @new_id = (select id from tb_devolucion_producto order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;


-- LOS METODOS GET AUN ESTAN EN CONSTRUCCION 
drop procedure if exists proc_get_devolucion_producto_by_iddev;
delimiter $$
create procedure proc_get_devolucion_producto_by_iddev(in p_id_devolucion bigint)
begin
	if (valid_int_id(p_id_devolucion)) then
		select d.id,
				d.id_venta_producto,
                d.cantidad,
                d.fecha_creado
        from tb_devolucion_producto d
        where d.id_devolucion = p_id_devolucion;
    end if;
end $$
delimiter ;

drop procedure if exists `proc_add_devolucion_producto`;
delimiter $$
create procedure proc_add_devolucion_producto(in p_id_devolucion bigint,
												in p_id_venta_producto bigint,
                                                in p_cantidad int(11))
begin
	set @new_id = null;
	if (valid_int_id(p_id_devolucion) and 
		valid_int_id(p_id_venta_producto) and 
        p_cantidad > 0) then
        
        set @new_id = func_get_next_devolucion_producto_id();
        
        insert into tb_devolucion_producto(
        `id`,
        `id_devolucion`,
        `id_venta_producto`,
        `cantidad`)
        values(@new_id,
				p_id_devolucion,
				p_id_venta_producto,
                p_cantidad);
    end if;
    select @new_id as 'id';
end $$
delimiter ;

drop procedure if exists `proc_update_devolucion_producto_by_id`;
delimiter $$
create procedure proc_update_devolucion_producto_by_id(in p_id bigint,
														in p_cantidad int(11))
begin
	if (valid_int_id(p_id) and 
		p_cantidad != null) then
		update tb_devolucion_producto
        set cantidad = p_cantidad
        where id = p_id;
    end if;
end $$
delimiter ;





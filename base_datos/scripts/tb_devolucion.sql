
drop function if exists func_get_next_devolucion_id;
delimiter $$
create function func_get_next_devolucion_id()
returns bigint
begin
	set @new_id = (select id from tb_devolucion order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;


drop procedure if exists `proc_get_devoluciones`;
delimiter $$
create procedure proc_get_devoluciones(in p_id_local bigint)
begin
	if(valid_int_id(p_id_local)) then 
		select d.id,
				d.id_venta,
				d.id_empleado_creado_por,
				d.detalle,
				d.total_devuelto,
				d.fecha_creado
		from tb_devolucion d
		join tb_venta v on v.id = d.id_venta
		where d.eliminado = false
		and v.id_local = p_id_local
		order by d.fecha_creado asc;
	end if;
end $$
delimiter ;

drop procedure if exists `proc_get_devolucion_by_id`;
delimiter $$
create procedure proc_get_devolucion_by_id(in p_id bigint)
begin
	if (valid_int_id(p_id)) then
		select d.id,
				d.id_venta,
				(
					select v.id_local
					from tb_venta v 
					where v.i = d.id_venta
					limit 1
				) as 'id_local',
				d.id_empleado_creado_por,
				d.detalle,
				d.total_devuelto,
				d.fecha_creado
		from tb_devolucion d
		where d.eliminado = false
        and d.id = p_id;
    end if;
end $$
delimiter ;

drop procedure if exists `proc_add_devolucion`;
delimiter $$
create procedure proc_add_devolucion(in p_id_empleado_creado_por bigint,
										in p_id_venta bigint,
										in p_total_devuelto double,
                                        in p_detalle text)
begin
	set @new_id = null;
    
	if (valid_int_id(p_id_empleado_creado_por) and
		valid_int_id(p_id_venta) and 
        p_total_devuelto != null) then
		
        set @new_id = func_get_next_devolucion_id();
        
        INSERT tb_devolucion
			(`id`,
			`id_venta`,
			`id_empleado_creado_por`,
			`detalle`,
			`total_devuelto`)
			VALUES
			(@new_id,
			 p_id_venta,
			 p_id_empleado_creado_por,
			p_detalle,
			p_total_devuelto);

    end if;
    
    select @new_id as 'id';
end $$
delimiter ;

drop procedure if exists `proc_update_devolucion_by_id`;
delimiter $$
create procedure proc_update_devolucion_by_id(in p_id bigint,
												in p_total_devuelto double,
												in p_detalle text)
begin 
	if (valid_int_id(p_id)) then
		update tb_devolucion
        set total_devuelto = p_total_devuelto,
			detalle = p_detalle
		where id = p_id;
    end if;
end $$
delimiter ;

drop procedure if exists `proc_delete_devolucion_by_id`;
delimiter $$
create procedure proc_delete_devolucion_by_id(in p_id bigint,
												in p_id_empleado_eliminado_por bigint)
begin
	if (valid_int_id(p_id) and 
		valid_int_id(p_id_empleado_eliminado_por)) then
		update tb_devolucion_producto 
		set eliminado = true,
			fecha_creado = current_timestamp()
		where id_devolucion = p_id;

		update tb_devolucion
        set eliminado = true,
			fecha_eliminado = current_timestamp(),
            id_empleado_eliminado_por = p_id_empleado_eliminado_por
		where id = p_id;
    end if;
end $$
delimiter ;







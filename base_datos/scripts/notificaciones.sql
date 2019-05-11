drop procedure if exists proc_get_productos_notificacion_cantidad_minima;
delimiter $$
create procedure proc_get_productos_notificacion_cantidad_minima()
begin
	if (valid_int_id(p_id_local)) then
		select p.id,
				p.id_marca,
                p.id_tipo_vehiculo,
                p.nombre,
                p.descripcion,
                p.existencia,
                p.cantidad_minima
        from tb_producto p
        where p.eliminado = false
        and p.existencia <= p.cantidad_minima;
    end if;
end $$
delimiter ;

drop procedure if exists proc_get_productos_notificacion_cantidad_minima_by_local;
delimiter $$
create procedure proc_get_productos_notificacion_cantidad_minima_by_local(in p_id_local bigint)
begin
	if (valid_int_id(p_id_local)) then
		select pl.id,
				p.id as 'id_producto',
				p.codigo_barra,
                pl.existencia,
                pl.cantidad_minima,
                p.nombre,
                p.descripcion,
                p.id_marca,
                p.id_tipo_vehiculo
        from tb_producto_local pl 
        join tb_producto p on p.id = pl.id_producto
						and p.eliminado = false
        where pl.id_local = p_id_local
        and pl.existencia <= pl.cantidad_minima
        and pl.eliminado = false;
    end if;
end $$
delimiter ;
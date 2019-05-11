drop PROCEDURE if exists proc_get_products_report;
delimiter $$
create procedure proc_get_products_report(in p_id_local bigint, 
                                        in p_limit int(255),
                                        in p_fecha_inicio datetime,
                                        in p_fecha_final DATETIME,
                                        in p_asc boolean)
BEGIN
    set @p_id_local = p_id_local;
    set @p_fecha_inicio = p_fecha_inicio;
    set @p_fecha_final = p_fecha_final;
    if(p_limit > 0) then 

        set @sql_query = "
        select DISTINCT 
                p.codigo_barra,
                p.nombre,
                vp.id_producto,
                SUM(vp.cantidad) as 'cantidad'
        from tb_venta_producto vp 
        join tb_producto p on p.id = vp.id_producto
        join tb_venta v on v.id = vp.id_venta
        where v.eliminado = false
        and vp.eliminado = false 
        and vp.fecha_creado BETWEEN @p_fecha_inicio and @p_fecha_final ";


        if(valid_int_id(p_id_local)) THEN
            set @sql_query = concat(@sql_query, ' and v.id_local = @p_id_local ');
        end if;

        set @sql_query = concat(@sql_query, ' GROUP by vp.id_producto ');

        if(p_asc) then 
            set @sql_query = concat(@sql_query, ' order by cantidad DESC ');
        else 
            set @sql_query = concat(@sql_query, ' order by cantidad ASC ');
        end if;

        set @sql_query = concat(@sql_query, ' limit ', p_limit);
        PREPARE sql_statement FROM @sql_query;
	    EXECUTE sql_statement;
    end if; 
end $$
delimiter ;
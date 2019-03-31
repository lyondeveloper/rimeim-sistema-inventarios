drop function if exists func_get_next_proveedor_producto_id;
delimiter $$
create function func_get_next_proveedor_producto_id()
returns bigint 
begin
	set @new_id = (select id from tb_proveedor_producto order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;

drop procedure if exists proc_get_proveedor_productos_by_proveedor;
delimiter $$
create procedure proc_get_proveedor_productos_by_proveedor(in p_id bigint)
begin
    if (valid_int_id(p_id)) then
        select p.id,
                p.id_proveedor,
                p.id_producto,
                p.precio,
                p.fecha_creado
        from tb_proveedor_producto p 
        where p.id_proveedor = p_id
        and p.eliminado = false;
    end if;
end $$
delimiter ;

drop procedure if exists proc_add_proveedor_producto;
delimiter $$
create procedure proc_add_proveedor_producto(in p_id_proveedor bigint,
                                            in p_id_producto bigint,
                                            in p_precio double)
begin
    set @new_id = null;
    if (valid_int_id(p_id_proveedor) and 
        valid_int_id(p_id_producto) and 
        p_precio >= 0) then
        
        set @new_id = func_get_next_proveedor_producto_id();
        insert into tb_proveedor_producto(
            `id`,
            `id_proveedor`,
            `id_producto`,
            `precio`
        ) values (
            @new_id,
            p_id_proveedor,
            p_id_producto,
            p_precio
        );

    end if;
    select @new_id as 'id';
end $$
delimiter ;

drop procedure if exists proc_update_proveedor_producto;
delimiter $$
create procedure proc_update_proveedor_producto(in p_id bigint,
                                                in p_precio double)
begin
    if (valid_int_id(p_id) and 
        p_precio >= 0) then
        update tb_proveedor_producto
        set precio = p_precio
        where id = p_id;
    end if;
end $$
delimiter ; 

drop procedure if exists proc_delete_proveedor_producto_by_id;
delimiter $$
create procedure proc_delete_proveedor_producto_by_id(in p_id bigint)
begin
    if (valid_int_id(p_id) ) then
        update tb_proveedor_producto
        set eliminado = true,
            fecha_eliminado = current_timestamp()
        where id = p_id;
    end if;
end $$
delimiter ; 


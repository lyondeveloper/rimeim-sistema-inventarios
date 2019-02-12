drop function if exists func_get_next_producto_imagenes_id;
delimiter $$
create function func_get_next_producto_imagenes_id()
returns bigint 
begin
	set @new_id = (select id from tb_producto_imagenes order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;

drop procedure if exists `proc_get_producto_imagenes_by_producto`;
delimiter $$
create procedure proc_get_producto_imagenes_by_producto(in p_id_producto bigint)
begin
    if (valid_int_id(p_id_producto)) then
        select p.id,
                p.id_archivo,
                p.principal,
                p.fecha_creado
        where p.id_producto = p_id_producto
        and p.eliminado = false;
    end if;
end $$  
delimiter ;

drop procedure if exists `proc_add_producto_imagenes`;
delimiter $$
create procedure proc_add_producto_imagenes(in p_id_producto bigint,
                                            in p_id_archivo bigint,
                                            in p_principal boolean)
begin
    set @new_id = null;
    set p_principal = default_bool_value(p_principal, false);

    if (valid_int_id(p_id_producto) and 
        valid_int_id(p_id_archivo)) then
        
        set @new_id = func_get_next_producto_imagenes_id();

        insert into tb_producto_imagenes(
            `id`,
            `id_producto`,
            `id_archivo`,
            `principal`
        ) values (
            @new_id,
            p_id_producto,
            p_id_archivo,
            p_principal
        );
    end if;

    select @new_id as 'id';
end $$
delimiter ;

drop procedure if exists `proc_update_producto_imagen_by_id`;
delimiter $$
create procedure proc_update_producto_imagen_by_id(in p_id bigint,
                                                    in p_principal bigint)
begin
    if (valid_int_id(p_id)) then
        update tb_producto_imagenes
        set principal = p_principal
        where id = p_id;
    end if;
end $$
delimiter ;

drop procedure if exists `proc_delete_producto_imagen_by_id`;
delimiter $$
create procedure proc_delete_producto_imagen_by_id(in p_id bigint)
begin
    if (valid_int_id(p_id)) then
        update tb_producto_imagenes
        set eliminado = true,
            fecha_eliminado = current_timestamp()
        where id = p_id;
    end if;
end $$
delimiter ;
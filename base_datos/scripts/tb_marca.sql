/*
drop function if exists func_get_next_marca_id;
delimiter $$
create function func_get_next_marca_id()
returns bigint 
begin
	set @new_id = (select id from tb_marca order by id desc limit 1);
    if (@new_id is null) then
		set @new_id = 0;
    end if;
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;


drop procedure if exists `proc_get_marcas`;
delimiter $$
create procedure proc_get_marcas()
begin
    select m.id,
			m.id_archivo,
            m.nombre,
            m.descripcion,
            m.fecha_creado
    from tb_marca m 
    where eliminado = false
    order by m.nombre asc;
end $$
delimiter ;

drop procedure if exists `proc_get_marca_by_id`;
delimiter $$
create procedure proc_get_marca_by_id(in p_id bigint)
begin
    if (valid_int_id(p_id)) then
        select m.id,
                m.nombre,
                m.id_archivo,
                m.descripcion,
                m.fecha_creado
        from tb_marca m 
        where eliminado = false
        and m.id = p_id;
    end if;
end $$
delimiter ;

drop procedure if exists `proc_add_marca`;
delimiter $$
create procedure proc_add_marca(in p_nombre varchar(200),
                                in p_descripcion text,
                                in p_id_archivo bigint)
begin
    set p_nombre = trim(p_nombre);
    set p_descripcion = trim(p_descripcion);
    set @new_id = null;

    if (!is_empty(p_nombre) and 
        !is_empty(p_descripcion)) then

        set @new_id = func_get_next_marca_id();
        insert into tb_marca(
            `id`,
            `nombre`,
            `descripcion`,
			`id_archivo`)
        values(@new_id,
                p_nombre,
                p_descripcion,
                p_id_archivo);
    end if;

    select @new_id as 'id';
end $$
delimiter ; 

drop procedure if exists `proc_update_marca_by_id`;
delimiter $$
create procedure proc_update_marca_by_id(in p_id bigint,
                                            in p_nombre varchar(200),
                                            in p_descripcion text,
                                            in p_id_archivo bigint)
begin
    if (valid_int_id(p_id)) then
        set p_nombre = trim(p_nombre);
        set p_descripcion = trim(p_descripcion);

        update tb_marca
        set nombre = p_nombre,
            descripcion = p_descripcion,
            id_archivo = p_id_archivo
        where id = p_id;
    end if;
end $$
delimiter ;

drop procedure if exists `proc_delete_marca_by_id`;
delimiter $$
create procedure proc_delete_marca_by_id(in p_id bigint)
begin
    if (valid_int_id(p_id)) then
        update tb_marca
        set eliminado = true,
            fecha_creado = current_timestamp()
        where id = p_id;
    end if;
end $$
delimiter ;
*/


drop procedure if exists `proc_search_marcas`;
delimiter $$
create procedure proc_search_marcas(in p_field varchar(255))
begin
	set p_field = trim(p_field);
    select m.id,
            m.id_archivo,
            m.nombre,
            m.descripcion,
            m.fecha_creado
    from tb_marca m 
    where eliminado = false
    and m.nombre like concat('%',p_field,'%')
    order by m.nombre asc;
end $$
delimiter ;

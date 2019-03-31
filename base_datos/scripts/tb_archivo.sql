

drop function if exists func_get_next_archivo_id;
delimiter $$
create function func_get_next_archivo_id()
returns bigint
begin 
	set @new_id = (select id from tb_archivo order by id desc limit 1);
    if(@new_id is null) then
		set @new_id = 0;
    end if;
    set @new_id = @new_id + 1;
    return @new_id;
end $$
delimiter ;



drop procedure if exists `proc_get_archivos`;
delimiter $$
create procedure proc_get_archivos()
begin
	select a.id,
			a.type,
			a.url,
            a.fecha_creado
    from tb_archivo a
    where a.eliminado = false
    order by a.fecha_creado desc;
end $$
delimiter ;



drop procedure if exists func_get_archivo_by_id;
delimiter $$
create procedure func_get_archivo_by_id(in p_id bigint)
begin
	select a.id,
			a.type,
			a.url,
            a.fecha_creado
    from tb_archivo a
    where a.eliminado = false
    and a.id = p_id;
end $$
delimiter ;



drop procedure if exists `proc_get_archivo_by_url`;
delimiter $$
create procedure proc_get_archivo_by_url(in p_url text)
begin
	set p_url = trim(p_url);
    select a.id,
			a.type,
			a.url,
            a.fecha_creado
    from tb_archivo a
    where a.eliminado = false
    and a.url = p_url;
end $$
delimiter ;



drop procedure if exists `proc_add_archivo`;
delimiter $$
create procedure proc_add_archivo(in p_id_usuario_creador bigint,
									in p_url text,
                                    in p_type varchar(50))
begin
	set p_url = trim(p_url);
    set p_type = remove_spaces(p_type);
    set @new_id = null;
	
    if(!is_empty(p_url) and 
		!is_empty(p_type) and
        valid_int_id(p_id_usuario_creador)) then
        
        set @new_id = func_get_next_archivo_id();
		insert into tb_archivo
				(`id`,
				`id_usuario_creado_por`,
				`url`,
				`type`)
				VALUES
				(@new_id,
				p_id_usuario_creador,
				p_url,
				p_type);
    end if;

	select @new_id as 'id';
end $$
delimiter ;



drop procedure if exists proc_delete_archivo_by_id;
delimiter $$
create procedure proc_delete_archivo_by_id(in p_id bigint)
begin
	if (valid_int_id(p_id)) then
		update tb_archivo 
        set eliminado = false,
			fecha_eliminado = current_timestamp()
        where id = p_id;
    end if;
end $$
delimiter ;





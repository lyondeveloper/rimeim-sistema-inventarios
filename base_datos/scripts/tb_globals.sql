/*
drop procedure if exists proc_get_global_variables;
delimiter $$
create procedure proc_get_global_variables()
begin
	select g.clave,
			g.nombre,
            g.valor
    from tb_globals g 
    where g.eliminado = false 
    order by g.nombre desc;
end $$
delimiter ;
*/

drop function if exists func_get_global_variable_value;
delimiter $$
create function func_get_global_variable_value(p_key varchar(100))
returns varchar(100)
begin
	set @response = (select g.valor
    from tb_globals g 
    where g.eliminado = false 
    and g.clave = p_key);
    
    return @response;
end $$
delimiter ;

/*
drop procedure if exists proc_add_global_variable;
delimiter $$
create procedure proc_add_global_variable(in p_key varchar(100),
										  in p_nombre varchar(100),
                                          in p_valor varchar(100))
begin
	set p_key = trim(p_key);
    set p_nombre = trim(p_nombre);
    set p_valor = trim(p_valor);
    
    if (!is_empty(p_key) and
		!is_empty(p_nombre) and 
        !is_empty(p_valor)) then 
		INSERT INTO `tb_globals`
					(`clave`,
					`nombre`,
					`valor`)
					VALUES
					(p_key,
					p_nombre,
					p_valor);
    end if;
end $$
delimiter ;
*/

/*
drop procedure if exists proc_update_global_variable;
delimiter $$
create procedure proc_update_global_variable(in p_key varchar(100),
											in p_valor varchar(100))
begin
	set p_key = trim(p_key);
    set p_valor = trim(p_valor);
    
    if (!is_empty(p_key) and 
		!is_empty(p_valor)) then 
		update tb_globals
        set valor = p_valor
        where clave = p_key
        and eliminado = false;
    end if;
end $$
delimiter ;


drop procedure if exists proc_delete_global_variable;
delimiter $$
create procedure proc_delete_global_variable(in p_key varchar(100))
begin
	update tb_globals
    set eliminado = true
    where clave = p_key;
end $$
delimiter ;
*/

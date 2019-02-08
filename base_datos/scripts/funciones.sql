

/*
drop function if exists is_empty;
delimiter $$
create function is_empty(p_string text)
returns bool
begin
	set @r_response = true;
    
    if(p_string is not null and 
		trim(p_string) != "") then
		set @r_response = false;
    end if;
    
    return @r_response;
end $$
delimiter ;
*/

/*
drop function if exists remove_spaces;
delimiter $$
create function remove_spaces(p_text text)
returns text
begin
	if (p_text is not null) then
        set p_text = replace(p_text, '\t', '');
        set p_text = replace(p_text, '\n', '');
        set p_text = replace(p_text, ' ', '');
    end if;
	return p_text;
end $$
delimiter ;
*/

/*
drop function if exists trim_and_lower;
delimiter $$
create function trim_and_lower(p_texto text)
returns text
begin
	if(p_texto is not null) then
		set p_texto = lower(trim(p_texto));
    end if;
	return p_texto;
end $$
delimiter ;
*/

/*
drop function if exists default_bool_value;
delimiter $$
create function default_bool_value(p_var boolean, p_default boolean)
returns bool
begin
	if(p_default is not null and
		p_var is null) then
		set p_var = p_default;
    elseif (p_var is null) then
		set p_var = false;
    end if;
	return p_var;
end $$
delimiter ;
*/

/*
drop function if exists get_next_tb_usario_id;
delimiter $$
create function get_next_tb_usario_id()
returns bigint
begin
	set @new_id = (select id from tb_usuario order by id desc limit 1);
    if(@new_id is null) then
		set @new_id = 1;
	else 
		set @new_id = @new_id + 1;
    end if;
    return @new_id;
end $$
delimiter ;
*/

/*
drop function if exists valid_int_id;
delimiter $$
create function valid_int_id(p_value bigint)
returns boolean
begin
	set @r_response = !(p_value is null or 
						p_value <= 0);
    return @r_response;
end $$
delimiter ;
*/




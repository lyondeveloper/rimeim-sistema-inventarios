

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

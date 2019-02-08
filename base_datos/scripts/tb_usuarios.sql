/*
drop procedure if exists `proc_nuevo_usuario`;
delimiter $$
create procedure proc_nuevo_usuario(in p_nombre varchar(200),
									in p_nombre_usuario varchar(100),
									in p_correo varchar(200),
                                    in p_clave varchar(255),
                                    in p_admin boolean,
                                    in p_id_usuario_agregado_por bigint(20))
begin
	set p_nombre = trim_and_lower(p_nombre);
    set p_nombre_usuario = trim_and_lower(p_nombre_usuario);
    set p_correo = trim_and_lower(p_correo);
    set p_admin = default_bool_value(p_admin, false);
    
    set @new_id = get_next_tb_usario_id();
    
    INSERT INTO `db_rimeim`.`tb_usuario`
				(`id`,
				`id_usuario_creado_por`,
				`nombre`,
				`nombre_usuario`,
				`correo`,
				`clave`,
				`admin`)
				VALUES
				(@new_id,
				p_id_usuario_agregado_por,
				p_nombre,
				p_nombre_usuario,
				p_correo,
				p_clave,
				p_admin);

    select @new_id as 'id';
end $$
delimiter ;
*/

/*
drop procedure if exists `proc_borrar_usuario_by_id`;
delimiter $$
create procedure proc_borrar_usuario_by_id(in p_id bigint,
											in p_id_usuario_eliminado_por bigint)
begin
	set @r_success = false;
    
    if (valid_int_id(p_id) and 
		valid_int_id(p_id_usuario_eliminado_por)) then
        UPDATE `db_rimeim`.`tb_usuario` SET
		`id_usuario_eliminado_por` = p_id_usuario_eliminado_por,
		`habilitado` = false,
		`eliminado` = false,
		`fecha_eliminado` = current_timestamp()
		WHERE `id` = p_id;
		
        set @r_success = true;
    end if;
    
    select @r_success as 'success';
end $$
delimiter ;
*/


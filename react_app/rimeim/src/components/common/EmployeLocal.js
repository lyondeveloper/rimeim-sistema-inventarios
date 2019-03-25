import React from 'react'

export default function EmployeLocal(props) {
    const {
        onDelete,
        onEdit,
        handleShow,
        registro: {
            id,
            admin,
            habilitado,
            fecha_creado,
            local,
            usuario_creador,
            is_showing
        }
    } = props
    return (
        <div className="d-block bordered p-1 mb-1">
            <div>
                <div className="circle-local left" style="background-color: red;"></div>
                <span>{local.nombre}</span>
                <i className="right material-icons cursor-pointer m3x"
                    onClick={handleShow.bind(this, id)}>
                    {is_showing ? ("arrow_drop_up") : ("arrow_drop_down")}
                </i>
            </div>

            {is_showing && (
                <div className="card">
                    <div className="card-content">
                        <div className="border-bottom" style="padding: 5px;">
                            <span>Admin</span>
                            <span>{admin ? ("Si") : ("No")}</span>
                        </div>
                        <div className="border-bottom" style="padding: 5px;">
                            <span>Habilitado</span>
                            <span>{habilitado ? ("Si") : ("No")}</span>
                        </div>
                        <div className="border-bottom" style="padding: 5px;">
                            <span>Agregado por</span>
                            <span>{usuario_creador.nombre}</span>
                        </div>
                        <div className="border-bottom" style="padding: 5px;">
                            <span>Fecha de inicio</span>
                            <span>{fecha_creado}</span>
                        </div>
                    </div>

                    <div className="card-action">
                        <button className="btn red darken-2" onClick={() => {
                            onDelete(id)
                        }}>
                            Eliminar
                    </button>

                        <button className="btn ml-1 modal-trigger"
                            data-target="modal_editar_empleado"
                            onClick={() => {
                                onEdit(id)
                            }}>
                            Editar
                    </button>
                    </div>
                </div>
            )}
        </div>
    )
}

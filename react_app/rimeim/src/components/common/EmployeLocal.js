import React from 'react'
import PropTypes from 'prop-types'

const EmployeLocal = (props) => {
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
                <div className="circle-local left" style={{ backgroundColor: local.color_hex }}></div>
                <span>{local.nombre}</span>
                <i className="right material-icons cursor-pointer m3x"
                    onClick={() => { handleShow(id) }}>
                    {is_showing ? ("arrow_drop_up") : ("arrow_drop_down")}
                </i>
            </div>

            {is_showing && (
                <div className="card">
                    <div className="card-content">
                        <div className="border-bottom" style={{ padding: '5px' }}>
                            <span>Admin:</span>
                            <span className="ml-1">{admin ? ("Si") : ("No")}</span>
                        </div>
                        <div className="border-bottom" style={{ padding: '5px' }}>
                            <span>Habilitado:</span>
                            <span className="ml-1">{habilitado ? ("Si") : ("No")}</span>
                        </div>
                        <div className="border-bottom" style={{ padding: '5px' }}>
                            <span>Agregado por:</span>
                            <span className="ml-1">{usuario_creador.nombre}</span>
                        </div>
                        <div className="border-bottom" style={{ padding: '5px' }}>
                            <span>Fecha de inicio: </span>
                            <span className="ml-1">{fecha_creado}</span>
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

EmployeLocal.propTypes = {
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    handleShow: PropTypes.func.isRequired,
    registro: PropTypes.object.isRequired
}

export default EmployeLocal
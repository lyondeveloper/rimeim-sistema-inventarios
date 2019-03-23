import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
    getModalInstanceById
} from "../../../utils/MaterialFunctions"


class ConfirmationModal extends Component {

    closeModal = () => {
        const currentModal = getModalInstanceById(this.props.id)
        currentModal.close()
    }

    onCancelClick = () => {
        if (this.props.onCancel) {
            this.props.onCancel()
        }

        this.closeModal()
    }

    onAcceptClick = () => {
        this.props.onAccept()
        this.closeModal()
    }

    render() {
        const { title, message, id } = this.props
        return (
            <div className="modal" id={id}>
                <div className="modal-content">
                    <h5>{title}</h5>
                    {message && (<p>{message}</p>)}
                </div>
                <div className="modal-footer">
                    <a href="#!" className="btn-flat left" onClick={this.onCancelClick}>Cancelar</a>
                    <button
                        className="btn right red darken-2"
                        onClick={this.onAcceptClick}>
                        Aceptar
                    </button>
                </div>
            </div>
        )
    }
}

ConfirmationModal.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onAccept: PropTypes.func.isRequired,
    onCancel: PropTypes.func
}

ConfirmationModal.defaultProps = {
    message: null,
    id: "modal_confirmar_evento"
}

export default ConfirmationModal
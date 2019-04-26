import React, { Component } from 'react'
import TextInputField from "../../common/TextInputField"
import PropTypes from 'prop-types'

class SearchModal extends Component {
    state = {
        termino_busqueda: ""
    }

    onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

    onSearch = () => {
        const { termino_busqueda } = this.state
        this.props.onSearchAction(termino_busqueda)
    }

    render() {
        const { termino_busqueda } = this.state
        return (
            <div className="modal" id="modal_search">
                <div className="modal-content">
                    <div className="row">
                        <TextInputField id="termino_busqueda"
                            value={termino_busqueda}
                            onchange={this.onChangeTextInput} />
                    </div>
                </div>

                <div className="modal-footer">
                    <a href="#!" className="modal-close btn-flat left">Cerrar</a>
                    <a href="#!" className="modal-close btn" onClick={this.onSearch}>Buscar</a>
                </div>
            </div>
        )
    }
}

SearchModal.propTypes = {
    onSearchAction: PropTypes.func.isRequired
}

export default SearchModal
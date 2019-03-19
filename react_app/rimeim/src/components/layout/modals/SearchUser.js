import React, { Component } from 'react'
import TextFieldInput from "../../common/TextInputField"

class SearchUser extends Component {
    state = {
        usuario: "",
        usuario_seleccionado: {},
        results: []
    }

    onSelectUser = (user) => {

    }

    onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { results, usuario } = this.state
        return (
            <div className="modal" id="modal_buscar_usuario">
                <div className="modal-content">
                    <h5>Buscar usuario</h5>
                    <div className="row">
                        <TextFieldInput
                            id="usuario"
                            label="ID o nombre del usuario"
                            value={usuario}
                            onchange={this.onChangeTextInput} />
                    </div>
                    <div className="row">
                        <div className="col s12">
                            {results.map((usuario, i) => {
                                return (
                                    <div className="d-block cursor-pointer"
                                        key={usuario.id}
                                        onClick={() => { this.onSelectUser(usuario) }}>
                                        {usuario.id} - {usuario.nombre}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat left">Cerrar</a>
                </div>
            </div>
        )
    }
}


export default SearchUser
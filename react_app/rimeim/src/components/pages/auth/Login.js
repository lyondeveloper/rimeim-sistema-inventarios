import React, { Component } from 'react'
import TextInputField from '../../inputfields/TextInputField'

import img_logo from '../../../public/img/logo_rimeim.png'

class Login extends Component {

    state = {
        usuario: "",
        clave: ""
    }

    onSubmitEvent = (e) => {
        e.preventDefault()
        console.log(this.state)
    }

    onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { usuario, clave } = this.state

        return (
            <div className="container">
                <div className="valign-wrapper minh-100">
                    <div className="row">
                        <div className="col ">
                            <div className="row">
                                <div className="col s12">
                                    <img src={img_logo} alt="Rimeim logo" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <form onSubmit={this.onSubmitEvent} className="white bordered p-1 border-radius-1 hoverable minw-300px ">
                                        <div className="row">
                                            <TextInputField id="usuario"
                                                label="Usuario o correo electronico"
                                                icon="account_circle"
                                                onchange={this.onChangeTextInput}
                                                value={usuario} />
                                        </div>
                                        <div className="row">
                                            <TextInputField id="clave"
                                                label="Clave"
                                                icon="lock"
                                                type="password"
                                                onchange={this.onChangeTextInput}
                                                value={clave} />
                                        </div>
                                        <div>
                                            <button className="btn waves-effect waveslight btn-block red darken-1" type="submit">
                                                Aceptar
                                            </button>
                                            <button className="btn-flat waves-effect waveslight btn-block mt-1" type="button"
                                            >
                                                ¿Olvido su clave?
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
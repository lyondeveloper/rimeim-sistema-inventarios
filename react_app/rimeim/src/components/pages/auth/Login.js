import React, { Component } from 'react'
import TextInputField from '../../common/TextInputField'
import ButtonField from "../../common/ButtonField"

import img_logo from '../../../public/img/logo_rimeim.png'
import axios from 'axios';

class Login extends Component {

    state = {
        user: "",
        password: "",
        errors: {}
    }

    onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

    onSubmitEvent = (e) => {
        e.preventDefault()
        const { user, password } = this.state
        axios.post('http://localhost/api/users/login',
            { user, password }/*,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }*/)
            .then(response => {
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
    }

    forgotPassword = () => {
        this.setState({
            errors: {}
        })
    }

    render() {
        const {
            user, password,
            errors: { user_error, password_error }
        } = this.state

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
                                            <TextInputField id="user"
                                                label="Usuario o correo electronico"
                                                icon="account_circle"
                                                onchange={this.onChangeTextInput}
                                                value={user}
                                                error={user_error}
                                                required />
                                        </div>
                                        <div className="row">
                                            <TextInputField id="password"
                                                label="Clave"
                                                icon="lock"
                                                type="password"
                                                onchange={this.onChangeTextInput}
                                                value={password}
                                                error={password_error}
                                                required />
                                        </div>

                                        <ButtonField text="Aceptar"
                                            className="btn waves-effect waveslight btn-block red darken-1"
                                            type="submit" />

                                        <ButtonField text="¿Olvido su clave?"
                                            className="btn-flat waves-effect waveslight btn-block mt-1"
                                            onClick={this.forgotPassword} />
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
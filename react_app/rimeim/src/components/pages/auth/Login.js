import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Custom Components
import Spinner from "../../common/Spinner"
import TextInputField from '../../common/TextInputField'
import ButtonField from "../../common/ButtonField"

import img_logo from '../../../public/img/logo_rimeim.png'

// Functions
import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

import { loginUser } from '../../../actions/UserActions'


class Login extends Component {

    state = {
        isInRequest: false,
        user: "",
        password: "",
        errors: {}
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

    onSubmitEvent = (e) => {
        e.preventDefault()
        this.setState({
            isInRequest: true
        })
        const userData = {
            user: this.state.user,
            password: this.state.password
        }
        this.props.loginUser(userData)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isInRequest: false
        })
        if (nextProps.auth.isLoggedIn) {
            this.setState({ errors: {} })
            if (nextProps.auth.user.isAdmin ||
                nextProps.auth.user.locals.length > 1) {
                this.props.history.push('/seleccionar_local')
            } else {
                this.props.history.push('/nueva_venta')
            }
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        } else {
            this.setState({ errors: {} })
        }
    }

    forgotPassword = () => { }

    render() {
        const {
            user, password, isInRequest,
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

                                        {isInRequest && (<Spinner fullWidth extraClass="p-1" />)}

                                        <div className="row">
                                            <TextInputField id="user"
                                                label="Usuario o correo electronico"
                                                icon="account_circle"
                                                onchange={this.onChangeTextInput}
                                                value={user}
                                                error={user_error}
                                                disabled={isInRequest}
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
                                                disabled={isInRequest}
                                                required />
                                        </div>

                                        <ButtonField text="Aceptar"
                                            className="btn waves-effect waveslight btn-block red darken-1"
                                            type="submit"
                                            disabled={isInRequest} />

                                        <ButtonField text="¿Olvido su clave?"
                                            className="btn-flat waves-effect waveslight btn-block mt-1"
                                            onClick={this.forgotPassword}
                                            disabled={isInRequest} />
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { loginUser })(Login)
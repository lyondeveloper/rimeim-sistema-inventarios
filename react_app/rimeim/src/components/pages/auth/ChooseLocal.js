import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Custom components
import logo_rimeim from "../../../public/img/logo_rimeim.png"
import ButtonField from "../../common/ButtonField"
import Spinner from "../../common/Spinner"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

// Functions
import {
    setCurrentLocal,
    getLocalsForCurrentUser
} from "../../../actions/UserActions"

import isEmpty from "../../../actions/isEmpty"
import redirect from "../../../utils/redirect"

class ChooseLocal extends Component {

    state = {
        isInRequest: true
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
        this.props.getLocalsForCurrentUser()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isInRequest: false
        })
        const { currentLocal } = nextProps.user

        if (!isEmpty(currentLocal)) {
            if (currentLocal.id === 0) {
                redirect(this.props, '/admin_area')
            } else {
                redirect(this.props, '/nueva_venta')
            }
        }

    }

    onSelectLocal = (local) => {
        this.props.setCurrentLocal(local)
    }

    onSelectAdminArea = () => {
        this.props.setCurrentLocal({
            id: 0,
            name: 'Administracion'
        })
    }

    render() {
        if (this.state.isInRequest) {
            return (
                <div className="container">
                    <div className="valign-wrapper minh-100">
                        <div className="row">
                            <div className="col s12 center">
                                <img src={logo_rimeim} alt="" />
                                <Spinner fullWidth />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        const { user: { admin }, locals } = this.props.user
        return (
            <div className="container">
                <div className="valign-wrapper minh-100">
                    <div className="row">
                        <div className="col s12 center">

                            <img src={logo_rimeim} alt="" />

                            <div className="card">
                                <div className="card-content">
                                    <h5 className="text-center">Seleccione un lugar de trabajo</h5>

                                    {locals.map(local => (
                                        <ButtonField text={local.nombre}
                                            className="btn btn-block mb-1 red darken-1 text-white"
                                            key={local.id}
                                            onClick={() => { this.onSelectLocal(local) }} />
                                    ))}

                                    {admin && (
                                        <ButtonField text="Administracion"
                                            className="btn btn-block red darken-1 text-white"
                                            icon="trending_up"
                                            onClick={this.onSelectAdminArea} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ChooseLocal.propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    setCurrentLocal: PropTypes.func.isRequired,
    getLocalsForCurrentUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    errors: state.errors
})

export default connect(mapStateToProps, {
    setCurrentLocal,
    getLocalsForCurrentUser
})(ChooseLocal)
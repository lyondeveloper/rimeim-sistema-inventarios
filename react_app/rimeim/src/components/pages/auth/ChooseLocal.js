import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import logo_rimeim from "../../../public/img/logo_rimeim.png"

import ButtonField from "../../common/ButtonField"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

class ChooseLocal extends Component {

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    onSelectLocal = (local) => {

    }

    onSelectAdminArea = () => {

    }

    render() {
        const { user: { isAdmin, locales } } = this.props.auth
        return (
            <div className="container">
                <div className="valign-wrapper minh-100">
                    <div className="row">
                        <div className="col s12 center">

                            <img src={logo_rimeim} alt="" />

                            <div className="card">
                                <div className="card-content">
                                    <h5 className="text-center">Seleccione un lugar de trabajo</h5>

                                    {locales.map(local => (
                                        <ButtonField text={local.nombre}
                                            className="btn btn-block mb-1 red darken-1 text-white"
                                            key={local.id}
                                            onClick={() => { this.onSelectLocal(local) }} />
                                    ))}

                                    {isAdmin && (
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
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {})(ChooseLocal)
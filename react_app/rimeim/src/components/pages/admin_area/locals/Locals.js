import React, { Component } from 'react'
import { connect } from "react-redux"
import PropTypes from 'prop-types'

import { ADMIN_LOCALS } from "../../../layout/NavTypes"
import NavbarAdmin from "../../../layout/NavbarAdmin"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../../utils/MaterialFunctions"

import {
    getLocals
} from "../../../../actions/LocalActions"

import Spinner from "../../../common/Spinner"
import LocalCard from "../../../common/LocalCard"

class Locals extends Component {

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
        this.props.getLocals()
    }

    render() {
        const { locals, loading } = this.props.local
        return (
            <React.Fragment>
                <NavbarAdmin navtype={ADMIN_LOCALS} />

                <main>
                    <div className="row">
                        {loading ? (
                            <Spinner fullWidth />
                        ) : (
                                locals.map(local =>
                                    <div className="col s12 m6 l4" key={local.id}>
                                        <LocalCard local={local} />
                                    </div>
                                )
                            )}
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

Locals.propTypes = {
    local: PropTypes.object.isRequired,
    getLocals: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    local: state.local
})

export default connect(mapStateToProps, {
    getLocals
})(Locals)
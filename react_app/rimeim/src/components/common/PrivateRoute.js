import React from "react";
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import isEmpty from "../../actions/isEmpty"

const PrivateRoute = ({ component: Component, isSelectLocal, user, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            user.isLoggedIn === true ? (

                // Si no esta en el componente ChooseLocal y ya tiene un local definido
                (!isSelectLocal && !isEmpty(user.currentLocal)) ? (
                    <Component {...props} />
                ) : (
                        // Si esta seleccionando un local (Solo ChooseLocal lo posee)
                        isSelectLocal ? (
                            <Component {...props} />
                        ) : (
                                <Redirect to="/seleccionar_local" />
                            )

                    )
            ) : (
                    <Redirect to="/login" />
                )
        }
    />
);

PrivateRoute.propTypes = {
    user: PropTypes.object.isRequired,
    isSelectLocal: PropTypes.bool.isRequired
};

PrivateRoute.defaultProps = {
    user: { isLoggedIn: false },
    isSelectLocal: false
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);
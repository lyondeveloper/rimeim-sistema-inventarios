import React from "react";
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import isEmpty from "../../actions/isEmpty"

const PrivateRoute = ({ component: Component,
    isSelectLocal,
    isAdminRoute,
    user,
    ...rest }) => (
        <Route
            {...rest}
            render={props =>
                user.isLoggedIn === true ? (

                    // Si no esta en el componente ChooseLocal y ya tiene un local definido
                    (!isSelectLocal && !isEmpty(user.currentLocal)) ? (

                        // Si es un view para aministrador
                        isAdminRoute ? (
                            // Si es un administrador
                            user.user.admin ? (
                                <Component {...props} />
                            ) : (<Redirect to="/seleccionar_local" />)
                        ) : ( // No es un view para admin
                                <Component {...props} />
                            )
                    ) : (
                            // Si esta seleccionando un local en ChooseLocal (Solo ChooseLocal lo posee)
                            isSelectLocal ? (
                                <Component {...props} />
                            ) : (
                                    // No tiene un local definido, debe elegir uno
                                    <Redirect to="/seleccionar_local" />
                                )

                        )
                ) : ( // Usuario no loggeado
                        <Redirect to="/login" />
                    )
            }
        />
    );

PrivateRoute.propTypes = {
    user: PropTypes.object.isRequired,
    isSelectLocal: PropTypes.bool.isRequired,
    isAdminRoute: PropTypes.bool.isRequired
};

PrivateRoute.defaultProps = {
    user: { isLoggedIn: false },
    isSelectLocal: false,
    isAdminRoute: false
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);
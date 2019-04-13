import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createClient, editClient } from '../../../actions/clientActions';

import { NEW_CLIENT } from '../../layout/NavTypes';
import Navbar from '../../layout/Navbar';

import { withRouter } from 'react-router-dom';

import LogoRimeim from '../../../public/img/logo_rimeim.png';

import {
    configMaterialComponents,
    removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import TextInputField from '../../common/TextInputField';
import CheckInputField from '../../common/CheckInputField';

class NewClient extends Component {
    state = {
        nombre: '',
        rtn: '',
        correo: '',
        contacto: '',
        telefono: '',
        codigo: '',
        es_empresa: false,
        editMode: false
    };

    componentWillMount() {
        removeMaterialComponents();
    }

    componentDidMount() {
        configMaterialComponents();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    onChangeTextInput = e => {
        if (e.target.name === 'es_empresa') {
            const value = this.state.es_empresa ? false : true;
            return this.setState({ [e.target.name]: value });
        }
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newClient = {
            nombre: this.state.nombre,
            rtn: this.state.rtn,
            correo: this.state.correo,
            contacto: this.state.contacto,
            es_empresa: this.state.es_empresa
        };

        console.log(newClient);

        this.props.createClient(newClient, this.props.history, '/login');
    };

    render() {
        const {
            nombre,
            rtn,
            correo,
            contacto,
            telefono,
            codigo,
            es_empresa
        } = this.state;
        return (
            <React.Fragment>
                <Navbar navtype={NEW_CLIENT} />
                <main>
                    <div className='row'>
                        <div className='col s12'>
                            <div className='card '>
                                <div className='card-content'>
                                    <div className='row'>
                                        <div className='col s12 m12 center'>
                                            <img
                                                src={LogoRimeim}
                                                className='responsive-img bordered'
                                                alt=''
                                            />
                                            <div className='d-block'>
                                                <button className='btn'>
                                                    Cambiar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col s12 m12'>
                                            <form onSubmit={this.onSubmit}>
                                                <div className='row'>
                                                    <TextInputField
                                                        id='nombre'
                                                        label='Nombre'
                                                        onchange={
                                                            this
                                                                .onChangeTextInput
                                                        }
                                                        value={nombre}
                                                    />
                                                </div>
                                                <div className='row'>
                                                    <TextInputField
                                                        id='rtn'
                                                        label='RTN'
                                                        onchange={
                                                            this
                                                                .onChangeTextInput
                                                        }
                                                        value={rtn}
                                                    />
                                                </div>

                                                <div className='row'>
                                                    <TextInputField
                                                        id='correo'
                                                        type='email'
                                                        label='Correo'
                                                        onchange={
                                                            this
                                                                .onChangeTextInput
                                                        }
                                                        value={correo}
                                                    />
                                                </div>
                                                <div className='row'>
                                                    <TextInputField
                                                        id='contacto'
                                                        label='Contacto'
                                                        onchange={
                                                            this
                                                                .onChangeTextInput
                                                        }
                                                        value={contacto}
                                                    />
                                                </div>
                                                <div className='row'>
                                                    <TextInputField
                                                        id='telefono'
                                                        label='Telefono'
                                                        onchange={
                                                            this
                                                                .onChangeTextInput
                                                        }
                                                        value={telefono}
                                                    />
                                                </div>
                                                <div className='row'>
                                                    <TextInputField
                                                        id='codigo'
                                                        label='Codigo'
                                                        onchange={
                                                            this
                                                                .onChangeTextInput
                                                        }
                                                        value={codigo}
                                                    />
                                                </div>
                                                <div className='row'>
                                                    <CheckInputField
                                                        id='es_empresa'
                                                        checked={es_empresa}
                                                        onchange={
                                                            this
                                                                .onChangeTextInput
                                                        }
                                                        label='Es empresa'
                                                    />
                                                </div>

                                                <div className='d-block center'>
                                                    <button
                                                        className='btn center'
                                                        type='submit'
                                                    >
                                                        Guardar
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    clients: state.clients,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { createClient, editClient }
)(withRouter(NewClient));

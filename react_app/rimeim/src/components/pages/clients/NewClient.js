import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    createClient,
    editClient,
    getClient
} from '../../../actions/clientActions';

import { NEW_CLIENT } from '../../layout/NavTypes';
import Navbar from '../../layout/Navbar';

import { withRouter } from 'react-router-dom';

import LogoRimeim from '../../../public/img/logo_rimeim.png';

import isEmpty from '../../../actions/isEmpty';

import {
    configMaterialComponents,
    removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import Spinner from '../../common/Spinner';

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
        es_empresa: false
    };

    componentWillMount() {
        removeMaterialComponents();
    }

    componentDidMount() {
        configMaterialComponents();
        const { id } = this.props.match.params;
        if (id) this.props.getClient(id);
    }

    componentWillReceiveProps(nextProps) {
        const { client } = nextProps.clients;

        if (client) {
            client.nombre = !isEmpty(client.nombre) ? client.nombre : '';
            client.rtn = !isEmpty(client.rtn) ? client.rtn : '';
            client.correo = !isEmpty(client.correo) ? client.correo : '';
            client.contacto = !isEmpty(client.contacto) ? client.contacto : '';
            client.telefono = !isEmpty(client.telefono) ? client.telefono : '';
            client.codigo = !isEmpty(client.codigo) ? client.codigo : '';
            client.es_empresa = !isEmpty(client.es_empresa)
                ? client.es_empresa
                : '';

            this.setState({
                nombre: client.nombre,
                rtn: client.rtn,
                correo: client.correo,
                contacto: client.contacto,
                telefono: client.telefono,
                codigo: client.codigo,
                es_empresa: client.es_empresa
            });
        }
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

        const { id } = this.props.match.params;

        const clientData = {
            nombre: this.state.nombre,
            rtn: this.state.rtn,
            correo: this.state.correo,
            contacto: this.state.contacto,
            telefono: this.state.telefono,
            codigo: this.state.codigo,
            es_empresa: this.state.es_empresa
        };

        if (this.props.match.params.id)
            this.props.editClient(
                clientData,
                id,
                this.props.history,
                '/clientes'
            );
        else
            this.props.createClient(
                clientData,
                this.props.history,
                '/clientes'
            );
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

        const { loading, client } = this.props.clients;

        const { id } = this.props.match.params;

        let formContent;

        if (loading) {
            formContent = <Spinner fullWidth />;
        } else {
            formContent = (
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
                                                        this.onChangeTextInput
                                                    }
                                                    value={nombre}
                                                    active_label={
                                                        id ? true : false
                                                    }
                                                />
                                            </div>
                                            <div className='row'>
                                                <TextInputField
                                                    id='rtn'
                                                    label='RTN'
                                                    onchange={
                                                        this.onChangeTextInput
                                                    }
                                                    value={rtn}
                                                    active_label={
                                                        id ? true : false
                                                    }
                                                />
                                            </div>

                                            <div className='row'>
                                                <TextInputField
                                                    id='correo'
                                                    type='email'
                                                    label='Correo'
                                                    onchange={
                                                        this.onChangeTextInput
                                                    }
                                                    value={correo}
                                                    active_label={
                                                        id ? true : false
                                                    }
                                                />
                                            </div>
                                            <div className='row'>
                                                <TextInputField
                                                    id='contacto'
                                                    label='Contacto'
                                                    onchange={
                                                        this.onChangeTextInput
                                                    }
                                                    value={contacto}
                                                    active_label={
                                                        id ? true : false
                                                    }
                                                />
                                            </div>
                                            <div className='row'>
                                                <TextInputField
                                                    id='telefono'
                                                    label='Telefono'
                                                    onchange={
                                                        this.onChangeTextInput
                                                    }
                                                    value={telefono}
                                                    active_label={
                                                        id ? true : false
                                                    }
                                                />
                                            </div>
                                            <div className='row'>
                                                <TextInputField
                                                    id='codigo'
                                                    label='Codigo'
                                                    onchange={
                                                        this.onChangeTextInput
                                                    }
                                                    value={codigo}
                                                    active_label={
                                                        id ? true : false
                                                    }
                                                />
                                            </div>
                                            <div className='row'>
                                                <CheckInputField
                                                    id='es_empresa'
                                                    checked={es_empresa}
                                                    onchange={
                                                        this.onChangeTextInput
                                                    }
                                                    label='Es empresa'
                                                    active_label={
                                                        id ? true : false
                                                    }
                                                />
                                            </div>

                                            <div className='d-block center'>
                                                <button
                                                    className='btn center'
                                                    type='submit'
                                                >
                                                    {id
                                                        ? 'Actualizar'
                                                        : 'Guardar'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <React.Fragment>
                <Navbar navtype={NEW_CLIENT} />
                <main>{formContent}</main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    clients: state.client,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { createClient, editClient, getClient }
)(withRouter(NewClient));

import React, { Component } from 'react';

import { SEARCH_CLIENT } from '../../layout/NavTypes';
import Navbar from '../../layout/Navbar';

import ClientCard from '../../common/ClientCard';

import Spinner from '../../common/Spinner';

import {
    configMaterialComponents,
    removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import { searchClient } from '../../../actions/clientActions';

import { connect } from 'react-redux';

import SearchClientModel from '../../layout/modals/SearchClientModel';

class SearchClient extends Component {
    state = {
        field: '',
        searching: false
    };

    componentWillMount() {
        removeMaterialComponents();
    }

    componentDidMount() {
        configMaterialComponents();
    }

    onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

    onSearch = e => {
        e.preventDefault();
        this.setState({
            searching: true
        });
        this.props.searchClient(this.state.field);
    };

    render() {
        const { field, searching } = this.state;

        const { clients, loading } = this.props.clients;

        let searchContent;

        if (loading) {
            searchContent = <Spinner fullWidth />;
        } else {
            if (clients.length <= 0 && !loading)
                searchContent = <h1>No hay clientes</h1>;
            else {
                searchContent = clients.map((client, index) => (
                    <div className='col s12 m6 l4'>
                        <ClientCard client={client} key={client.id} />
                    </div>
                ));
            }
        }
        return (
            <React.Fragment>
                <Navbar navtype={SEARCH_CLIENT} />
                <main>
                    <SearchClientModel
                        onsearch={this.onSearch}
                        onchange={this.onChangeTextInput}
                        values={{ field }}
                    />
                    {searching ? searchContent : ''}
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    clients: state.client
});

export default connect(
    mapStateToProps,
    { searchClient }
)(SearchClient);

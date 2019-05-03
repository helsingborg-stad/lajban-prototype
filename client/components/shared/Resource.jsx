import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Resource extends Component {
    state = { data: {} };

    static propTypes = {
        endpoint: PropTypes.string.isRequired,
        method: PropTypes.string.isRequired,
        render: PropTypes.func.isRequired,
        headers: PropTypes.object,
        body: PropTypes.object,
        onMount: PropTypes.func,
        onUnmount: PropTypes.func,
    };

    static defaultProps = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    componentDidMount() {
        const { endpoint, method, headers, body, onMount } = this.props;

        if (typeof onMount !== 'undefined') {
            onMount();
        }

        const params = {};

        params.method = method;

        if (typeof body === 'object' && Object.keys(body).length > 0) {
            params.body = JSON.stringify(body);
        }

        if (typeof headers === 'object' && Object.keys(headers).length > 0) {
            params.headers = headers;
        }

        fetch(endpoint, params)
            .then(response => response.json())
            .then(json => {
                this.setState({ data: json });
            });
    }

    componentWillUnmount() {
        const { onUnmount } = this.props;

        if (typeof onUnmount !== 'undefined') {
            onUnmount();
        }
    }

    render() {
        const { data } = this.state;
        const { render } = this.props;

        return (
            <div>
                {typeof render === 'function' &&
                typeof data === 'object' &&
                Object.keys(data).length > 0
                    ? render(data)
                    : null}
            </div>
        );
    }
}
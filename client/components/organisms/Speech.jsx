import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Howl, Howler } from 'howler';

const DISABLE_SPEECH = false;

export default class Speech extends Component {
    state = {
        audio: '',
    };

    static propTypes = {
        text: PropTypes.string.isRequired,
        onEnd: PropTypes.func,
    };

    componentDidMount() {
        const { text, onEnd } = this.props;

        if (DISABLE_SPEECH) {
            setTimeout(typeof onEnd === 'function' ? onEnd : () => {}, 1000);
            return;
        }

        text2Speech(text).then(response => {
            const { audioContent } = response;

            const audio = new Howl({
                src: `data:audio/mp3;base64,${audioContent}`,
                onend: typeof onEnd !== 'undefined' ? onEnd : () => {},
            });

            this.setState((state, props) => {
                audio.play();
                return { audio: audio };
            });
        });
    }

    componentWillUnmount() {
        const { audio } = this.state;

        if (typeof audio === 'object') {
            // Pause audio
            audio.pause();
        }
    }

    render() {
        return <div />;
    }
}

const text2Speech = async text => {
    const url = '/api/v1/text2speech';
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: text,
        }),
    };

    return fetch(url, params)
        .then(response => {
            // console.log(response);
            return response.json();
        })
        .then(json => {
            // console.log(json);

            return json;
        });
};

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

export default class Clock extends Component {
    render() {
        return (
            <div className="grid-container">
                <Grid container spacing={32} />
            </div>
        );
    }
}
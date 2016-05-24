import React from 'react';
import {
    Route
} from 'react-router';
import Index from './container/index.jsx';


export default [
    <Route path="/" component={Index} key="index" />,
    <Route path="/:date/:phone" component={Index} key="testing" />
];

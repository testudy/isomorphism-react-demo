'use strict';

const path = require('path');


let config = {

    title: 'Tea',
    env: 'production',
    appName: 'TEA',
    port: 18080,
    viewDir: path.join(__dirname, '..', 'view'),
    logDir: path.join(__dirname, '..', 'log'),
    staticDir: path.join(__dirname, '..', 'dist'),

};


module.exports = config;

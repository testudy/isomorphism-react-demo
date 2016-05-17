'use strict';

const path = require('path');


let config = {

    title: 'Tea',
    env: 'production',
    appName: 'TEA',
    port: 18080,
    viewDir: path.join(__dirname, '..'),
    logDir: path.join(__dirname, '..', 'log'),
    feStaticDir: path.join(__dirname, '..', 'frontend/dist'),
    beStaticDir: path.join(__dirname, '..', 'backend/dist'),

};


module.exports = config;

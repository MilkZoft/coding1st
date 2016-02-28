'use strict';

var fs = require('fs');
var yaml = require('js-yaml');
var environment = require('./environment');
var config = yaml.safeLoad(fs.readFileSync($rootPath('/config/config.yml'), 'utf-8'));

module.exports = getConfig;

/**
 * Returns the selected environment configuration
 */
function getConfig() {
    return config[environment().name] || {};
}

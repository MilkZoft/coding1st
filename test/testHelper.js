'use strict';

var fs = require('fs');
var rewire = require('rewire');

global.sinon = require('sinon');
global.assert = require('chai').assert;
global.$config = rewire(__dirname + '/../src/lib/config');

module.exports = {
    rewireFromProjectRoot: function(relativePath) {
        return rewire(__dirname + '/../src/' + relativePath);
    },

    loadFixtureJSONRaw: function(filename) {
        return fs.readFileSync(__dirname + '/fixtures/' + filename, 'utf8');
    },

    loadFixtureJSON: function(filename) {
        return JSON.parse(this.loadFixtureJSONRaw(filename));
    }
};

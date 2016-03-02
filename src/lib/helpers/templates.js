'use strict';

var _ = require('lodash');
var renderOptions = {};
var defaultOptions = {};

module.exports = (req, res, next) => {
    res.renderScope = {
        default: defaultScope,
        get: get,
        set: set
    };

    next();

    function defaultScope(scope) {
        defaultOptions = scope;
        renderOptions = _.cloneDeep(defaultOptions);
    }

    function get(key) {
        var scope;

        if (!key) {
            scope = _.cloneDeep(renderOptions);
            renderOptions = _.cloneDeep(defaultOptions);

            return scope;
        }

        return renderOptions[key] || false;
    }

    function set(key, value) {
        renderOptions[key] = value;
    }
};

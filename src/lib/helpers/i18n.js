'use strict';

var config = require('../config');
var utils = require('./utils');
var _ = require('lodash');

module.exports = {
    load: function(language) {
        var content;

        if (_.includes(config().languages.list, language)) {
            try {
                content = require('../../content/i18n/' + language);
            } catch (e) {
                content = require('../../content/i18n/' + config().languages.default);
            }
        } else {
            content = require('../../content/i18n/' + config().languages.default);
        }

        return content;
    },

    getCurrentLanguage: function(url) {
        var params = utils.getParamsFromUrl(url);

        return _.includes(config().languages.list, params[0]) ? params[0] : config().languages.default;
    },

    getLanguagePath: function(url) {
        var params = utils.getParamsFromUrl(url);

        return _.includes(config().languages.list, params[0]) ? '/' + params[0] : '';
    }
};

'use strict';

/**
 * Dependencies
 */
var config = require('../config');
var utils = require('./utils');
var _ = require('lodash');

/**
 * Exporting methods
 */
module.exports = {
    getCurrentLanguage: getCurrentLanguage,
    getLanguagePath: getLanguagePath,
    load: load
};

/**
 * Gets the current language in the website
 * @param {string} url
 * @returns {string} language (es, en, etc.)
 */
function getCurrentLanguage(url) {
    var params = utils.getParamsFromUrl(url);

    return _.includes(config().languages.list, params[0]) ? params[0] : config().languages.default;
}

/**
 * Gets the language path
 * @param {string} url
 * @returns {string} url with language (/es, /en, etc.)
 */
function getLanguagePath(url) {
    var params = utils.getParamsFromUrl(url);

    return _.includes(config().languages.list, params[0]) ? '/' + params[0] : '';
}

/**
 * Loads a language
 * @param {string} language
 * @returns {object} content
 */
function load(language) {
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
}

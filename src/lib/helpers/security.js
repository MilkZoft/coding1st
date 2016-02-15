'use strict';

/**
 * Dependencies
 */
var config = require('../config');
var crypto = require('crypto');
var salt = config().security.secret;

/**
 * Exporting methods
 */
module.exports = {
    md5: md5,
    sha1: sha1
};

/**
 * Encrypts a string with MD5 Algorithm
 * @param {string} str
 * @returns {string} encrypted hash
 */
function md5(str) {
    return crypto.createHash('md5').update(salt + str.toString()).digest('hex');
}

/**
 * Encrypts a string with SHA-1 Algorithm
 * @param {string} str
 * @returns {string} encrypted hash
 */
function sha1(str) {
    return crypto.createHash('sha1').update(salt + str.toString()).digest('hex');
}


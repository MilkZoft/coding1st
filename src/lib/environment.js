'use strict';

module.exports = getEnvironment;

/**
 * Gets the current environment based on NODE_ENV var.
 */
function getEnvironment() {
    return {
        name: process.env.NODE_ENV ? process.env.NODE_ENV : 'production'
    };
}

'use strict';

var testHelper = require('./../testHelper');
var environment = testHelper.rewireFromProjectRoot('lib/environment');

describe('Environment', function() {
    it('should be an function returning an object', function() {
        assert.typeOf(environment, 'Function', 'environment should export a function');
        assert.typeOf(environment(), 'Object', 'environment() should return an object');
    });

    it('should have a name', function() {
        assert.typeOf(environment().name, 'String', 'environment().name should be a string');
    });

    it('should have name default to \'production\'', function() {
        assert.equal(environment().name, 'production', 'environment().name should be production by default');
    });

    it('should set the value of name to process.env.NODE_ENV if a value exists', function() {
        process.env.NODE_ENV = 'development';
        assert.equal(environment().name, 'development', 'environment().name should be development');

        process.env.NODE_ENV = 'production';
        assert.equal(environment().name, 'production', 'environment().name should be production');
    });
});

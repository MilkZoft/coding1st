'use strict';

var testHelper = require('./../../testHelper');
var utils = testHelper.rewireFromProjectRoot('lib/helpers/utils');

describe('utils', () => {
    it('should be an object', () => {
        assert.typeOf(utils, 'Object', 'utils should be an object');
    });

    describe('#buildJson', () => {
        it('should be a function', () => {
            assert.typeOf(utils.buildJson, 'function', 'buildJson should be a function');
        });

        it('should build a json from vendo content', () => {
            var vendoContent = [
                {
                    keyName: 'site.language',
                    keyValue: 'en'
                },
                {
                    keyName: 'site.title',
                    keyValue: 'Bar'
                },
                {
                    keyName: 'site.meta.abstract',
                    keyValue: 'Foo'
                }
            ];

            var expectedResult = {
                site: {
                    language: 'en',
                    title: 'Bar',
                    meta: {
                        abstract: 'Foo'
                    }
                }
            };

            var actualResult = utils.buildJson(vendoContent);

            assert.deepEqual(
                actualResult,
                expectedResult,
                'actualResult should match expectedResult'
            );
        });
    });

    describe('#clean', () => {
        it('should be a function', () => {
            assert.typeOf(utils.clean, 'function', 'clean should be a function');
        });

        it('should clean a string', () => {
            var str = '<p>Foo</p>';
            var expectedResult = 'Foo';

            assert.isTrue(
                utils.clean(str) === expectedResult,
                'the string should be cleaned'
            );
        });

        it('should return false when the string is undefined', () => {
            var str;

            assert.isFalse(
                utils.clean(str),
                'should return false'
            );
        });
    });

    describe('#day', () => {
        it('should be a function', () => {
            assert.typeOf(utils.day, 'function', 'day should be a function');
        });

        it('should return the current day', () => {
            var actualResult = parseInt(utils.day());

            assert.isTrue(
                actualResult > 0 && actualResult <= 31,
                'should be a valid day'
            );
        });
    });

    describe('#encrypt', () => {
        it('should be a function', () => {
            assert.typeOf(utils.encrypt, 'function', 'encrypt should be a function');
        });

        it('should return a encrypted salted string', () => {
            var expectedResult = '8e72ae9c6dadb1a3fbb8d3a7a12947a2edfd4fbe';
            var actualResult = utils.encrypt('foo');

            assert.isTrue(
                actualResult === expectedResult,
                'should be a hash'
            );
        });
    });

    describe('#isDefined', () => {
        it('should be a function', () => {
            assert.typeOf(utils.isDefined, 'function', 'isDefined should be a function');
        });

        it('should return true if a variable is defined', () => {
            var test = 'Foo';

            assert.isTrue(
                utils.isDefined(test),
                'test variable should be defined'
            );
        });

        it('should return false if a variable is undefined', () => {
            var test;

            assert.isFalse(
                utils.isDefined(test),
                'test variable should be defined'
            );
        });
    });
});

'use strict';

var express = require('express');
var router = express.Router();
var config = require('../lib/config');
var vendoModel = require('../models/vendomatic');
var utils = require('../lib/helpers/utils');
var availableLanguages = config().languages.list.join('|');

/**
 * Vendomatic
 */
router.get('/:language(' + availableLanguages + ').json', function(req, res, next) {
    vendoModel.getVendoContent({
        language: req.params.language
    }, function(vendoContent) {
        if (vendoContent) {
            res.send(utils.buildJson(vendoContent));
        } else {
            res.redirect('/');
        }
    });
});

router.get('/:language(' + availableLanguages + ')', function(req, res, next) {
    vendoModel.getVendoContent({
        language: req.params.language
    }, function(vendoContent) {
        if (vendoContent) {
            res.send(utils.buildJson(vendoContent, true));
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;

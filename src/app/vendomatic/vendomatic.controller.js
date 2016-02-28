'use strict';

var express = require('express');
var router = express.Router();
var vendoModel = require('./vendomatic.model');
var utils = require($rootPath('/lib/helpers/utils'));
var availableLanguages = $config().languages.list.join('|');

/**
 * Vendomatic
 */
router.get('/:language(' + availableLanguages + ').json', (req, res, next) => {
    vendoModel.getVendoContent({
        language: req.params.language
    }, (vendoContent) => {
        if (vendoContent) {
            res.send(utils.buildJson(vendoContent));
        } else {
            res.redirect('/');
        }
    });
});

router.get('/:language(' + availableLanguages + ')', (req, res, next) => {
    vendoModel.getVendoContent({
        language: req.params.language
    }, (vendoContent) => {
        if (vendoContent) {
            res.send(utils.buildJson(vendoContent, true));
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;

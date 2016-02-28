'use strict';

var express = require('express');
var router = express.Router();
var renderOptions = {};

/**
 * Blog index
 */
router.get('/', (req, res, next) => {
    renderOptions.siteName = 'Coding1st';
    renderOptions.visits = res.session('visits') || 0;

    res.session('visits', ++renderOptions.visits);

    res.render('blog/welcome', renderOptions);
});

module.exports = router;

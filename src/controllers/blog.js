'use strict';

var express = require('express');
var router = express.Router();

/**
 * Blog index
 */
router.get('/', function(req, res, next) {
    var visits = res.session('visits') || 0;

    res.session('visits', ++visits);

    res.render('blog/welcome', {
        siteName: 'Coding1st',
        visits: visits,
        username: res.session('user').username
    });
});

module.exports = router;

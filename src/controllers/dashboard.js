'use strict';

var express = require('express');
var router = express.Router();
var user = require('../lib/helpers/user');

/**
 * Dashboard index
 */
router.get('/', function(req, res, next) {
    res.profileAllowed(function(userInfo) {
        if (userInfo) {
            res.render('dashboard/index', {
                userInfo: userInfo,
                section: 'Dashboard',
                layout: 'dashboard.hbs'
            });
        } else {
            res.redirect('/');
        }
    });
});

/**
 * Dashboard: Ads || Add Ad
 */
router.get('/ads/:action*?', function(req, res, next) {
    var section = res.__.dashboard.modules.ads.name;

    res.profileAllowed(function(userInfo) {
        if (userInfo) {
            if (req.params.action === 'add') {
                section = res.__.dashboard.modules.ads.action;
            }

            res.render('dashboard/index', {
                userInfo: userInfo,
                section: section,
                layout: 'dashboard.hbs'
            });
        } else {
            res.redirect('/');
        }
    });
});

/**
 * Dashboard: Blog || Add Post
 */
router.get('/blog/:action*?', function(req, res, next) {
    var section = res.__.dashboard.modules.blog.name;

    // Adding blog.js script
    res.locals.bottomJs.push('/js/dashboard/blog.js');

    res.profileAllowed(function(userInfo) {
        if (userInfo) {
            if (req.params.action === 'add') {
                section = res.__.dashboard.modules.blog.action;
            }

            res.render('dashboard/blog/add', {
                userInfo: userInfo,
                section: section,
                layout: 'dashboard.hbs'
            });
        } else {
            res.redirect('/');
        }
    });
});

router.post('/blog/add', function(req, res, next) {
    var post = {
        title           : res.post('title'),
        slug            : res.post('slug'),
        tags            : res.post('tags'),
        author          : res.post('author'),
        content         : res.post('content', 'html'),
        codes           : res.post('codes'),
        language        : res.post('language'),
        activeComments  : res.post('activeComments'),
        status          : res.post('status')
    };

    res.send(post);
});

/**
 * Dashboard: Config
 */
router.get('/config', function(req, res, next) {
    res.profileAllowed(function(userInfo) {
        if (userInfo) {
            res.render('dashboard/index', {
                userInfo: userInfo,
                section: 'Config',
                layout: 'dashboard.hbs'
            });
        } else {
            res.redirect('/');
        }
    });
});

/**
 * Dashboard: Feedback
 */
router.get('/feedback', function(req, res, next) {
    res.profileAllowed(function(userInfo) {
        if (userInfo) {
            res.render('dashboard/index', {
                userInfo: userInfo,
                section: 'Feedback',
                layout: 'dashboard.hbs'
            });
        } else {
            res.redirect('/');
        }
    });
});

/**
 * Dashboard: Pages || Add Page
 */
router.get('/pages/:action*?', function(req, res, next) {
    res.profileAllowed(function(userInfo) {
        if (userInfo) {
            res.render('dashboard/index', {
                userInfo: userInfo,
                section: 'Pages',
                layout: 'dashboard.hbs'
            });
        } else {
            res.redirect('/');
        }
    });
});

/**
 * Dashboard: Polls || Add Poll
 */
router.get('/polls/:action*?', function(req, res, next) {
    res.profileAllowed(function(userInfo) {
        if (userInfo) {
            res.render('dashboard/index', {
                userInfo: userInfo,
                section: 'Polls',
                layout: 'dashboard.hbs'
            });
        } else {
            res.redirect('/');
        }
    });
});

/**
 * Dashboard: Users || Add User
 */
router.get('/users/:action*?', function(req, res, next) {
    res.profileAllowed(function(userInfo) {
        if (userInfo) {
            res.render('dashboard/index', {
                userInfo: userInfo,
                section: 'Users',
                layout: 'dashboard.hbs'
            });
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;

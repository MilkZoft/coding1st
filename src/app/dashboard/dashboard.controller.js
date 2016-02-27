'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var user = require($rootPath('/lib/helpers/user'));
var blogModel = require($rootPath('/app/blog/blog.model'));
var utils = require($rootPath('/lib/helpers/utils'));

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
router.use('/blog/:action*?', function(req, res, next) {
    var section = req.params.action === 'add' ?
        res.content('dashboard.modules.blog.action') :
        res.content('dashboard.modules.blog.name');
    var post;
    var message;
    var alertType;
    var emptyElements;
    var renderOptions = {
        section: section,
        layout: 'dashboard.hbs'
    };

    res.profileAllowed(function(userInfo) {
        if (userInfo) {
            renderOptions.userInfo = userInfo;

            if (res.isPost()) {
                post = res.post([
                    'title',
                    'slug',
                    'excerpt:html',
                    'content:html',
                    'codes',
                    'tags',
                    'author',
                    'language',
                    'activeComments',
                    'estatus'
                ]);

                emptyElements = res.validate([
                    'title',
                    'slug',
                    'excerpt',
                    'content',
                    'tags',
                    'author'
                ], 'empty');

                post.createdAt = utils.now();
                post.day = utils.day();
                post.month = utils.month();
                post.year = utils.year();

                message = res.content('dashboard.modules.blog.messages.add.success');
                alertType = 'success';

                if (emptyElements) {
                    message = res.getContentFromTemplate(
                        {'input': emptyElements},
                        res.content('dashboard.modules.blog.messages.add.empty')
                    );

                    renderOptions.flashData = post;
                    renderOptions.message = message;

                    res.render('dashboard/blog/add', renderOptions);
                } else {
                    blogModel.save(post, function(status) {
                        if (utils.isDefined(status[0][0].error)) {
                            console.log(status[0][0].error);
                            if (status[0][0].error === 'exists:post') {
                                message = res.content('dashboard.modules.blog.messages.add.exists');
                            } else {
                                message = res.content('dashboard.modules.blog.messages.add.fail');
                            }
                        }

                        renderOptions.message = message;

                        res.render('dashboard/blog/add', renderOptions);
                    });
                }
            } else {
                res.render('dashboard/blog/add', renderOptions);
            }
        } else {
            res.redirect('/');
        }
    });
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

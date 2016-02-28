'use strict';

var express = require('express');
var router = express.Router();
var blogModel = require($rootPath('/app/blog/blog.model'));
var utils = require($rootPath('/lib/helpers/utils'));
var renderOptions = {
    layout: 'dashboard.hbs'
};

/**
 * Dashboard index
 */
router.get('/', (req, res, next) => {
    renderOptions.section = 'Dashboard';

    res.profileAllowed((userInfo) => {
        if (userInfo) {
            renderOptions.userInfo = userInfo;

            res.render('dashboard/index', renderOptions);
        } else {
            res.redirect('/');
        }
    });
});

/**
 * Dashboard: Ads || Add Ad
 */
router.get('/ads/:action*?', (req, res, next) => {
    renderOptions.section = res.content('dashboard.modules.ads.name');

    res.profileAllowed((userInfo) => {
        if (userInfo) {
            renderOptions.userInfo = userInfo;

            if (req.params.action === 'add') {
                renderOptions.section = res.content('dashboard.modules.ads.action');
            }

            res.render('dashboard/index', renderOptions);
        } else {
            res.redirect('/');
        }
    });
});

/**
 * Dashboard: Blog || Add Post
 */
router.use('/blog/:action*?', (req, res, next) => {
    var post;
    var message;
    var emptyElements;

    renderOptions.section = req.params.action === 'add' ?
        res.content('dashboard.modules.blog.action') :
        res.content('dashboard.modules.blog.name');

    res.profileAllowed((userInfo) => {
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

                if (emptyElements) {
                    message = res.getContentFromTemplate(
                        {'input': emptyElements},
                        res.content('dashboard.modules.blog.messages.add.empty')
                    );

                    renderOptions.flashData = post;
                    renderOptions.message = message;

                    res.render('dashboard/blog/add', renderOptions);
                } else {
                    blogModel.save(post, (status) => {
                        if (utils.isDefined(status[0][0].error)) {
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
router.get('/config', (req, res, next) => {
    renderOptions.section = 'Config';

    res.profileAllowed((userInfo) => {
        if (userInfo) {
            renderOptions.userInfo = userInfo;

            res.render('dashboard/index', renderOptions);
        } else {
            res.redirect('/');
        }
    });
});

/**
 * Dashboard: Feedback
 */
router.get('/feedback', (req, res, next) => {
    renderOptions.section = 'Feedback';

    res.profileAllowed((userInfo) => {
        if (userInfo) {
            renderOptions.userInfo = userInfo;

            res.render('dashboard/index', renderOptions);
        } else {
            res.redirect('/');
        }
    });
});

/**
 * Dashboard: Pages || Add Page
 */
router.get('/pages/:action*?', (req, res, next) => {
    renderOptions.section = 'Pages';

    res.profileAllowed((userInfo) => {
        if (userInfo) {
            renderOptions.userInfo = userInfo;

            res.render('dashboard/index', renderOptions);
        } else {
            res.redirect('/');
        }
    });
});

/**
 * Dashboard: Polls || Add Poll
 */
router.get('/polls/:action*?', (req, res, next) => {
    renderOptions.section = 'Polls';

    res.profileAllowed((userInfo) => {
        if (userInfo) {
            renderOptions.userInfo = userInfo;

            res.render('dashboard/index', renderOptions);
        } else {
            res.redirect('/');
        }
    });
});

/**
 * Dashboard: Users || Add User
 */
router.get('/users/:action*?', (req, res, next) => {
    renderOptions.section = 'Users';

    res.profileAllowed((userInfo) => {
        if (userInfo) {
            renderOptions.userInfo = userInfo;

            res.render('dashboard/index', renderOptions);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;

'use strict';

var utils = require($rootPath('/lib/helpers/utils'));
var blogModel = require($rootPath('/app/blog/blog.model'));
var post = {};
var emptyElements;

module.exports = (req, res, next) => {
    // Setting layout
    res.renderScope.default({
        layout: 'dashboard.hbs'
    });

    res.blogDashboard = {
        add: add,
        edit: edit,
        view: view
    };

    next();

    function add() {
        res.profileAllowed((userInfo) => {
            res.renderScope.set('userInfo', userInfo);
            res.renderScope.set(
                'section',
                req.params.action === 'add' ?
                    res.content('dashboard.modules.blog.action') :
                    res.content('dashboard.modules.blog.name')
            );

            if (userInfo) {
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

                    res.renderScope.set(
                        'message',
                        res.content('dashboard.modules.blog.messages.add.success')
                    );

                    if (emptyElements) {
                        res.renderScope.set(
                            'message',
                            res.getContentFromTemplate(
                                {'input': emptyElements},
                                res.content('dashboard.modules.blog.messages.add.empty')
                            )
                        );

                        res.renderScope.set('flashData', post);

                        res.render('dashboard/blog/add', res.renderScope.get());
                    } else {
                        blogModel.save(post, (status) => {
                            if (utils.isDefined(status[0][0].error)) {
                                if (status[0][0].error === 'exists:post') {
                                    res.renderScope.set(
                                        'message',
                                        res.content('dashboard.modules.blog.messages.add.exists')
                                    );
                                    res.renderScope.set('flashData', post);
                                } else {
                                    res.renderScope.set(
                                        'message',
                                        res.content('dashboard.modules.blog.messages.add.fail')
                                    );
                                }
                            }

                            res.render('dashboard/blog/form', res.renderScope.get());
                        });
                    }
                } else {
                    res.render('dashboard/blog/form', res.renderScope.get());
                }
            } else {
                res.redirect('/');
            }
        });
    }

    function edit() {
        res.render('dashboard/blog/form', res.renderScope.get());
    }

    function view() {
        res.render('dashboard/blog/view', res.renderScope.get());
    }
};

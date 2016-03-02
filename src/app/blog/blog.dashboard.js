'use strict';

var utils = require($rootPath('/lib/helpers/utils'));
var blogModel = require($rootPath('/app/blog/blog.model'));
var post = {};
var emptyElements;
var formView = 'blog/dashboard/form';
var resultsView = 'blog/dashboard/results';

module.exports = (req, res, next) => {
    // Setting layout
    res.renderScope.default({
        layout: 'dashboard.hbs'
    });

    res.blogDashboard = {
        add: add,
        edit: edit,
        results: results
    };

    next();

    function add() {
        res.profileAllowed((userInfo) => {
            res.content('dashboard.modules.blog', true);

            res.renderScope.set('userInfo', userInfo);
            res.renderScope.set('multimedia', utils.glob($rootPath('/public/images/uploads')));
            res.renderScope.set('section', req.params.action === 'add' ? res.content('action') : res.content('name'));

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

                    res.renderScope.set('message', res.content('messages.add.success'));

                    if (emptyElements) {
                        res.renderScope.set('message', res.getContentFromTemplate(
                            {'input': emptyElements},
                            res.content('messages.add.empty')
                        ));

                        res.renderScope.set('flashData', post);

                        res.render(formView, res.renderScope.get());
                    } else {
                        blogModel.save(post, (status) => {
                            if (utils.isDefined(status[0][0].error)) {
                                if (status[0][0].error === 'exists:post') {
                                    res.renderScope.set('message', res.content('messages.add.exists'));
                                    res.renderScope.set('flashData', post);
                                } else {
                                    res.renderScope.set('message', res.content('messages.add.fail'));
                                }
                            }

                            res.render(formView, res.renderScope.get());
                        });
                    }
                } else {
                    res.render(formView, res.renderScope.get());
                }
            } else {
                res.redirect('/');
            }
        });
    }

    function edit() {
        res.render(formView, res.renderScope.get());
    }

    function results() {
        res.render(resultsView, res.renderScope.get());
    }
};

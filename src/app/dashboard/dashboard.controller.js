'use strict';

var express = require('express');
var router = express.Router();

/**
 * Dashboard index
 */
router.get('/', (req, res, next) => {
    res.render('dashboard/index', {
        layout: 'dashboard.hbs'
    });
});

/**
 * Dashboard: Ads || Add Ad
 */
router.get('/ads/:action*?', (req, res, next) => {

});

/**
 * Dashboard: Blog || Add Post
 */
router.use('/blog/:action*?', (req, res, next) => {
    res.blogDashboard[res.action()]();
});

/**
 * Dashboard: Config
 */
router.get('/config', (req, res, next) => {

});

/**
 * Dashboard: Feedback
 */
router.get('/feedback', (req, res, next) => {

});

/**
 * Dashboard: Pages || Add Page
 */
router.get('/pages/:action*?', (req, res, next) => {

});

/**
 * Dashboard: Polls || Add Poll
 */
router.get('/polls/:action*?', (req, res, next) => {

});

/**
 * Dashboard: Users || Add User
 */
router.get('/users/:action*?', (req, res, next) => {

});

module.exports = router;

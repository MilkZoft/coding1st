var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var visits = res.session('visits') || 0;

    res.render('dashboard/index', {
        section: 'Dashboard',
        layout: 'dashboard.hbs'
    });
});

module.exports = router;

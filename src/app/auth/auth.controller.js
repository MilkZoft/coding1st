'use strict';

var express = require('express');
var router = express.Router();
var twitter = require($rootPath('/lib/helpers/twitter'));

/**
 * Redirects to twitter to do the login
 */
router.get('/twitter', (req, res) => {
    twitter.getOAuthRequestToken((tokens) => {
        var oauthSession = {
            'token': tokens[0],
            'tokenSecret': tokens[1]
        };

        res.session('oauth', oauthSession);
        res.redirect(twitter.getAuthenticateUrl(tokens[0]));
    });
});

/**
 * If twitter login was successful, we save oauth & user sessions
 */
router.get('/twitter/callback', (req, res) => {
    var oauthData = res.session('oauth');
    var oauthVerifier;

    if (oauthData) {
        oauthVerifier = req.query.oauth_verifier;

        twitter.getOAuthAccessToken(
            oauthData.token,
            oauthData.tokenSecret,
            oauthVerifier,
            (sessions) => {
                res.session('oauth', sessions[0]);
                res.session('user', sessions[1]);

                res.redirect(res.locals.basePath + '/users/validation');
            }
        );
    }
});

module.exports = router;

'use strict';

var config = require('../config');
var OAuth = require('oauth').OAuth;

var oauth = new OAuth(
    config().social.twitter.requestTokenUrl,
    config().social.twitter.accessTokenUrl,
    config().social.twitter.consumerKey,
    config().social.twitter.consumerSecret,
    config().social.twitter.apiVersion,
    config().social.twitter.callbackUrl,
    config().social.twitter.signMethod
);

/**
 * Exporting methods
 */
module.exports = {
    api: api,
    getAuthenticateUrl: getAuthenticateUrl,
    getOAuthRequestToken: getOAuthRequestToken,
    getOAuthAccessToken: getOAuthAccessToken
};

function api(url) {
    return config().social.twitter.apiUrl + url;
}

function getAuthenticateUrl(oauthToken) {
    return config().social.twitter.authenticateUrl + '?oauth_token=' + oauthToken;
}

function getOAuthRequestToken(callback) {
    oauth.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results) {
        if (error) {
            console.log(error);
        } else {
            return callback([oauthToken, oauthTokenSecret]);
        }
    });
}

function getOAuthAccessToken(token, tokenSecret, oauthVerifier, callback) {
    oauth.getOAuthAccessToken(token, tokenSecret, oauthVerifier,
        function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
            if (error) {
                console.log(error);
                return false;
            } else {
                var oauthSession = {
                    'token': oauthAccessToken,
                    'tokenSecret': oauthAccessTokenSecret
                };

                oauth.get(
                    api('account/verify_credentials.json'),
                    oauthAccessToken,
                    oauthAccessTokenSecret,

                    function(error, data) {
                        data = JSON.parse(data);

                        var userSession = {
                            'networkId': data['id'],
                            'network'  : 'twitter',
                            'username' : data['screen_name'],
                            'avatar'   : data['profile_image_url']
                        };

                        return callback([oauthSession, userSession]);
                    }
                );
            }
        }
    );
}

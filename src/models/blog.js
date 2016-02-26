'use strict';

var Model = require('../lib/helpers/model');
var Blog = new Model();
var fields = [
    'title',
    'slug',
    'excerpt',
    'content',
    'codes',
    'tags',
    'author',
    'createdAt',
    'language',
    'activeComments',
    'estatus'
];

module.exports = {
    save: save
};

function save(post, callback) {
    var procedure = Blog.getProcedure('savePost', post, fields, false);

    Blog.query(procedure, callback, function(result, callback) {
        callback(result);
    });
}

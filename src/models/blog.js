'use strict';

var Model = require('../lib/helpers/model');
var Blog = new Model();
var fields = [
    'id',
    'title',
    'slug',
    'excerpt',
    'content',
    'codes',
    'tags',
    'createdAt',
    'language',
    'estatus'
];

module.exports = {
    save: save
};

function save(post, callback) {
    var procedure = Blog.getProcedure('savePost', post, fields);

    Blog.query(procedure, callback, function(result, callback) {
        callback(result);
    });
}

'use strict';

var Model = require($rootPath('/lib/helpers/model'));
var Vendomatic = new Model();

module.exports = {
    getVendoContent: getVendoContent
};

function getVendoContent(language, callback) {
    var procedure = Vendomatic.getProcedure('getVendoContent', language, ['language']);

    Vendomatic.query(procedure, callback, (result, callback) => {
        var data = (result[0].length > 0) ? result[0] : false;

        callback(data);
    });
}

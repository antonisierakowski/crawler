"use strict";
exports.__esModule = true;
function getConnectionString() {
    var _a = process.env, DB_USER = _a.DB_USER, DB_PASSWORD = _a.DB_PASSWORD, DB_HOST = _a.DB_HOST, DB_PORT = _a.DB_PORT, DB_DATABASE = _a.DB_DATABASE;
    var defaultPort = '27017';
    return "mongodb+srv://" + DB_USER + ":" + DB_PASSWORD + "@" + DB_HOST + ":" + (DB_PORT ?  ? defaultPort :  : ) + "/" + DB_DATABASE;
}
exports.getConnectionString = getConnectionString;

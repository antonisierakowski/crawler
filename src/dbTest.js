"use strict";
exports.__esModule = true;
require("./configs/envConfig");
require("reflect-metadata");
var container_1 = require("./dependenciesContainer/container");
var types_1 = require("./dependenciesContainer/types");
var records = [];
var repository = container_1["default"].get(types_1.TYPES.WebsiteRepository);
repository.updateDB(records)
    .then(function () {
    console.log('success.');
})["catch"](function (err) {
    console.log(err);
});

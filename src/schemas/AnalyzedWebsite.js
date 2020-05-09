"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
exports.AnalyzedWebsiteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    description: { type: String },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": Date.now }
});
exports.analyzedWebsiteModel = mongoose.model('AnalyzedWebsite', exports.AnalyzedWebsiteSchema);

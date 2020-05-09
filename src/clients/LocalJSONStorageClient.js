"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var fs_1 = require("fs");
var uuid_1 = require("uuid");
var path_1 = require("path");
var inversify_1 = require("inversify");
var LocalJSONStorageClient = /** @class */ (function () {
    function LocalJSONStorageClient() {
    }
    LocalJSONStorageClient.prototype.saveRecord = function (path, record) {
        return __awaiter(this, void 0, void 0, function () {
            var allRecords, id, newFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllRecords(path)];
                    case 1:
                        allRecords = _a.sent();
                        id = uuid_1["default"].v4();
                        newFile = __spreadArrays(allRecords, [
                            record,
                        ]);
                        return [4 /*yield*/, this.writeFile(path, JSON.stringify(newFile), 'utf-8')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, id];
                }
            });
        });
    };
    LocalJSONStorageClient.prototype.getRecordById = function (path, id) {
        return __awaiter(this, void 0, void 0, function () {
            var allRecords;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllRecords(path)];
                    case 1:
                        allRecords = _a.sent();
                        return [2 /*return*/, allRecords.find(function (record) { return record.id === id; })];
                }
            });
        });
    };
    LocalJSONStorageClient.prototype.getRecordByKeyName = function (path, key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var allRecords, recordToFind;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllRecords(path)];
                    case 1:
                        allRecords = _a.sent();
                        recordToFind = null;
                        allRecords.forEach(function (record) {
                            if (record[key] === value) {
                                recordToFind = record;
                            }
                        });
                        return [2 /*return*/, recordToFind];
                }
            });
        });
    };
    LocalJSONStorageClient.prototype.removeRecordById = function (path, id) {
        return __awaiter(this, void 0, void 0, function () {
            var allRecords, fileAfterRemoval, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getAllRecords(path)];
                    case 1:
                        allRecords = _b.sent();
                        fileAfterRemoval = allRecords.filter(function (record) { return record.id !== id; });
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.writeFile(path, JSON.stringify(fileAfterRemoval), 'utf-8')];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 4:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    LocalJSONStorageClient.prototype.getAllRecords = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, JSON.parse(fs_1["default"].readFileSync(path, 'utf8'))];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LocalJSONStorageClient.prototype.removeStorageFile = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var doesFileExist, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        doesFileExist = fs_1["default"].readFileSync(path, 'utf8');
                        if (!doesFileExist) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs_1["default"].unlinkSync(path)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, true];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LocalJSONStorageClient.prototype.writeFile = function (filename, content, charset) {
        var folders = filename.split(path_1["default"].sep).slice(0, -1);
        if (folders.length) {
            folders.reduce(function (last, folder) {
                var folderPath = last ? last + path_1["default"].sep + folder : folder;
                if (!fs_1["default"].existsSync(folderPath)) {
                    fs_1["default"].mkdirSync(folderPath);
                }
                return folderPath;
            });
        }
        fs_1["default"].writeFileSync(filename, content, charset);
    };
    LocalJSONStorageClient = __decorate([
        inversify_1.injectable()
    ], LocalJSONStorageClient);
    return LocalJSONStorageClient;
}());
exports.LocalJSONStorageClient = LocalJSONStorageClient;

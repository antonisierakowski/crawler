"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.__esModule = true;
var inversify_1 = require("inversify");
var types_1 = require("../dependenciesContainer/types");
var AnalyzedWebsite_1 = require("../schemas/AnalyzedWebsite");
var WebsiteRepository = /** @class */ (function () {
    function WebsiteRepository(client, logger, db) {
        this.client = client;
        this.logger = logger;
        this.db = db;
        this.path = './_records/analyzed.json';
    }
    WebsiteRepository.prototype.getStorageFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.getAllRecords(this.path)];
            });
        });
    };
    WebsiteRepository.prototype.save = function (newWebsite) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.msg("Saving website... " + newWebsite.url);
                        return [4 /*yield*/, this.client.saveRecord(this.path, {
                                title: newWebsite.title,
                                url: newWebsite.url,
                                description: newWebsite.description
                            })];
                    case 1:
                        id = _a.sent();
                        this.logger.msg('Website saved!');
                        return [2 /*return*/, id];
                }
            });
        });
    };
    WebsiteRepository.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.getRecordById(this.path, id)];
            });
        });
    };
    WebsiteRepository.prototype.isUrlStored = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var website;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.getRecordByKeyName(this.path, 'url', url)];
                    case 1:
                        website = _a.sent();
                        if (website) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    WebsiteRepository.prototype.removeRecord = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.removeRecordById(this.path, id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WebsiteRepository.prototype.removeStorageFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var removalResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.removeStorageFile(this.path)];
                    case 1:
                        removalResult = _a.sent();
                        if (removalResult) {
                            this.logger.msg('Storage file removed succesfuly.');
                        }
                        else {
                            this.logger.err('There was an error removing the storage file.');
                        }
                        return [2 /*return*/, removalResult];
                }
            });
        });
    };
    WebsiteRepository.prototype.updateDB = function (collectedData) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, collectedData_1, record, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        _i = 0, collectedData_1 = collectedData;
                        _a.label = 1;
                    case 1:
                        if (!(_i < collectedData_1.length)) return [3 /*break*/, 4];
                        record = collectedData_1[_i];
                        return [4 /*yield*/, new AnalyzedWebsite_1.analyzedWebsiteModel(record).save()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, true];
                    case 5:
                        e_1 = _a.sent();
                        this.logger.err(e_1);
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    WebsiteRepository = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.TYPES.PersistenceClient)),
        __param(1, inversify_1.inject(types_1.TYPES.LoggerInterface)),
        __param(2, inversify_1.inject(types_1.TYPES.DBClient))
    ], WebsiteRepository);
    return WebsiteRepository;
}());
exports.WebsiteRepository = WebsiteRepository;

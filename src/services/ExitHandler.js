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
var ExitHandler = /** @class */ (function () {
    function ExitHandler(dbClient, repository, logger, queue) {
        this.dbClient = dbClient;
        this.repository = repository;
        this.logger = logger;
        this.queue = queue;
        this.handleExit = this.handleExit.bind(this);
    }
    ExitHandler.prototype.handleExit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.queue.collectAndSave()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.saveInDbAndClearStorage()];
                    case 2:
                        _a.sent();
                        // const shouldSave = await this.logger.getYesOrNo('Do you want to save the crawled websites in a database? It will clear locally saved file.');
                        // this.logger.msg(`got some kind of answer? ${shouldSave}`); // delete
                        // if (shouldSave) {
                        // 	await this.saveInDbAndClearStorage();
                        // }
                        // this.logger.msg('Terminating process.');
                        process.exit();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExitHandler.prototype.saveInDbAndClearStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var collectedData, success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.msg('Initializing DB connection...');
                        return [4 /*yield*/, this.dbClient.connect()];
                    case 1:
                        _a.sent();
                        this.logger.msg('Saving in DB...');
                        return [4 /*yield*/, this.repository.getStorageFile()];
                    case 2:
                        collectedData = _a.sent();
                        return [4 /*yield*/, this.repository.updateDB(collectedData)];
                    case 3:
                        success = _a.sent();
                        // console.log(`o co chodzi: ${success}`);
                        // if (success) {
                        // 	this.logger.msg('Succesfuly updated the database. Removing local storage file...');
                        // 	await this.repository.removeStorageFile();
                        // }
                        return [4 /*yield*/, this.dbClient.disconnect()];
                    case 4:
                        // console.log(`o co chodzi: ${success}`);
                        // if (success) {
                        // 	this.logger.msg('Succesfuly updated the database. Removing local storage file...');
                        // 	await this.repository.removeStorageFile();
                        // }
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExitHandler = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.TYPES.DBClient)),
        __param(1, inversify_1.inject(types_1.TYPES.WebsiteRepository)),
        __param(2, inversify_1.inject(types_1.TYPES.LoggerInterface)),
        __param(3, inversify_1.inject(types_1.TYPES.UrlQueueInterface))
    ], ExitHandler);
    return ExitHandler;
}());
exports.ExitHandler = ExitHandler;

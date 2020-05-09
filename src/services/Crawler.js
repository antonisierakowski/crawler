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
var registerExitProcessCallbacks_1 = require("../helpers/registerExitProcessCallbacks");
var Crawler = /** @class */ (function () {
    function Crawler(repository, traverser, exitHandler, logger, queue) {
        this.repository = repository;
        this.traverser = traverser;
        this.exitHandler = exitHandler;
        this.logger = logger;
        this.queue = queue;
        this.shouldRun = true;
        this.stop = this.stop.bind(this);
        registerExitProcessCallbacks_1.registerExitProcessCallbacks([
            this.stop,
        ]);
    }
    Crawler.prototype.initialize = function (initialUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var currentUrl, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.queue.preload(initialUrl)];
                    case 1:
                        _a.sent();
                        this.logger.msg('Started crawling...');
                        _a.label = 2;
                    case 2:
                        if (!(this.queue.size && this.shouldRun)) return [3 /*break*/, 8];
                        currentUrl = this.queue.current;
                        return [4 /*yield*/, this.repository.isUrlStored(currentUrl)];
                    case 3:
                        if (!_a.sent()) return [3 /*break*/, 4];
                        this.queue.remove(currentUrl);
                        return [3 /*break*/, 7];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.crawlWebsite(currentUrl)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        this.queue.remove(currentUrl);
                        return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 2];
                    case 8:
                        if (this.queue.size === 0) {
                            this.logger.warn('Looks like we\'re out of URLs. Try changing the initial URL and rerun.');
                        }
                        return [4 /*yield*/, this.exitHandler.handleExit()];
                    case 9:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Crawler.prototype.stop = function () {
        this.shouldRun = false;
    };
    Crawler.prototype.crawlWebsite = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var crawlResult;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.traverser.analyseWebsite(url)];
                    case 1:
                        crawlResult = _a.sent();
                        return [4 /*yield*/, this.repository.save(crawlResult)];
                    case 2:
                        _a.sent();
                        crawlResult.anchors.forEach(function (anchor) { return _this.queue.add(anchor); });
                        return [2 /*return*/];
                }
            });
        });
    };
    Crawler = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.TYPES.WebsiteRepository)),
        __param(1, inversify_1.inject(types_1.TYPES.MarkupTraverser)),
        __param(2, inversify_1.inject(types_1.TYPES.ExitHandlerInterface)),
        __param(3, inversify_1.inject(types_1.TYPES.LoggerInterface)),
        __param(4, inversify_1.inject(types_1.TYPES.UrlQueueInterface))
    ], Crawler);
    return Crawler;
}());
exports.Crawler = Crawler;

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Vuex"), require("Vue"));
	else if(typeof define === 'function' && define.amd)
		define(["Vuex", "Vue"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("Vuex"), require("Vue")) : factory(root["Vuex"], root["Vue"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "ICuer", function() { return /* binding */ ICuer; });
__webpack_require__.d(__webpack_exports__, "Mutations", function() { return /* binding */ src_Mutations; });
__webpack_require__.d(__webpack_exports__, "Actions", function() { return /* binding */ src_Actions; });
__webpack_require__.d(__webpack_exports__, "Getters", function() { return /* binding */ src_Getters; });
__webpack_require__.d(__webpack_exports__, "StoreCuer", function() { return /* binding */ src_StoreCuer; });

// CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.js
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}

// EXTERNAL MODULE: external "Vuex"
var external_Vuex_ = __webpack_require__(0);
var external_Vuex_default = /*#__PURE__*/__webpack_require__.n(external_Vuex_);

// CONCATENATED MODULE: ./src/mapping.ts
/**
 * 对象的字符串数组映射
 * @param valueOf
 * @param arr
 */
function mapValueOfKeys(arr, valueOf) {
    var ret = {};
    arr.forEach(function (key) {
        ret[key] = valueOf(key);
    });
    return ret;
}
/**
 * 对象的json映射
 * @param valueOf
 * @param json
 */
function mapValueOfJson(json, valueOf) {
    var ret = {};
    for (var k in json) {
        ret[k] = valueOf(json[k]);
    }
    return ret;
}
/**
 * 函数的数组映射
 * @param valueOf
 * @param arr
 */
function mapMethodOfKeys(arr, valueOf) {
    var ret = {};
    arr.forEach(function (key) {
        ret[key] = valueOf(key);
    });
    return ret;
}
/**
 * 函数的json映射
 * @param valueOf
 * @param json
 */
function mapMethodOfJson(json, valueOf) {
    var ret = {};
    for (var k in json) {
        ret[k] = valueOf(json[k]);
    }
    return ret;
}

// CONCATENATED MODULE: ./src/util.ts
/**
 * 获取`ICuer`对象上的原链函数
 * @param obj
 */
function util_keys(obj) {
    if (obj != null) {
        return Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(function (v) { return v != "constructor"; });
    }
    return [];
}
/**
 * 覆盖 ICuer 对象，转换成 store 属性的类型
 * @param obj
 * @param keys
 */
function cover(obj, keys, replace) {
    if (obj != null) {
        var ms_1 = {};
        keys.forEach(function (key) {
            ms_1[key] = obj[key];
            if (ms_1[key]) {
                replace(key, ms_1[key]);
            }
        });
    }
}
function util_assign(obj, key, v) {
    obj[key] = v;
    return obj;
}
//绑定store
function bind(cuer, value) {
    return util_assign(value, 'store', cuer);
}
/**
 * 重写 对象 属性
 */
function rewrite(obj, keys, write) {
    if (obj != null) {
        keys.forEach(function (key) {
            obj[key] = write(key);
        });
    }
}

// EXTERNAL MODULE: external "Vue"
var external_Vue_ = __webpack_require__(1);
var external_Vue_default = /*#__PURE__*/__webpack_require__.n(external_Vue_);

// CONCATENATED MODULE: ./src/index.ts





external_Vue_default.a.use(external_Vuex_default.a);
var ICuer = /** @class */ (function () {
    function ICuer() {
    }
    return ICuer;
}());

/**
 * commit 方法集合类
 */
var src_Mutations = /** @class */ (function (_super) {
    __extends(Mutations, _super);
    function Mutations() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Mutations;
}(ICuer));

/**
 * dispatch 函数集合类
 */
var src_Actions = /** @class */ (function (_super) {
    __extends(Actions, _super);
    function Actions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Actions;
}(ICuer));

/**
 * dispatch 函数集合类
 */
var src_Getters = /** @class */ (function (_super) {
    __extends(Getters, _super);
    function Getters() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Getters;
}(ICuer));

/**
 * todo:registerModule
 * todo:unregisterModule
 */
/**
 * store 提示类
 */
var src_StoreCuer = /** @class */ (function (_super) {
    __extends(StoreCuer, _super);
    function StoreCuer(state, options) {
        var _a, _b, _c, _d, _e;
        var _this = this;
        var mutations = {};
        var commits = (_a = options) === null || _a === void 0 ? void 0 : _a.mutations;
        var commitKeys = util_keys(commits);
        cover(commits, commitKeys, function (key, method) {
            mutations[key] = function (state, payload) {
                method.call(util_assign(_this.commits, 'state', state), payload);
            };
        });
        var actions = {};
        var dispatchs = (_b = options) === null || _b === void 0 ? void 0 : _b.actions;
        var dispatchKeys = util_keys(dispatchs);
        cover(dispatchs, dispatchKeys, function (key, method) {
            actions[key] = function (injectee, payload) {
                return method.call(util_assign(_this.dispatchs, 'state', injectee.state), payload);
            };
        });
        _this = _super.call(this, {
            state: state,
            mutations: mutations,
            actions: actions,
            //getters,
            plugins: (_c = options) === null || _c === void 0 ? void 0 : _c.plugins,
            strict: (_d = options) === null || _d === void 0 ? void 0 : _d.strict
        }) || this;
        console.log("[vuex-cuer]", {
            state: state,
            mutations: commitKeys,
            actions: dispatchKeys
        });
        rewrite(commits, commitKeys, function (key) {
            return function (payload) { return _this.commit(key, payload); };
        });
        if (commits) {
            _this.commits = bind(_this, commits);
        }
        rewrite(dispatchs, dispatchKeys, function (key) {
            return function (payload) { return _this.dispatch(key, payload); };
        });
        if (dispatchs) {
            _this.dispatchs = bind(_this, dispatchs);
        }
        var getters = (_e = options) === null || _e === void 0 ? void 0 : _e.getters;
        if (getters) {
            _this.getters = bind(_this, getters);
        }
        return _this;
    }
    StoreCuer.prototype.subscribe = function (fn) {
        return _super.prototype.subscribe.call(this, fn);
    };
    StoreCuer.prototype.subscribeAction = function (fn) {
        return _super.prototype.subscribeAction.call(this, fn);
    };
    /**
     * 映射 `state`
     * @param keys
     */
    StoreCuer.prototype.mapState = function (keys) {
        var _this = this;
        return mapValueOfJson(keys, function (k) { return function () { return _this.state[k]; }; });
    };
    /**
     * 映射 `state`
     * @param keys
     */
    StoreCuer.prototype.mapStateOfKeys = function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return mapValueOfKeys(keys, function (k) { return function () { return _this.state[k]; }; });
    };
    /**
     * 映射 `getters`
     * @param keys
     */
    StoreCuer.prototype.mapGetters = function (keys) {
        var _this = this;
        return mapValueOfJson(keys, function (k) { return function () { return _this.getters[k]; }; });
    };
    /**
     * 映射 `getters`
     * @param keys
     */
    StoreCuer.prototype.mapGettersOfKeys = function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return mapValueOfKeys(keys, function (key) { return function () { return _this.getters[key]; }; });
    };
    /**
     * 映射 `dispatchs`
     * @param keys
     */
    StoreCuer.prototype.mapActions = function (keys) {
        var _this = this;
        return mapMethodOfJson(keys, function (k) { return _this.dispatchs[k]; });
    };
    /**
     * 映射 `dispatchs`
     * @param keys
     */
    StoreCuer.prototype.mapActionsOfKeys = function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return mapMethodOfKeys(keys, function (k) { return _this.dispatchs[k]; });
    };
    /**
     * 映射 `commits`
     * @param keys
     */
    StoreCuer.prototype.mapMutations = function (keys) {
        var _this = this;
        return mapMethodOfJson(keys, function (k) { return _this.commits[k]; });
    };
    /**
     * 映射 `commits`
     * @param keys
     */
    StoreCuer.prototype.mapMutationsOfKeys = function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return mapMethodOfKeys(keys, function (key) { return _this.commits[key]; });
    };
    return StoreCuer;
}(external_Vuex_["Store"]));



/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map
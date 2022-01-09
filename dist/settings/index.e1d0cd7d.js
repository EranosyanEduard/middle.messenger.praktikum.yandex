// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"8sQ4y":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "b0755ea6e1d0cd7d";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"6j3Sz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _settings = require("../../views/settings");
var _settingsDefault = parcelHelpers.interopDefault(_settings);
document.body.innerHTML = _settingsDefault.default;

},{"../../views/settings":"aJvd1","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"aJvd1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _compiler = require("../../plugins/template-engine/Compiler");
var _compilerDefault = parcelHelpers.interopDefault(_compiler);
var _components = require("../../components");
var _components1 = require("./components");
exports.default = _compilerDefault.default.compile(_components.pageSettingsComp, {
    $data: {
        anchor: {
            ref: "../index.html"
        },
        userDnaCard: {
            classNames: {
                name: ""
            }
        }
    },
    $slots: {
        userDnaCard: {
            body: _components1.userDnaItemsComp,
            foot: _components1.menuComp
        }
    }
});

},{"../../plugins/template-engine/Compiler":"a4HlE","../../components":"iKUBW","./components":"dystJ","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"a4HlE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _template = require("./Template");
var _templateDefault = parcelHelpers.interopDefault(_template);
class Compiler {
    /**
     * Скомпилировать исходный код шаблона разметки.
     * @param {string} source исходный код шаблона разметки.
     * @param {object | null} context контекст, использующийся при "компиляции" source.
     */ static compile(source, context = null) {
        return new _templateDefault.default(source, context).compile();
    }
}
exports.default = Compiler;

},{"./Template":"kDMb3","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"kDMb3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _isJs = require("is_js");
var _isJsDefault = parcelHelpers.interopDefault(_isJs);
var _utils = require("../../utils");
class Template {
    static _contextKeys = {
        data: "$data",
        slot: "$slots"
    };
    static _regExpKeys = {
        data: "data",
        slot: "slot",
        loop: "loop"
    };
    static _regExps = {
        [Template._regExpKeys.data]: /{{(?<keys>.+?)}}/gi,
        [Template._regExpKeys.slot]: /<slot name="(?<keys>.+?)" \/>/gi,
        [Template._regExpKeys.loop]: /<for data="(?<keys>.+)" it="(?<it>.+?)">(?<item>.+)<\/for>/gi
    };
    static _regExpReplacers = {
        base: (context)=>(match)=>{
                const { keys  } = match.groups;
                return _utils.ObjMeths.getValOrElse(context, keys.trim(), ()=>match[0]
                );
            }
        ,
        [Template._regExpKeys.loop]: (context)=>(match)=>{
                const { it , item , keys  } = match.groups;
                const arr = _utils.ObjMeths.getValOrElse(context, keys.trim(), ()=>null
                );
                if (_isJsDefault.default.array(arr)) {
                    const items = arr.map((_, i)=>item.replaceAll(`${it}`, `${keys}.${i}`)
                    );
                    return _utils.ArrMeths.joinToString(items, _utils.StrMeths.emptyStr);
                }
                return match[0];
            }
    };
    /**
     * Создать экземпляр класса Template.
     * @param {string} source исходный код шаблона разметки.
     * @param {object} context контекст, использующийся при "компиляции" source.
     */ constructor(source, context = null){
        this._source = source;
        this._context = context;
    }
    /**
     * Определить наличие контекста исходного кода шаблона разметки.
     * @returns {boolean}
     * @private
     */ get _hasContext() {
        return _isJsDefault.default.object(this._context);
    }
    /**
     * Обойти с помощью метода регулярного выражения exec исходный код шаблона
     * разметки и внести в него изменения, заменив все совпадения вызовом аргумента fun.
     * @param {string} regExpKey ключ, использующийся для выбора регулярного выражения.
     * @param {function} replacer обработчик совпадения подстроки с регулярным выражением.
     * @returns {Template}
     * @private
     */ _execute(regExpKey, replacer) {
        const re = Template._regExps[regExpKey];
        let currentMatch;
        while(currentMatch = re.exec(this._source))if (currentMatch) {
            const [match] = currentMatch;
            const val = replacer(currentMatch);
            this._source = this._source.replace(match, val);
            re.lastIndex = currentMatch.index;
            if (match === val) re.lastIndex += 1;
        }
        return this;
    }
    /**
     * Использовать контекст в исходном коде шаблона.
     * @param {string} contextKey ключ, использующийся для выбора категории контекста.
     * @param {string} regExpKey ключ, использующийся для выбора регулярного выражения.
     * @param {string} replacerKey ключ, использующийся для выбора обработчика подстроки,
     * совпавшей с регулярным выражением.
     * @returns {Template}
     * @private
     */ _useContext(contextKey, regExpKey1, replacerKey = "base") {
        const context = this._context[contextKey];
        return _isJsDefault.default.object(context) ? this._execute(regExpKey1, Template._regExpReplacers[replacerKey](context)) : this;
    }
    /**
     * "Скомпилировать" исходный код шаблона в готовую html-разметку.
     * @returns {string}
     */ compile() {
        this._source = _utils.StrMeths.replaceSpaces(this._source, _utils.StrMeths.spaceChar);
        if (this._hasContext) this._useContext(Template._contextKeys.slot, Template._regExpKeys.slot)._useContext(Template._contextKeys.data, Template._regExpKeys.loop, Template._regExpKeys.loop)._useContext(Template._contextKeys.data, Template._regExpKeys.data);
        return this._source;
    }
}
exports.default = Template;

},{"is_js":"efiOI","../../utils":"hcfvl","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"efiOI":[function(require,module,exports) {
var global = arguments[3];
(function(root, factory) {
    if (typeof define === 'function' && define.amd) // AMD. Register as an anonymous module.
    define(function() {
        // Also create a global in case some scripts
        // that are loaded still are looking for
        // a global even when an AMD loader is in use.
        return root.is = factory();
    });
    else if (typeof exports === 'object') // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
    else // Browser globals (root is self)
    root.is = factory();
})(this, function() {
    // Baseline
    /* -------------------------------------------------------------------------- */ // define 'is' object and current version
    var is = {
    };
    is.VERSION = '0.8.0';
    // define interfaces
    is.not = {
    };
    is.all = {
    };
    is.any = {
    };
    // cache some methods to call later on
    var toString = Object.prototype.toString;
    var slice = Array.prototype.slice;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    // helper function which reverses the sense of predicate result
    function not(func) {
        return function() {
            return !func.apply(null, slice.call(arguments));
        };
    }
    // helper function which call predicate function per parameter and return true if all pass
    function all(func) {
        return function() {
            var params = getParams(arguments);
            var length = params.length;
            for(var i = 0; i < length; i++){
                if (!func.call(null, params[i])) return false;
            }
            return true;
        };
    }
    // helper function which call predicate function per parameter and return true if any pass
    function any(func) {
        return function() {
            var params = getParams(arguments);
            var length = params.length;
            for(var i = 0; i < length; i++){
                if (func.call(null, params[i])) return true;
            }
            return false;
        };
    }
    // build a 'comparator' object for various comparison checks
    var comparator = {
        '<': function(a, b) {
            return a < b;
        },
        '<=': function(a, b) {
            return a <= b;
        },
        '>': function(a, b) {
            return a > b;
        },
        '>=': function(a, b) {
            return a >= b;
        }
    };
    // helper function which compares a version to a range
    function compareVersion(version, range) {
        var string = range + '';
        var n = +(string.match(/\d+/) || NaN);
        var op = string.match(/^[<>]=?|/)[0];
        return comparator[op] ? comparator[op](version, n) : version == n || n !== n;
    }
    // helper function which extracts params from arguments
    function getParams(args) {
        var params = slice.call(args);
        var length = params.length;
        if (length === 1 && is.array(params[0])) params = params[0];
        return params;
    }
    // Type checks
    /* -------------------------------------------------------------------------- */ // is a given value Arguments?
    is.arguments = function(value) {
        return toString.call(value) === '[object Arguments]' || value != null && typeof value === 'object' && 'callee' in value;
    };
    // is a given value Array?
    is.array = Array.isArray || function(value) {
        return toString.call(value) === '[object Array]';
    };
    // is a given value Boolean?
    is.boolean = function(value) {
        return value === true || value === false || toString.call(value) === '[object Boolean]';
    };
    // is a given value Char?
    is.char = function(value) {
        return is.string(value) && value.length === 1;
    };
    // is a given value Date Object?
    is.date = function(value) {
        return toString.call(value) === '[object Date]';
    };
    // is a given object a DOM node?
    is.domNode = function(object) {
        return is.object(object) && object.nodeType > 0;
    };
    // is a given value Error object?
    is.error = function(value) {
        return toString.call(value) === '[object Error]';
    };
    // is a given value function?
    is['function'] = function(value) {
        return toString.call(value) === '[object Function]' || typeof value === 'function';
    };
    // is given value a pure JSON object?
    is.json = function(value) {
        return toString.call(value) === '[object Object]';
    };
    // is a given value NaN?
    is.nan = function(value) {
        return value !== value;
    };
    // is a given value null?
    is['null'] = function(value) {
        return value === null;
    };
    // is a given value number?
    is.number = function(value) {
        return is.not.nan(value) && toString.call(value) === '[object Number]';
    };
    // is a given value object?
    is.object = function(value) {
        return Object(value) === value;
    };
    // is a given value RegExp?
    is.regexp = function(value) {
        return toString.call(value) === '[object RegExp]';
    };
    // are given values same type?
    // prevent NaN, Number same type check
    is.sameType = function(value, other) {
        var tag = toString.call(value);
        if (tag !== toString.call(other)) return false;
        if (tag === '[object Number]') return !is.any.nan(value, other) || is.all.nan(value, other);
        return true;
    };
    // sameType method does not support 'all' and 'any' interfaces
    is.sameType.api = [
        'not'
    ];
    // is a given value String?
    is.string = function(value) {
        return toString.call(value) === '[object String]';
    };
    // is a given value undefined?
    is.undefined = function(value) {
        return value === void 0;
    };
    // is a given value window?
    // setInterval method is only available for window object
    is.windowObject = function(value) {
        return value != null && typeof value === 'object' && 'setInterval' in value;
    };
    // Presence checks
    /* -------------------------------------------------------------------------- */ //is a given value empty? Objects, arrays, strings
    is.empty = function(value) {
        if (is.object(value)) {
            var length = Object.getOwnPropertyNames(value).length;
            if (length === 0 || length === 1 && is.array(value) || length === 2 && is.arguments(value)) return true;
            return false;
        }
        return value === '';
    };
    // is a given value existy?
    is.existy = function(value) {
        return value != null;
    };
    // is a given value falsy?
    is.falsy = function(value) {
        return !value;
    };
    // is a given value truthy?
    is.truthy = not(is.falsy);
    // Arithmetic checks
    /* -------------------------------------------------------------------------- */ // is a given number above minimum parameter?
    is.above = function(n, min) {
        return is.all.number(n, min) && n > min;
    };
    // above method does not support 'all' and 'any' interfaces
    is.above.api = [
        'not'
    ];
    // is a given number decimal?
    is.decimal = function(n) {
        return is.number(n) && n % 1 !== 0;
    };
    // are given values equal? supports numbers, strings, regexes, booleans
    // TODO: Add object and array support
    is.equal = function(value, other) {
        // check 0 and -0 equity with Infinity and -Infinity
        if (is.all.number(value, other)) return value === other && 1 / value === 1 / other;
        // check regexes as strings too
        if (is.all.string(value, other) || is.all.regexp(value, other)) return '' + value === '' + other;
        if (is.all.boolean(value, other)) return value === other;
        return false;
    };
    // equal method does not support 'all' and 'any' interfaces
    is.equal.api = [
        'not'
    ];
    // is a given number even?
    is.even = function(n) {
        return is.number(n) && n % 2 === 0;
    };
    // is a given number finite?
    is.finite = isFinite || function(n) {
        return is.not.infinite(n) && is.not.nan(n);
    };
    // is a given number infinite?
    is.infinite = function(n) {
        return n === Infinity || n === -Infinity;
    };
    // is a given number integer?
    is.integer = function(n) {
        return is.number(n) && n % 1 === 0;
    };
    // is a given number negative?
    is.negative = function(n) {
        return is.number(n) && n < 0;
    };
    // is a given number odd?
    is.odd = function(n) {
        return is.number(n) && n % 2 === 1;
    };
    // is a given number positive?
    is.positive = function(n) {
        return is.number(n) && n > 0;
    };
    // is a given number above maximum parameter?
    is.under = function(n, max) {
        return is.all.number(n, max) && n < max;
    };
    // least method does not support 'all' and 'any' interfaces
    is.under.api = [
        'not'
    ];
    // is a given number within minimum and maximum parameters?
    is.within = function(n, min, max) {
        return is.all.number(n, min, max) && n > min && n < max;
    };
    // within method does not support 'all' and 'any' interfaces
    is.within.api = [
        'not'
    ];
    // Regexp checks
    /* -------------------------------------------------------------------------- */ // Steven Levithan, Jan Goyvaerts: Regular Expressions Cookbook
    // Scott Gonzalez: Email address validation
    // dateString match m/d/yy and mm/dd/yyyy, allowing any combination of one or two digits for the day and month, and two or four digits for the year
    // eppPhone match extensible provisioning protocol format
    // nanpPhone match north american number plan format
    // time match hours, minutes, and seconds, 24-hour clock
    var regexes1 = {
        affirmative: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,
        alphaNumeric: /^[A-Za-z0-9]+$/,
        caPostalCode: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\s?[0-9][A-Z][0-9]$/,
        creditCard: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
        dateString: /^(1[0-2]|0?[1-9])([\/-])(3[01]|[12][0-9]|0?[1-9])(?:\2)(?:[0-9]{2})?[0-9]{2}$/,
        email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
        eppPhone: /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/,
        hexadecimal: /^(?:0x)?[0-9a-fA-F]+$/,
        hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
        ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
        ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
        nanpPhone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        socialSecurityNumber: /^(?!000|666)[0-8][0-9]{2}-?(?!00)[0-9]{2}-?(?!0000)[0-9]{4}$/,
        timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
        ukPostCode: /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/,
        url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
        usZipCode: /^[0-9]{5}(?:-[0-9]{4})?$/
    };
    function regexpCheck(regexp, regexes) {
        is[regexp] = function(value) {
            return regexes[regexp].test(value);
        };
    }
    // create regexp checks methods from 'regexes' object
    for(var regexp1 in regexes1)if (regexes1.hasOwnProperty(regexp1)) regexpCheck(regexp1, regexes1);
    // simplify IP checks by calling the regex helpers for IPv4 and IPv6
    is.ip = function(value) {
        return is.ipv4(value) || is.ipv6(value);
    };
    // String checks
    /* -------------------------------------------------------------------------- */ // is a given string or sentence capitalized?
    is.capitalized = function(string) {
        if (is.not.string(string)) return false;
        var words = string.split(' ');
        for(var i = 0; i < words.length; i++){
            var word = words[i];
            if (word.length) {
                var chr = word.charAt(0);
                if (chr !== chr.toUpperCase()) return false;
            }
        }
        return true;
    };
    // is string end with a given target parameter?
    is.endWith = function(string, target) {
        if (is.not.string(string)) return false;
        target += '';
        var position = string.length - target.length;
        return position >= 0 && string.indexOf(target, position) === position;
    };
    // endWith method does not support 'all' and 'any' interfaces
    is.endWith.api = [
        'not'
    ];
    // is a given string include parameter target?
    is.include = function(string, target) {
        return string.indexOf(target) > -1;
    };
    // include method does not support 'all' and 'any' interfaces
    is.include.api = [
        'not'
    ];
    // is a given string all lowercase?
    is.lowerCase = function(string) {
        return is.string(string) && string === string.toLowerCase();
    };
    // is a given string palindrome?
    is.palindrome = function(string) {
        if (is.not.string(string)) return false;
        string = string.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
        var length = string.length - 1;
        for(var i = 0, half = Math.floor(length / 2); i <= half; i++){
            if (string.charAt(i) !== string.charAt(length - i)) return false;
        }
        return true;
    };
    // is a given value space?
    // horizantal tab: 9, line feed: 10, vertical tab: 11, form feed: 12, carriage return: 13, space: 32
    is.space = function(value) {
        if (is.not.char(value)) return false;
        var charCode = value.charCodeAt(0);
        return charCode > 8 && charCode < 14 || charCode === 32;
    };
    // is string start with a given target parameter?
    is.startWith = function(string, target) {
        return is.string(string) && string.indexOf(target) === 0;
    };
    // startWith method does not support 'all' and 'any' interfaces
    is.startWith.api = [
        'not'
    ];
    // is a given string all uppercase?
    is.upperCase = function(string) {
        return is.string(string) && string === string.toUpperCase();
    };
    // Time checks
    /* -------------------------------------------------------------------------- */ var days = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
    ];
    var months = [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december'
    ];
    // is a given dates day equal given day parameter?
    is.day = function(date, day) {
        return is.date(date) && day.toLowerCase() === days[date.getDay()];
    };
    // day method does not support 'all' and 'any' interfaces
    is.day.api = [
        'not'
    ];
    // is a given date in daylight saving time?
    is.dayLightSavingTime = function(date) {
        var january = new Date(date.getFullYear(), 0, 1);
        var july = new Date(date.getFullYear(), 6, 1);
        var stdTimezoneOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
        return date.getTimezoneOffset() < stdTimezoneOffset;
    };
    // is a given date future?
    is.future = function(date) {
        var now = new Date();
        return is.date(date) && date.getTime() > now.getTime();
    };
    // is date within given range?
    is.inDateRange = function(date, start, end) {
        if (is.not.date(date) || is.not.date(start) || is.not.date(end)) return false;
        var stamp = date.getTime();
        return stamp > start.getTime() && stamp < end.getTime();
    };
    // inDateRange method does not support 'all' and 'any' interfaces
    is.inDateRange.api = [
        'not'
    ];
    // is a given date in last month range?
    is.inLastMonth = function(date) {
        return is.inDateRange(date, new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date());
    };
    // is a given date in last week range?
    is.inLastWeek = function(date) {
        return is.inDateRange(date, new Date(new Date().setDate(new Date().getDate() - 7)), new Date());
    };
    // is a given date in last year range?
    is.inLastYear = function(date) {
        return is.inDateRange(date, new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date());
    };
    // is a given date in next month range?
    is.inNextMonth = function(date) {
        return is.inDateRange(date, new Date(), new Date(new Date().setMonth(new Date().getMonth() + 1)));
    };
    // is a given date in next week range?
    is.inNextWeek = function(date) {
        return is.inDateRange(date, new Date(), new Date(new Date().setDate(new Date().getDate() + 7)));
    };
    // is a given date in next year range?
    is.inNextYear = function(date) {
        return is.inDateRange(date, new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
    };
    // is the given year a leap year?
    is.leapYear = function(year) {
        return is.number(year) && (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0);
    };
    // is a given dates month equal given month parameter?
    is.month = function(date, month) {
        return is.date(date) && month.toLowerCase() === months[date.getMonth()];
    };
    // month method does not support 'all' and 'any' interfaces
    is.month.api = [
        'not'
    ];
    // is a given date past?
    is.past = function(date) {
        var now = new Date();
        return is.date(date) && date.getTime() < now.getTime();
    };
    // is a given date in the parameter quarter?
    is.quarterOfYear = function(date, quarter) {
        return is.date(date) && is.number(quarter) && quarter === Math.floor((date.getMonth() + 3) / 3);
    };
    // quarterOfYear method does not support 'all' and 'any' interfaces
    is.quarterOfYear.api = [
        'not'
    ];
    // is a given date indicate today?
    is.today = function(date) {
        var now = new Date();
        var todayString = now.toDateString();
        return is.date(date) && date.toDateString() === todayString;
    };
    // is a given date indicate tomorrow?
    is.tomorrow = function(date) {
        var now = new Date();
        var tomorrowString = new Date(now.setDate(now.getDate() + 1)).toDateString();
        return is.date(date) && date.toDateString() === tomorrowString;
    };
    // is a given date weekend?
    // 6: Saturday, 0: Sunday
    is.weekend = function(date) {
        return is.date(date) && (date.getDay() === 6 || date.getDay() === 0);
    };
    // is a given date weekday?
    is.weekday = not(is.weekend);
    // is a given dates year equal given year parameter?
    is.year = function(date, year) {
        return is.date(date) && is.number(year) && year === date.getFullYear();
    };
    // year method does not support 'all' and 'any' interfaces
    is.year.api = [
        'not'
    ];
    // is a given date indicate yesterday?
    is.yesterday = function(date) {
        var now = new Date();
        var yesterdayString = new Date(now.setDate(now.getDate() - 1)).toDateString();
        return is.date(date) && date.toDateString() === yesterdayString;
    };
    // Environment checks
    /* -------------------------------------------------------------------------- */ var freeGlobal = is.windowObject(typeof global == 'object' && global) && global;
    var freeSelf = is.windowObject(typeof self == 'object' && self) && self;
    var thisGlobal = is.windowObject(typeof this == 'object' && this) && this;
    var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();
    var document = freeSelf && freeSelf.document;
    var previousIs = root.is;
    // store navigator properties to use later
    var navigator = freeSelf && freeSelf.navigator;
    var appVersion = (navigator && navigator.appVersion || '').toLowerCase();
    var userAgent = (navigator && navigator.userAgent || '').toLowerCase();
    var vendor = (navigator && navigator.vendor || '').toLowerCase();
    // is current device android?
    is.android = function() {
        return /android/.test(userAgent);
    };
    // android method does not support 'all' and 'any' interfaces
    is.android.api = [
        'not'
    ];
    // is current device android phone?
    is.androidPhone = function() {
        return /android/.test(userAgent) && /mobile/.test(userAgent);
    };
    // androidPhone method does not support 'all' and 'any' interfaces
    is.androidPhone.api = [
        'not'
    ];
    // is current device android tablet?
    is.androidTablet = function() {
        return /android/.test(userAgent) && !/mobile/.test(userAgent);
    };
    // androidTablet method does not support 'all' and 'any' interfaces
    is.androidTablet.api = [
        'not'
    ];
    // is current device blackberry?
    is.blackberry = function() {
        return /blackberry/.test(userAgent) || /bb10/.test(userAgent);
    };
    // blackberry method does not support 'all' and 'any' interfaces
    is.blackberry.api = [
        'not'
    ];
    // is current browser chrome?
    // parameter is optional
    is.chrome = function(range) {
        var match = /google inc/.test(vendor) ? userAgent.match(/(?:chrome|crios)\/(\d+)/) : null;
        return match !== null && compareVersion(match[1], range);
    };
    // chrome method does not support 'all' and 'any' interfaces
    is.chrome.api = [
        'not'
    ];
    // is current device desktop?
    is.desktop = function() {
        return is.not.mobile() && is.not.tablet();
    };
    // desktop method does not support 'all' and 'any' interfaces
    is.desktop.api = [
        'not'
    ];
    // is current browser edge?
    // parameter is optional
    is.edge = function(range) {
        var match = userAgent.match(/edge\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // edge method does not support 'all' and 'any' interfaces
    is.edge.api = [
        'not'
    ];
    // is current browser firefox?
    // parameter is optional
    is.firefox = function(range) {
        var match = userAgent.match(/(?:firefox|fxios)\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // firefox method does not support 'all' and 'any' interfaces
    is.firefox.api = [
        'not'
    ];
    // is current browser internet explorer?
    // parameter is optional
    is.ie = function(range) {
        var match = userAgent.match(/(?:msie |trident.+?; rv:)(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // ie method does not support 'all' and 'any' interfaces
    is.ie.api = [
        'not'
    ];
    // is current device ios?
    is.ios = function() {
        return is.iphone() || is.ipad() || is.ipod();
    };
    // ios method does not support 'all' and 'any' interfaces
    is.ios.api = [
        'not'
    ];
    // is current device ipad?
    // parameter is optional
    is.ipad = function(range) {
        var match = userAgent.match(/ipad.+?os (\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // ipad method does not support 'all' and 'any' interfaces
    is.ipad.api = [
        'not'
    ];
    // is current device iphone?
    // parameter is optional
    is.iphone = function(range) {
        // original iPhone doesn't have the os portion of the UA
        var match = userAgent.match(/iphone(?:.+?os (\d+))?/);
        return match !== null && compareVersion(match[1] || 1, range);
    };
    // iphone method does not support 'all' and 'any' interfaces
    is.iphone.api = [
        'not'
    ];
    // is current device ipod?
    // parameter is optional
    is.ipod = function(range) {
        var match = userAgent.match(/ipod.+?os (\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // ipod method does not support 'all' and 'any' interfaces
    is.ipod.api = [
        'not'
    ];
    // is current operating system linux?
    is.linux = function() {
        return /linux/.test(appVersion);
    };
    // linux method does not support 'all' and 'any' interfaces
    is.linux.api = [
        'not'
    ];
    // is current operating system mac?
    is.mac = function() {
        return /mac/.test(appVersion);
    };
    // mac method does not support 'all' and 'any' interfaces
    is.mac.api = [
        'not'
    ];
    // is current device mobile?
    is.mobile = function() {
        return is.iphone() || is.ipod() || is.androidPhone() || is.blackberry() || is.windowsPhone();
    };
    // mobile method does not support 'all' and 'any' interfaces
    is.mobile.api = [
        'not'
    ];
    // is current state offline?
    is.offline = not(is.online);
    // offline method does not support 'all' and 'any' interfaces
    is.offline.api = [
        'not'
    ];
    // is current state online?
    is.online = function() {
        return !navigator || navigator.onLine === true;
    };
    // online method does not support 'all' and 'any' interfaces
    is.online.api = [
        'not'
    ];
    // is current browser opera?
    // parameter is optional
    is.opera = function(range) {
        var match = userAgent.match(/(?:^opera.+?version|opr)\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // opera method does not support 'all' and 'any' interfaces
    is.opera.api = [
        'not'
    ];
    // is current browser phantomjs?
    // parameter is optional
    is.phantom = function(range) {
        var match = userAgent.match(/phantomjs\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // phantom method does not support 'all' and 'any' interfaces
    is.phantom.api = [
        'not'
    ];
    // is current browser safari?
    // parameter is optional
    is.safari = function(range) {
        var match = userAgent.match(/version\/(\d+).+?safari/);
        return match !== null && compareVersion(match[1], range);
    };
    // safari method does not support 'all' and 'any' interfaces
    is.safari.api = [
        'not'
    ];
    // is current device tablet?
    is.tablet = function() {
        return is.ipad() || is.androidTablet() || is.windowsTablet();
    };
    // tablet method does not support 'all' and 'any' interfaces
    is.tablet.api = [
        'not'
    ];
    // is current device supports touch?
    is.touchDevice = function() {
        return !!document && ('ontouchstart' in freeSelf || 'DocumentTouch' in freeSelf && document instanceof DocumentTouch);
    };
    // touchDevice method does not support 'all' and 'any' interfaces
    is.touchDevice.api = [
        'not'
    ];
    // is current operating system windows?
    is.windows = function() {
        return /win/.test(appVersion);
    };
    // windows method does not support 'all' and 'any' interfaces
    is.windows.api = [
        'not'
    ];
    // is current device windows phone?
    is.windowsPhone = function() {
        return is.windows() && /phone/.test(userAgent);
    };
    // windowsPhone method does not support 'all' and 'any' interfaces
    is.windowsPhone.api = [
        'not'
    ];
    // is current device windows tablet?
    is.windowsTablet = function() {
        return is.windows() && is.not.windowsPhone() && /touch/.test(userAgent);
    };
    // windowsTablet method does not support 'all' and 'any' interfaces
    is.windowsTablet.api = [
        'not'
    ];
    // Object checks
    /* -------------------------------------------------------------------------- */ // has a given object got parameterized count property?
    is.propertyCount = function(object, count) {
        if (is.not.object(object) || is.not.number(count)) return false;
        var n = 0;
        for(var property in object){
            if (hasOwnProperty.call(object, property) && ++n > count) return false;
        }
        return n === count;
    };
    // propertyCount method does not support 'all' and 'any' interfaces
    is.propertyCount.api = [
        'not'
    ];
    // is given object has parameterized property?
    is.propertyDefined = function(object, property) {
        return is.object(object) && is.string(property) && property in object;
    };
    // propertyDefined method does not support 'all' and 'any' interfaces
    is.propertyDefined.api = [
        'not'
    ];
    // Array checks
    /* -------------------------------------------------------------------------- */ // is a given item in an array?
    is.inArray = function(value, array) {
        if (is.not.array(array)) return false;
        for(var i = 0; i < array.length; i++){
            if (array[i] === value) return true;
        }
        return false;
    };
    // inArray method does not support 'all' and 'any' interfaces
    is.inArray.api = [
        'not'
    ];
    // is a given array sorted?
    is.sorted = function(array, sign) {
        if (is.not.array(array)) return false;
        var predicate = comparator[sign] || comparator['>='];
        for(var i = 1; i < array.length; i++){
            if (!predicate(array[i], array[i - 1])) return false;
        }
        return true;
    };
    // API
    // Set 'not', 'all' and 'any' interfaces to methods based on their api property
    /* -------------------------------------------------------------------------- */ function setInterfaces() {
        var options = is;
        for(var option in options)if (hasOwnProperty.call(options, option) && is['function'](options[option])) {
            var interfaces = options[option].api || [
                'not',
                'all',
                'any'
            ];
            for(var i = 0; i < interfaces.length; i++){
                if (interfaces[i] === 'not') is.not[option] = not(is[option]);
                if (interfaces[i] === 'all') is.all[option] = all(is[option]);
                if (interfaces[i] === 'any') is.any[option] = any(is[option]);
            }
        }
    }
    setInterfaces();
    // Configuration methods
    // Intentionally added after setInterfaces function
    /* -------------------------------------------------------------------------- */ // change namespace of library to prevent name collisions
    // var preferredName = is.setNamespace();
    // preferredName.odd(3);
    // => true
    is.setNamespace = function() {
        root.is = previousIs;
        return this;
    };
    // set optional regexes to methods
    is.setRegexp = function(regexp, name) {
        for(var r in regexes1)if (hasOwnProperty.call(regexes1, r) && name === r) regexes1[r] = regexp;
    };
    return is;
});

},{}],"hcfvl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ArrMeths", ()=>_arrMethsDefault.default
);
parcelHelpers.export(exports, "ObjMeths", ()=>_objMethsDefault.default
);
parcelHelpers.export(exports, "StrMeths", ()=>_strMethsDefault.default
);
var _arrMeths = require("./ArrMeths");
var _arrMethsDefault = parcelHelpers.interopDefault(_arrMeths);
var _objMeths = require("./ObjMeths");
var _objMethsDefault = parcelHelpers.interopDefault(_objMeths);
var _strMeths = require("./StrMeths");
var _strMethsDefault = parcelHelpers.interopDefault(_strMeths);

},{"./ArrMeths":"fIQ9g","./ObjMeths":"ad3ip","./StrMeths":"652hd","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"fIQ9g":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class ArrMeths {
    /**
     * Объединить элементы массива в строку.
     * @param {array} stringList массив элементов.
     * @param {string} separator разделитель между элементами массива.
     * @param {string} prefix начало строки.
     * @param {string} postfix конец строки.
     * @returns {string}
     */ static joinToString(stringList, separator = " ", prefix = "", postfix = "") {
        return `${prefix}${stringList.join(separator)}${postfix}`;
    }
}
exports.default = ArrMeths;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"ad3ip":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class ObjMeths {
    /**
     * Извлечь значение ключа keyPath из объекта obj, а в случае его отсутствия
     * вызвать функцию defaultVal.
     * @param {object} obj объект из которого необходимо извлечь значение.
     * @param {string} chainOfKeys ключ целевого значения.
     * @param defaultVal функция, которая вызывается при отсутствии keyPath в obj.
     * @returns {*}
     */ static getValOrElse(obj, chainOfKeys, defaultVal = (key, path)=>path
    ) {
        const keyList = chainOfKeys.split(".");
        let result = obj;
        for (const key of keyList){
            result = result[key];
            if (result === undefined) return defaultVal(key, chainOfKeys);
        }
        return result;
    }
}
exports.default = ObjMeths;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"652hd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class StrMeths {
    /**
     * Получить пустую строку.
     * @returns {string}
     */ static get emptyStr() {
        return "";
    }
    /**
     * Получить строку, содержащую единственный пробел.
     * @returns {string}
     */ static get spaceChar() {
        return " ";
    }
    /**
     * Заменить подстроку, соответствующую регулярному выражению, созданному с помощью аргументов
     * функции (pattern, flags, after, before), в строке.
     * @param {string} str строка, в которой необходимо произвести замену подстроки.
     * @param {string} pattern основной шаблон регулярного выражения.
     * @param {string} alt значение, на которое будет заменена найденная подстрока.
     * @param {string} flags флаги регулярного выражения.
     * @param {string} after шаблон регулярного выражения, который находится перед pattern.
     * @param {string} before шаблон регулярного выражения, который находится после pattern.
     * @returns {string}
     */ static replacePattern(str, pattern, alt, flags = "", after = "", before = "") {
        const afterTarget = `(?<=${after})`;
        const beforeTarget = `(?=${before})`;
        const re = new RegExp(`${afterTarget}${pattern}${beforeTarget}`, flags);
        return str.replace(re, alt);
    }
    /**
     * Заменить пробельные символы в строке.
     * @param {string} str строка, в которой необходимо заменить пробельные символы.
     * @param {string} alt значение, на которое будут заменены пробельные символы.
     * @returns {string}
     */ static replaceSpaces(str1, alt1 = "") {
        return this.replacePattern(str1, "\\s+", alt1, "g");
    }
}
exports.default = StrMeths;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"iKUBW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "anchorComp", ()=>_anchorDefault.default
);
parcelHelpers.export(exports, "avatarComp", ()=>_avatarDefault.default
);
parcelHelpers.export(exports, "buttonComp", ()=>_buttonDefault.default
);
parcelHelpers.export(exports, "errorComp", ()=>_errorDefault.default
);
parcelHelpers.export(exports, "formComp", ()=>_formDefault.default
);
parcelHelpers.export(exports, "inputComp", ()=>_inputDefault.default
);
parcelHelpers.export(exports, "listComp", ()=>_listDefault.default
);
parcelHelpers.export(exports, "pageSettingsComp", ()=>_pageSettingsDefault.default
);
var _anchor = require("./anchor");
var _anchorDefault = parcelHelpers.interopDefault(_anchor);
var _avatar = require("./avatar");
var _avatarDefault = parcelHelpers.interopDefault(_avatar);
var _button = require("./button");
var _buttonDefault = parcelHelpers.interopDefault(_button);
var _error = require("./error");
var _errorDefault = parcelHelpers.interopDefault(_error);
var _form = require("./form");
var _formDefault = parcelHelpers.interopDefault(_form);
var _input = require("./input");
var _inputDefault = parcelHelpers.interopDefault(_input);
var _list = require("./list");
var _listDefault = parcelHelpers.interopDefault(_list);
var _pageSettings = require("./page-settings");
var _pageSettingsDefault = parcelHelpers.interopDefault(_pageSettings);

},{"./anchor":"inj3E","./avatar":"ju1qx","./button":"6BFoj","./error":"hvBPd","./form":"dK5yM","./input":"bqn4B","./list":"l7H3u","./page-settings":"2is3o","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"inj3E":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _template = require("./template");
var _templateDefault = parcelHelpers.interopDefault(_template);
exports.default = _templateDefault.default;

},{"./template":"i7bAo","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"i7bAo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = `
    <a href="{{anchor.ref}}" class="anchor {{anchor.className}}">{{anchor.text}}</a>
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ju1qx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _template = require("./template");
var _templateDefault = parcelHelpers.interopDefault(_template);
exports.default = _templateDefault.default;

},{"./template":"kbIRd","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"kbIRd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = `
    <div class="avatar {{avatar.classNames.container}}">
        <i data-alt="Изображение пользователя" class="avatar__img {{avatar.classNames.img}}"></i>
    </div>
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"6BFoj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _template = require("./template");
var _templateDefault = parcelHelpers.interopDefault(_template);
exports.default = _templateDefault.default;

},{"./template":"3ueYb","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"3ueYb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = `
    <button type="{{button.type}}" class="button {{button.className}}">
        {{button.text}}
    </button>
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"hvBPd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _compiler = require("../../plugins/template-engine/Compiler");
var _compilerDefault = parcelHelpers.interopDefault(_compiler);
var _template = require("./template");
var _templateDefault = parcelHelpers.interopDefault(_template);
var _anchor = require("../anchor");
var _anchorDefault = parcelHelpers.interopDefault(_anchor);
exports.default = _compilerDefault.default.compile(_templateDefault.default, {
    $data: {
        anchor: {
            className: "",
            ref: "../index.html",
            text: "Назад"
        }
    },
    $slots: {
        error: {
            end: _anchorDefault.default
        }
    }
});

},{"../../plugins/template-engine/Compiler":"a4HlE","./template":"kvC4K","../anchor":"inj3E","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"kvC4K":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = `
    <div class="error {{error.className}}">
        <span class="error__code">{{error.code}}</span>
        <span class="error__msg">{{error.msg}}</span>
        <slot name="error.end" />
    </div>
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"dK5yM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _compiler = require("../../plugins/template-engine/Compiler");
var _compilerDefault = parcelHelpers.interopDefault(_compiler);
var _template = require("./template");
var _templateDefault = parcelHelpers.interopDefault(_template);
var _anchor = require("../anchor");
var _anchorDefault = parcelHelpers.interopDefault(_anchor);
var _button = require("../button");
var _buttonDefault = parcelHelpers.interopDefault(_button);
var _utils = require("../../utils");
exports.default = _compilerDefault.default.compile(_templateDefault.default, {
    $data: {
        button: {
            className: "",
            type: "submit"
        }
    },
    $slots: {
        form: {
            footEnd: _utils.ArrMeths.joinToString([
                _buttonDefault.default,
                _anchorDefault.default
            ])
        }
    }
});

},{"../../plugins/template-engine/Compiler":"a4HlE","./template":"dbUFh","../anchor":"inj3E","../button":"6BFoj","../../utils":"hcfvl","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"dbUFh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = `
    <form class="form {{form.classNames.container}}">
        <fieldset class="form__fieldset {{form.classNames.fieldset}}">
            <div class="form__field-group {{form.classNames.fieldGroup}}">
                <div class="form__head {{form.classNames.head}}">
                    <legend class="form__legend">{{form.legend}}</legend>
                </div>
                <div class="form__body">
                    <slot name="form.body" />
                </div>
                <div class="form__foot">
                    <slot name="form.footEnd" />
                </div>
            </div>
        </fieldset>
    </form>
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"bqn4B":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _compiler = require("../../plugins/template-engine/Compiler");
var _compilerDefault = parcelHelpers.interopDefault(_compiler);
var _template = require("./template");
var _templateDefault = parcelHelpers.interopDefault(_template);
exports.default = _compilerDefault.default.compile(_templateDefault.default);

},{"../../plugins/template-engine/Compiler":"a4HlE","./template":"5V37F","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"5V37F":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = `
    <div class="field {{field.classNames.container}}">
        <div class="field__head {{field.classNames.head}}">
            <label for="{{field.id}}" class="field__label {{field.classNames.label}}">
                {{field.label}}
            </label>
        </div>
        <div class="field__body">
            <input type="{{field.type}}" name="{{field.name}}" id="{{field.id}}" class="field__input">
        </div>
        <div class="field__foot">
            <span class="field__label field__label_type_error">{{field.error}}</span>
        </div>
    </div>
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"l7H3u":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _template = require("./template");
var _templateDefault = parcelHelpers.interopDefault(_template);
exports.default = _templateDefault.default;

},{"./template":"kQAUc","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"kQAUc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = `
    <ul class="list">
        <for data="{{list.data}}" it="{{list.it}}">
            <li class="list__item {{list.classNames.item}}"><slot name="list.item" /></li>
        </for>
    </ul>
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"2is3o":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _compiler = require("../../plugins/template-engine/Compiler");
var _compilerDefault = parcelHelpers.interopDefault(_compiler);
var _ui = require("../../layouts/ui");
var _uiDefault = parcelHelpers.interopDefault(_ui);
var _components = require("./components");
const pageAreaClassName = "ui__area_page_settings";
exports.default = _compilerDefault.default.compile(_uiDefault.default, {
    $data: {
        userDnaCard: {
            name: "Имя пользователя"
        },
        ui: {
            classNames: {
                aside: `${pageAreaClassName} box-shadow`,
                container: "app",
                main: pageAreaClassName
            }
        }
    },
    $slots: {
        ui: {
            aside: _components.backBtnComp,
            main: _components.userDnaCardComp
        }
    }
});

},{"../../plugins/template-engine/Compiler":"a4HlE","../../layouts/ui":"jhrtN","./components":"i9Bf1","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"jhrtN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _template = require("./template");
var _templateDefault = parcelHelpers.interopDefault(_template);
exports.default = _templateDefault.default;

},{"./template":"aUfrL","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"aUfrL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = `
    <main class="ui {{ui.classNames.container}}">
        <section class="ui__area ui__area_id_aside {{ui.classNames.aside}}">
            <slot name="ui.aside" />
        </section>
        <section class="ui__area {{ui.classNames.main}}">
            <slot name="ui.main" />
        </section>
    </main>
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"i9Bf1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "backBtnComp", ()=>_backButtonDefault.default
);
parcelHelpers.export(exports, "userDnaCardComp", ()=>_userDnaCardDefault.default
);
var _backButton = require("./back-button");
var _backButtonDefault = parcelHelpers.interopDefault(_backButton);
var _userDnaCard = require("./user-dna-card");
var _userDnaCardDefault = parcelHelpers.interopDefault(_userDnaCard);

},{"./back-button":"g8S3j","./user-dna-card":"1Nirq","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"g8S3j":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _compiler = require("../../../../plugins/template-engine/Compiler");
var _compilerDefault = parcelHelpers.interopDefault(_compiler);
var _anchor = require("../../../anchor");
var _anchorDefault = parcelHelpers.interopDefault(_anchor);
var _utils = require("../../../../utils");
exports.default = _compilerDefault.default.compile(_anchorDefault.default, {
    $data: {
        anchor: {
            className: _utils.ArrMeths.joinToString([
                "anchor_icon",
                "anchor_icon_arrow-back",
                "anchor_icon_xl",
                "m_all_auto", 
            ]),
            text: ""
        }
    }
});

},{"../../../../plugins/template-engine/Compiler":"a4HlE","../../../anchor":"inj3E","../../../../utils":"hcfvl","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"1Nirq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _compiler = require("../../../../plugins/template-engine/Compiler");
var _compilerDefault = parcelHelpers.interopDefault(_compiler);
var _template = require("./template");
var _templateDefault = parcelHelpers.interopDefault(_template);
var _avatar = require("../../../avatar");
var _avatarDefault = parcelHelpers.interopDefault(_avatar);
exports.default = _compilerDefault.default.compile(_templateDefault.default, {
    $data: {
        avatar: {
            classNames: {
                container: "avatar_size_lg",
                img: "avatar__img_empty"
            },
            ref: "#"
        },
        userDnaCard: {
            classNames: {
                card: "m_all_auto"
            }
        }
    },
    $slots: {
        userDnaCard: {
            avatar: _avatarDefault.default
        }
    }
});

},{"../../../../plugins/template-engine/Compiler":"a4HlE","./template":"jabpr","../../../avatar":"ju1qx","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"jabpr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = `
    <section class="user-dna-card {{userDnaCard.classNames.card}}">
        <header class="user-dna-card__head">
            <slot name="userDnaCard.avatar" />
            <h2 class="user-dna-card__name {{userDnaCard.classNames.name}}">{{userDnaCard.name}}</h2>
        </header>
        <main class="user-dna-card__body">
            <slot name="userDnaCard.body" />
        </main>
        <footer class="user-dna-card__foot {{userDnaCard.classNames.foot}}">
            <slot name="userDnaCard.foot" />
        </footer>
    </section>
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"dystJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "menuComp", ()=>_menuDefault.default
);
parcelHelpers.export(exports, "userDnaItemsComp", ()=>_userDnaItemsDefault.default
);
var _menu = require("./menu");
var _menuDefault = parcelHelpers.interopDefault(_menu);
var _userDnaItems = require("./user-dna-items");
var _userDnaItemsDefault = parcelHelpers.interopDefault(_userDnaItems);

},{"./menu":"jDrSS","./user-dna-items":"iedgy","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"jDrSS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _compiler = require("../../../../plugins/template-engine/Compiler");
var _compilerDefault = parcelHelpers.interopDefault(_compiler);
var _components = require("../../../../components");
var _utils = require("../../../../components/list/utils");
var _utilsDefault = parcelHelpers.interopDefault(_utils);
const listProto = _utilsDefault.default.methods.createComp(_components.anchorComp, "anchor");
const menuContext = {
    $data: {
        items: [
            {
                className: "",
                ref: "../edit-user-dna/index.html",
                text: "Изменить данные"
            },
            {
                className: "",
                ref: "../edit-user-password/index.html",
                text: "Изменить пароль"
            },
            {
                className: "anchor_color_error",
                ref: "../sign-in/index.html",
                text: "Выйти"
            }, 
        ]
    }
};
exports.default = _compilerDefault.default.compile(listProto, menuContext);

},{"../../../../plugins/template-engine/Compiler":"a4HlE","../../../../components":"iKUBW","../../../../components/list/utils":"t4iOp","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"t4iOp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utils = require("./utils");
var _utilsDefault = parcelHelpers.interopDefault(_utils);
exports.default = {
    methods: _utilsDefault.default
};

},{"./utils":"2nZbA","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"2nZbA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _compiler = require("../../../plugins/template-engine/Compiler");
var _compilerDefault = parcelHelpers.interopDefault(_compiler);
var _index = require("../index");
var _indexDefault = parcelHelpers.interopDefault(_index);
var _utils = require("../../../utils");
function createComp(comp, compKey, opts = {
}) {
    const { arrKey ="items" , itemClassName ="" , itKey ="$it" , useSeparator =true  } = opts;
    return _compilerDefault.default.compile(_indexDefault.default, {
        $data: {
            list: {
                classNames: {
                    item: _utils.ArrMeths.joinToString([
                        itemClassName,
                        useSeparator ? "list__item_with_separator" : "", 
                    ])
                },
                data: arrKey,
                it: itKey
            }
        },
        $slots: {
            list: {
                item: _utils.StrMeths.replacePattern(comp, compKey, itKey, "gi", "", "\\.")
            }
        }
    });
}
exports.default = {
    createComp
};

},{"../../../plugins/template-engine/Compiler":"a4HlE","../index":"l7H3u","../../../utils":"hcfvl","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"iedgy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _compiler = require("../../../../plugins/template-engine/Compiler");
var _compilerDefault = parcelHelpers.interopDefault(_compiler);
var _template = require("./template");
var _templateDefault = parcelHelpers.interopDefault(_template);
var _utils = require("../../../../components/list/utils");
var _utilsDefault = parcelHelpers.interopDefault(_utils);
const listProto = _utilsDefault.default.methods.createComp(_templateDefault.default, "userDnaItem", {
    itemClassName: "list__item_cols_pair"
});
const userDnaItems = {
    $data: {
        items: [
            {
                term: "Почта",
                def: "user-email@here.ok"
            },
            {
                term: "Логин",
                def: "Мой логин"
            },
            {
                term: "Имя",
                def: "Мое имя"
            },
            {
                term: "Фамилия",
                def: "Моя фамилия"
            },
            {
                term: "Имя в чате",
                def: "Мое имя в чате"
            },
            {
                term: "Телефон",
                def: "+7(123)456-78-90"
            }, 
        ]
    }
};
exports.default = _compilerDefault.default.compile(listProto, userDnaItems);

},{"../../../../plugins/template-engine/Compiler":"a4HlE","./template":"7LqDY","../../../../components/list/utils":"t4iOp","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"7LqDY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = `
    <span class="user-dna-card__term">{{userDnaItem.term}}</span>
    <span class="user-dna-card__def">{{userDnaItem.def}}</span>
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["8sQ4y","6j3Sz"], "6j3Sz", "parcelRequire0866")

//# sourceMappingURL=index.e1d0cd7d.js.map

module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var listToStyles = __webpack_require__(67)

module.exports = function (parentId, list, isProduction, context) {
  if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
    context = __VUE_SSR_CONTEXT__
  }
  if (context) {
    if (!context.hasOwnProperty('styles')) {
      Object.defineProperty(context, 'styles', {
        enumberable: true,
        get: function() {
          return renderStyles(context._styles)
        }
      })
    }

    var styles = context._styles || (context._styles = {})
    list = listToStyles(parentId, list)
    if (isProduction) {
      addStyleProd(styles, list)
    } else {
      addStyleDev(styles, list)
    }
  }
}

// In production, render as few style tags as possible.
// (mostly because IE9 has a limit on number of style tags)
function addStyleProd (styles, list) {
  for (var i = 0; i < list.length; i++) {
    var parts = list[i].parts
    for (var j = 0; j < parts.length; j++) {
      var part = parts[j]
      // group style tags by media types.
      var id = part.media || 'default'
      var style = styles[id]
      if (style) {
        if (style.ids.indexOf(part.id) < 0) {
          style.ids.push(part.id)
          style.css += '\n' + part.css
        }
      } else {
        styles[id] = {
          ids: [part.id],
          css: part.css,
          media: part.media
        }
      }
    }
  }
}

// In dev we use individual style tag for each module for hot-reload
// and source maps.
function addStyleDev (styles, list) {
  for (var i = 0; i < list.length; i++) {
    var parts = list[i].parts
    for (var j = 0; j < parts.length; j++) {
      var part = parts[j]
      styles[part.id] = {
        ids: [part.id],
        css: part.css,
        media: part.media
      }
    }
  }
}

function renderStyles (styles) {
  var css = ''
  for (var key in styles) {
    var style = styles[key]
    css += '<style data-vue-ssr-id="' + style.ids.join(' ') + '"' +
        (style.media ? ( ' media="' + style.media + '"' ) : '') + '>' +
        style.css + '</style>'
  }
  return css
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("vuex");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(5);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(4);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _vue = __webpack_require__(9);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(3);

var _vuex2 = _interopRequireDefault(_vuex);

var _componentsList = __webpack_require__(40);

var _componentsList2 = _interopRequireDefault(_componentsList);

var _renderToString = __webpack_require__(8);

var _renderToString2 = _interopRequireDefault(_renderToString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * 服务端渲染的路由处理
 */

_vue2.default.use(_vuex2.default

/*
 * 初始化store仓库
 */

);var store = new _vuex2.default.Store({
  modules: {}
});

// 实例化vue对象
var app = new _vue2.default({
  render: function render(h) {
    return h(_componentsList2.default);
  },
  store: store
});

module.exports = function (router) {
  var _this = this;

  router.get('/components', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var html;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _renderToString2.default)(app);

            case 2:
              html = _context.sent;

              // 向浏览器输出完整的html
              ctx.body = html;
              // 继续执行后面的中间件
              _context.next = 6;
              return next();

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(5);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(4);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _vue = __webpack_require__(9);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(3);

var _vuex2 = _interopRequireDefault(_vuex);

var _index = __webpack_require__(43);

var _index2 = _interopRequireDefault(_index);

var _renderToString = __webpack_require__(8);

var _renderToString2 = _interopRequireDefault(_renderToString);

var _sync = __webpack_require__(27);

var _sync2 = _interopRequireDefault(_sync);

var _async = __webpack_require__(26);

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * 服务端渲染的路由处理
 */

_vue2.default.use(_vuex2.default

/*
 * 初始化store仓库
 */
);

var store = new _vuex2.default.Store({
  modules: {
    sync: _sync2.default,
    async: _async2.default
  }
});
/*
 * 向异步的store中写入数据
 * 这个数据，在实际项目中，应该先从接口获取
 * 因为store设置了namespaced:true，因此，commit时，需要指定命名空间async
 */
store.commit('async/fetch', 'store on server');

// 实例化vue对象
var app = new _vue2.default({
  render: function render(h) {
    return h(_index2.default);
  },
  store: store
});

module.exports = function (router) {
  var _this = this;

  router.get('/', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var html;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _renderToString2.default)(app);

            case 2:
              html = _context.sent;

              // 向浏览器输出完整的html
              ctx.body = html;
              // 继续执行后面的中间件
              _context.next = 6;
              return next();

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vueServerRenderer = __webpack_require__(70);

var vsr = _interopRequireWildcard(_vueServerRenderer);

var _pify = __webpack_require__(69);

var _pify2 = _interopRequireDefault(_pify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/*
 * 服务端的把vue渲染为html的方法
 */

var renderer = vsr.createRenderer

/*
 * 返回基于promise的renderToString方法
 */
();module.exports = (0, _pify2.default)(renderer.renderToString.bind(renderer));

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("whatwg-fetch");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTemplatePath;
function getTemplatePath() {
  var templatePath = eval("let path = require('path');path.join(__dirname,'../')");
  return templatePath;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./components": 6,
	"./components.js": 6,
	"./index": 7,
	"./index.js": 7
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 12;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(3);

exports.default = {
  computed: (0, _vuex.mapState)({
    content: function content(state) {
      return state.async.content;
    }
  }),
  mounted: function mounted() {
    this.$store.dispatch('async/fetch');
  }
}; //
//
//
//
//

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _camelCase = __webpack_require__(68);

var _camelCase2 = _interopRequireDefault(_camelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    name: String,
    desc: String,
    props: Array,
    events: Array,
    slots: Array
  },
  data: function data() {
    return {
      showDetail: false
    };
  },

  components: {},
  methods: {
    toggleDetail: function toggleDetail() {
      this.showDetail = !this.showDetail;
    },
    setProp: function setProp(key, ev) {
      this.$children[0].$props[(0, _camelCase2.default)(key)] = ev.target.value;
    }
  },
  mounted: function mounted() {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _componentPanel = __webpack_require__(39);

var _componentPanel2 = _interopRequireDefault(_componentPanel);

var _headNavDark = __webpack_require__(42);

var _headNavDark2 = _interopRequireDefault(_headNavDark);

var _jichushareMessage = __webpack_require__(44);

var _jichushareMessage2 = _interopRequireDefault(_jichushareMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {};
  },

  components: {
    ComponentPanel: _componentPanel2.default,
    HeadNavDark: _headNavDark2.default,
    JichushareMessage: _jichushareMessage2.default
  },
  methods: {},
  mounted: function mounted() {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(10);

exports.default = {
  data: function data() {
    return {};
  },

  props: ['name'],
  components: {},
  methods: {
    fetchData: function fetchData() {
      var _this = this;

      setTimeout(function () {
        fetch('/package.json').then(function (res) {
          return res.json();
        }).then(function (body) {
          _this.name = body.name;
        });
      }, 1000);
    }
  },
  mounted: function mounted() {
    document.title = 'vue-demo';
    this.fetchData();
  }
}; //
//
//
//
//
//
//
//
//

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    logoUrl: String
  },
  data: function data() {
    return {};
  },

  components: {},
  methods: {},
  mounted: function mounted() {
    document.title = 'vue-demo';
  }
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sass = __webpack_require__(46);

var _sass2 = _interopRequireDefault(_sass);

var _pug = __webpack_require__(45);

var _pug2 = _interopRequireDefault(_pug);

var _fetch = __webpack_require__(41);

var _fetch2 = _interopRequireDefault(_fetch);

var _store = __webpack_require__(47);

var _store2 = _interopRequireDefault(_store);

var _asyncStore = __webpack_require__(38);

var _asyncStore2 = _interopRequireDefault(_asyncStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      message: 'Hello Vue'
    };
  },

  components: {
    Sass: _sass2.default,
    Pug: _pug2.default,
    Fetch: _fetch2.default,
    Store: _store2.default,
    AsyncStore: _asyncStore2.default
  },
  methods: {},
  mounted: function mounted() {
    document.title = 'vue-demo';
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(3);

exports.default = {
  data: function data() {
    return {
      showMessage: false
    };
  },

  computed: (0, _vuex.mapState)({}),
  mounted: function mounted() {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(3);

exports.default = {
  computed: (0, _vuex.mapState)({
    content: function content(state) {
      return state.sync.content;
    }
  })
}; //
//
//
//
//

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _regenerator = __webpack_require__(5);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(4);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koa = __webpack_require__(14);

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = __webpack_require__(15);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _fs = __webpack_require__(13);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(16);

var _path2 = _interopRequireDefault(_path);

var _getTemplatePath = __webpack_require__(11);

var _getTemplatePath2 = _interopRequireDefault(_getTemplatePath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default(); /*
                                * 服务端渲染的入口文件
                                */

var router = new _koaRouter2.default();

/*
 * 读取routes路径下的全部路由文件进行路由注册
 */
var routesDir = _path2.default.join(__dirname, 'routes');
var routeFiles = _fs2.default.readdirSync(routesDir);
routeFiles.forEach(function (file) {
  // 防止有一些隐藏文件对路由注册造成干扰
  var ext = _path2.default.extname(file);
  if (ext === '.js') {
    __webpack_require__(12)("./" + file)(router);
  }
});

app.use(router.routes());

/* 读取编译后的相应的html模板文件 */
var templatePath = (0, _getTemplatePath2.default)();
var templateMap = {
  default: _fs2.default.readFileSync(_path2.default.join(templatePath, 'index.html')).toString()
};
app.use(function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx.body = templateMap[ctx.template || 'default'].replace(/<!--content-->/, ctx.body);
            _context.next = 3;
            return next();

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

app.listen(3000);
/* WEBPACK VAR INJECTION */}.call(exports, "src/demo/server"))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(10);

exports.default = {
  namespaced: true,
  state: {
    // 初始化时，务必要把所有的数据成员做初始化，否则后面数据的更新，将不会触发显示的更新
    content: ''
  },
  mutations: {
    fetch: function fetch(state, content) {
      state.content = content;
    }
  },
  // 浏览器环境才可以使用actions来获取数据，服务端应该用Node.js的方式获取数据后，通过mutations同步的把数据存入到store
  actions: {
    fetch: function (_fetch) {
      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(function (_ref) {
      var commit = _ref.commit;

      fetch('/package.json').then(function (res) {
        return res.json();
      }).then(function (body) {
        commit('fetch', body.name);
      });
    })
  }
}; /*
    * 同步形式的store，设置好state中的值即可
    * namespaced为true，是为了避免store的module之间，getters、mutations、actions发生命名冲突
    */

// whatwg-fetch仅能在浏览器环境使用。

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * 同步形式的store，设置好state中的值即可
 * namespaced为true，是为了避免store的module之间，getters、mutations、actions发生命名冲突
 */

exports.default = {
  namespaced: true,
  state: {
    content: 'sync store'
  }
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".msg[data-v-1b81fe72]{height:1rem}.msg i[data-v-1b81fe72]{float:left;line-height:1rem;color:#fff4c8;font-size:.3rem;margin-right:.12rem;font-style:normal}.msg em[data-v-1b81fe72]{float:left;width:0;height:0;border:6px solid transparent;border-left:6px solid #fff4c8;margin-top:.36rem}.mask[data-v-1b81fe72]{display:none;position:fixed;width:100%;height:100%;background:#000;opacity:.6;filter:alpha(opacity=60);top:0;left:0;z-index:20}.layer[data-v-1b81fe72]{display:none;width:6.6rem;height:7.68rem;position:fixed;top:.8rem;left:50%;margin-left:-3.38rem;z-index:21;color:#000;animation:haha-data-v-1b81fe72 .6s cubic-bezier(1,-.49,0,1.5);color:#2f0c0a;background:#fff4c8;border:4px solid #fdcc0f;border-radius:.32rem}.layer p[data-v-1b81fe72]{font-size:.28rem;line-height:.44rem;margin:0 .24rem}.layer .tit[data-v-1b81fe72]{text-align:center;font-size:.3rem;line-height:.6rem;margin-top:5px}@keyframes haha-data-v-1b81fe72{0%{transform:scale(6);opacity:0}to{transform:scale(1);opacity:1}}.closebtn[data-v-1b81fe72]{position:absolute;cursor:pointer;left:50%;bottom:-1.2rem;margin-left:-.44rem;width:.88rem;height:.88rem;background:url(" + __webpack_require__(37) + ") no-repeat;background-size:100% 100%}", ""]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "a{color:#666;font-size:14px}", ""]);

// exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".head-nav-dark[data-v-284bfd44]{height:45px;background:#4c4c4c;color:#ddd;font-size:12px;position:relative;z-index:101}.wrapper[data-v-284bfd44]{width:1000px;margin:0 auto;position:relative}.site-top-v2-inner[data-v-284bfd44]{padding:6px 0 0;display:inline;float:right}.site-logo-compact[data-v-284bfd44]{display:inline-block;float:left;height:45px;width:130px;background-image:url(\"http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact.png\");background-image:image-set(url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact.png) 1x,url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact@2x.png) 2x);background-image:-webkit-image-set(url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact.png) 1x,url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact@2x.png) 2x);background-image:-moz-image-set(url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact.png) 1x,url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact@2x.png) 2x);background-image:-o-image-set(url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact.png) 1x,url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact@2x.png) 2x);background-image:-ms-image-set(url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact.png) 1x,url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact@2x.png) 2x);background-repeat:no-repeat;background-position:0 50%;background-size:100% auto}.site-nav-compact[data-v-284bfd44]{float:left;margin-left:10px}.site-nav-compact li[data-v-284bfd44]{float:left;height:45px;line-height:45px;font-size:14px}.site-nav-compact li a[data-v-284bfd44]{color:#fff;height:45px;line-height:45px;padding:0 10px;display:inline-block;-moz-transition:all .2s;-o-transition:all .2s;-webkit-transition:all .2s;transition:all .2s}.site-nav-compact li a[data-v-284bfd44]:hover{background:#393939;text-decoration:none;color:#f6554a}", ""]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".red{color:red}", ""]);

// exports


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".red{color:red}", ""]);

// exports


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".demo-detail{text-align:center;font-size:1rem}", ""]);

// exports


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".component-panel[data-v-c39f54b6]{margin:10px;background:#fff;border-radius:5px;padding:5px}.btns-panel[data-v-c39f54b6]{text-align:right}.btn-detail[data-v-c39f54b6]{display:inline-block;padding:4px 7px}h2[data-v-c39f54b6]{font-size:14px;font-weight:400;text-align:left;padding:4px 0;margin:0;float:left;color:#3380ff}.doc-block[data-v-c39f54b6]{text-align:left;border-bottom:1px solid #efefef;padding:20px 0 10px}.doc-block-head[data-v-c39f54b6]{font-weight:700}.doc-item[data-v-c39f54b6]{color:#999;line-height:30px;font-size:14px}.prop-name[data-v-c39f54b6]{color:#ff5d5d}.component-desc[data-v-c39f54b6]{color:#999}.prop-input[data-v-c39f54b6]{outline:0;border:1px solid #ccc;padding:4px 7px;display:block;box-sizing:border-box;width:100%}", ""]);

// exports


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAABTCAYAAADjsjsAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTM4NjRFMEU2MEE3MTFFN0IwQkNEM0U3ODBCNTY3QzUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTM4NjRFMEY2MEE3MTFFN0IwQkNEM0U3ODBCNTY3QzUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMzg2NEUwQzYwQTcxMUU3QjBCQ0QzRTc4MEI1NjdDNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMzg2NEUwRDYwQTcxMUU3QjBCQ0QzRTc4MEI1NjdDNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmlkducAAAbpSURBVHja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"

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(63),i.__inject__&&i.__inject__(ssrContext),i)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(53),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  "0e501486"
)

module.exports = Component.exports


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(66),i.__inject__&&i.__inject__(ssrContext),i)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(57),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-c39f54b6",
  /* moduleIdentifier (server only) */
  "7d0eeb2c"
)

module.exports = Component.exports


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(60),i.__inject__&&i.__inject__(ssrContext),i)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(19),
  /* template */
  __webpack_require__(50),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  "4626c5ab"
)

module.exports = Component.exports


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(64),i.__inject__&&i.__inject__(ssrContext),i)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(20),
  /* template */
  __webpack_require__(55),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  "1e9dbb20"
)

module.exports = Component.exports


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(61),i.__inject__&&i.__inject__(ssrContext),i)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(21),
  /* template */
  __webpack_require__(51),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-284bfd44",
  /* moduleIdentifier (server only) */
  "26c2a363"
)

module.exports = Component.exports


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(65),i.__inject__&&i.__inject__(ssrContext),i)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(22),
  /* template */
  __webpack_require__(56),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  "0a507888"
)

module.exports = Component.exports


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(59),i.__inject__&&i.__inject__(ssrContext),i)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(23),
  /* template */
  __webpack_require__(49),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-1b81fe72",
  /* moduleIdentifier (server only) */
  "7c184c3c"
)

module.exports = Component.exports


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  null,
  /* template */
  __webpack_require__(54),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  "73215a38"
)

module.exports = Component.exports


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(62),i.__inject__&&i.__inject__(ssrContext),i)
}
var Component = __webpack_require__(0)(
  /* script */
  null,
  /* template */
  __webpack_require__(52),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  "1ed69ae8"
)

module.exports = Component.exports


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(58),i.__inject__&&i.__inject__(ssrContext),i)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(24),
  /* template */
  __webpack_require__(48),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  "c168add2"
)

module.exports = Component.exports


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._v(_vm._s(_vm.content))])
},staticRenderFns: []}

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports={render:function (){
var this$1 = this;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "jichushare-message"
  }, [_c('div', {
    staticClass: "msg",
    on: {
      "click": function () {
        this$1.showMessage = true
      }
    }
  }, [_c('i', [_vm._v("活动说明")]), _c('em')]), _vm._v(" "), _c('div', {
    staticClass: "mask",
    style: ({
      display: _vm.showMessage ? 'block' : 'none'
    })
  }), _vm._v(" "), _c('div', {
    staticClass: "layer",
    style: ({
      display: _vm.showMessage ? 'block' : 'none'
    })
  }, [_c('i', {
    staticClass: "closebtn",
    on: {
      "click": function () {
        this$1.showMessage = false
      }
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "tit"
  }, [_vm._v(" 活动说明 ")]), _vm._v(" "), _vm._m(0)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_vm._v("1、您需要连续三日截图分享到朋友圈、微信好友、QQ、微博后即可参与成功。"), _c('br'), _vm._v("\n2、该活动只限于没有体验过Z点操盘的用户，如果您已经体验过Z点操盘则我们将送您减80元的专属购买链接。"), _c('br'), _vm._v("\n3、登录用户任务完成后，可得50个金豆及Z点操盘7天免费体验。非登录情况下，参加活动无效。"), _c('br'), _vm._v("\n4、同一个账号（包括同一个设备、同一个账号、同一个身份证）只能参加一次分享活动。"), _c('br'), _vm._v("\n5、Z点操盘免费活动激活后我们会发放短信给您，免费体验有效期为7日（含激活当日）。"), _c('br'), _vm._v("\n6、您在参加活动成功后，我们将在3个工作日内发放金豆（积分）到您的金豆账户。"), _c('br'), _vm._v("\n7、活动时间：2017年8月25日-2017年9月15日"), _c('br'), _vm._v("\n8、最终解释权归金融界所有。"), _c('br')])
}]}

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "components-list"
  }, [_c('ComponentPanel', {
    attrs: {
      "name": "jichushare-message",
      "desc": "基础分享-活动说明",
      "props": [],
      "events": [],
      "slots": []
    }
  }, [_c('div', {
    staticStyle: {
      "background": "#f04337"
    }
  }, [_c('JichushareMessage')], 1)])], 1)
},staticRenderFns: []}

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "head-nav-dark clearfix"
  }, [_c('div', {
    staticClass: "wrapper"
  }, [_c('a', {
    staticClass: "site-logo-compact",
    style: ({
      backgroundImage: _vm.logoUrl ? ("url(" + _vm.logoUrl + ")") : ''
    }),
    attrs: {
      "href": "/"
    }
  }), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "site-search"
  }, [_vm._t("search")], 2)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', {
    staticClass: "site-nav-compact"
  }, [_c('li', [_c('a', {
    attrs: {
      "href": "/live/index.html",
      "target": "_self",
      "data-type": "live"
    }
  }, [_vm._v("直播")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "/match/",
      "target": "_self",
      "data-type": "match"
    }
  }, [_vm._v("炒股大赛")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "/ques/",
      "target": "_self",
      "data-type": "ques"
    }
  }, [_vm._v("问股")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "/portfolio/",
      "target": "_self",
      "data-type": "portfolio"
    }
  }, [_vm._v("组合")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "/view/",
      "target": "_self",
      "data-type": "viewpoint"
    }
  }, [_vm._v("观点")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "/account/",
      "target": "_self",
      "data-type": "account"
    }
  }, [_vm._v("找投顾")])]), _vm._v(" "), _c('li', {
    staticClass: "last"
  }, [_c('a', {
    attrs: {
      "href": "javascript:void(0);",
      "onclick": "javascript:JRJ.ui.isLogin(function(){window.location='/account/dynamic.jspa'});",
      "target": "_self",
      "data-type": "itougu"
    }
  }, [_vm._v("我的")])])])
}]}

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('router-link', {
    staticClass: "red",
    attrs: {
      "to": "/components"
    }
  }, [_vm._v("Hello Sass")])
},staticRenderFns: []}

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._v(_vm._s(_vm.content ? ("async store: " + _vm.content) : 'Loading...'))])
},staticRenderFns: []}

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._v("Hello Pug3")])
},staticRenderFns: []}

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._v(_vm._s(!_vm.name ? 'Loading...' : ("fetched name: " + _vm.name)))])
},staticRenderFns: []}

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "demo-wrapper"
  }, [_c('div', {
    staticClass: "demo-wrapper-inner"
  }, [_c('div', {
    staticClass: "demo-detail"
  }, [_vm._v(_vm._s(_vm.message))])]), _vm._v(" "), _c('sass'), _vm._v(" "), _c('pug'), _vm._v(" "), _c('fetch'), _vm._v(" "), _c('store'), _vm._v(" "), _c('async-store')], 1)
},staticRenderFns: []}

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "component-panel"
  }, [_vm._t("default"), _vm._v(" "), (_vm.showDetail === true) ? _c('div', {
    staticClass: "detail"
  }, [_c('ul', {
    staticClass: "doc-block"
  }, [_c('li', {
    staticClass: "doc-block-head"
  }, [_vm._v("Props")]), _vm._v(" "), _vm._l((_vm.props), function(item) {
    return _c('li', {
      staticClass: "doc-item"
    }, [_c('span', {
      staticClass: "prop-name"
    }, [_vm._v(_vm._s(item.name) + ":")]), _vm._v(" " + _vm._s(item.desc) + "\n        "), _c('input', {
      staticClass: "prop-input",
      on: {
        "input": function($event) {
          _vm.setProp(item.name, $event)
        }
      }
    })])
  })], 2), _vm._v(" "), _c('ul', {
    staticClass: "doc-block"
  }, [_c('li', {
    staticClass: "doc-block-head"
  }, [_vm._v("Events")]), _vm._v(" "), _vm._l((_vm.events), function(item) {
    return _c('li', {
      staticClass: "doc-item"
    }, [_c('span', {
      staticClass: "prop-name"
    }, [_vm._v(_vm._s(item.name) + ":")]), _vm._v(" " + _vm._s(item.desc))])
  })], 2), _vm._v(" "), _c('ul', {
    staticClass: "doc-block"
  }, [_c('li', {
    staticClass: "doc-block-head"
  }, [_vm._v("Slots")]), _vm._v(" "), _vm._l((_vm.slots), function(item) {
    return _c('li', {
      staticClass: "doc-item"
    }, [_c('span', {
      staticClass: "prop-name"
    }, [_vm._v(_vm._s(item.name) + ":")]), _vm._v(" " + _vm._s(item.desc))])
  })], 2)]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "btns-panel"
  }, [_c('h2', [_vm._v(_vm._s(_vm.name) + " "), _c('span', {
    staticClass: "component-desc"
  }, [_vm._v(_vm._s(_vm.desc))])]), _vm._v(" "), _c('a', {
    staticClass: "btn-detail",
    attrs: {
      "href": "javascript:;"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.toggleDetail($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.showDetail ? '收起' : '查看详细'))])])], 2)
},staticRenderFns: []}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("43b4a8fb", content, true, context)
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("6c47609e", content, true, context)
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("5e28ac92", content, true, context)
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("c017b4b6", content, true, context)
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(32);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("5123eb05", content, true, context)
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("346499ec", content, true, context)
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(34);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("2fe8397e", content, true, context)
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(35);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("e7febd46", content, true, context)
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(36);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("40a53680", content, true, context)
};

/***/ }),
/* 67 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = require("camel-case");

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("pify");

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = require("vue-server-renderer");

/***/ })
/******/ ]);
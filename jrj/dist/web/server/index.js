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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var listToStyles = __webpack_require__(47)

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

var _vue = __webpack_require__(50);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(3);

var _vuex2 = _interopRequireDefault(_vuex);

var _componentsList = __webpack_require__(31);

var _componentsList2 = _interopRequireDefault(_componentsList);

var _renderToString = __webpack_require__(20);

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

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".clearfix:after{content:\"\";display:block;clear:both}.clearfix{zoom:1;clear:both}a,p{text-align:justify}a{color:#2388da;font-size:12px}.fl{float:left}.fr{float:right}.tl{text-align:left}", ""]);

// exports


/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./demo": 6,
	"./demo.js": 6
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
webpackContext.id = 9;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(3);

exports.default = {
  data: function data() {
    return {};
  },

  props: ['data', 'width', 'keyword'],
  computed: (0, _vuex.mapState)({
    result: function result(state) {
      return state.zhikuanSearch.result;
    }
  }),
  components: {},
  methods: {
    search: function search(e) {
      e.preventDefault();
      var keyword = this.$refs.keyword.value;
      this.$store.dispatch('zhikuanSearch/search', { keyword: keyword });
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$watch('result', function (result) {
      _this.$emit('searchsuccess');
    });
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _camelCase = __webpack_require__(48);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _componentPanel = __webpack_require__(30);

var _componentPanel2 = _interopRequireDefault(_componentPanel);

var _headNavDark = __webpack_require__(32);

var _headNavDark2 = _interopRequireDefault(_headNavDark);

var _searchBar = __webpack_require__(34);

var _searchBar2 = _interopRequireDefault(_searchBar);

var _articleList = __webpack_require__(29);

var _articleList2 = _interopRequireDefault(_articleList);

var _jichushareMessage = __webpack_require__(33);

var _jichushareMessage2 = _interopRequireDefault(_jichushareMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      articleList: null
    };
  },

  components: {
    ComponentPanel: _componentPanel2.default,
    HeadNavDark: _headNavDark2.default,
    SearchBar: _searchBar2.default,
    ArticleList: _articleList2.default,
    JichushareMessage: _jichushareMessage2.default
  },
  methods: {
    showArticleList: function showArticleList() {
      var searchResult = this.$store.state.zhikuanSearch;
      this.articleList = [{
        title: '股票',
        count: searchResult.total,
        list: searchResult.result && searchResult.result.map(function (item) {
          return {
            title: item.stockName,
            link: item.stockUrl
          };
        })
      }];
    },
    cleanArticleList: function cleanArticleList() {
      this.articleList = null;
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

/***/ }),
/* 17 */
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
/* 18 */
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

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(3);

exports.default = {
  data: function data() {
    return {};
  },

  props: ['placeholder'],
  computed: (0, _vuex.mapState)({
    result: function result(state) {
      return state.zhikuanSearch.result;
    }
  }),
  components: {},
  methods: {
    search: function search(e) {
      e.preventDefault();
      var keyword = this.$refs.keyword.value;
      this.$store.dispatch('zhikuanSearch/search', { keyword: keyword });
    },
    keyEnter: function keyEnter(e) {
      var _this = this;

      if (e.keyCode === 13) {
        var keyword = this.$refs.keyword.value;
        this.$store.dispatch('zhikuanSearch/quotaList', { keyword: keyword }).then(function () {
          if (_this.$store.state.zhikuanSearch.isQuota) {
            window.open(_this.$store.state.zhikuanSearch.isQuota);
          } else {
            window.open('/search/stock/' + keyword);
          }
        }
        //这里冲突了，我也不知道哪个是对的哪个是错的，所以我把这个给注释了，
        // this.$store.dispatch('zhikuanSearch/quotaList', { keyword })
        // if (this.$store.state.zhikuanSearch.isQuota) {
        //
        // } else {
        //   window.open(`/search/stock/${keyword}`)
        // }
        );
      }
    }
  },
  mounted: function mounted() {
    this.$watch('result', function (result) {
      if (result) {
        this.$emit('searchsuccess');
      } else {
        this.$emit('searcherror');
      }
    });
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
//
//
//
//
//
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


var _vueServerRenderer = __webpack_require__(51);

var vsr = _interopRequireWildcard(_vueServerRenderer);

var _pify = __webpack_require__(49);

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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _regenerator = __webpack_require__(5);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(4);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koa = __webpack_require__(11);

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = __webpack_require__(12);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _fs = __webpack_require__(10);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(13);

var _path2 = _interopRequireDefault(_path);

var _getTemplatePath = __webpack_require__(8);

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
    __webpack_require__(9)("./" + file)(router);
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

app.listen(process.argv[2] || 3000);
/* WEBPACK VAR INJECTION */}.call(exports, "src/web/server"))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".msg[data-v-1b81fe72]{height:1rem}.msg i[data-v-1b81fe72]{float:left;line-height:1rem;color:#fff4c8;font-size:.3rem;margin-right:.12rem;font-style:normal}.msg em[data-v-1b81fe72]{float:left;width:0;height:0;border:6px solid transparent;border-left:6px solid #fff4c8;margin-top:.36rem}.mask[data-v-1b81fe72]{display:none;position:fixed;width:100%;height:100%;background:#000;opacity:.6;filter:alpha(opacity=60);top:0;left:0;z-index:20}.layer[data-v-1b81fe72]{display:none;width:6.6rem;height:7.68rem;position:fixed;top:.8rem;left:50%;margin-left:-3.38rem;z-index:21;color:#000;animation:haha-data-v-1b81fe72 .6s cubic-bezier(1,-.49,0,1.5);color:#2f0c0a;background:#fff4c8;border:4px solid #fdcc0f;border-radius:.32rem}.layer p[data-v-1b81fe72]{font-size:.28rem;line-height:.44rem;margin:0 .24rem}.layer .tit[data-v-1b81fe72]{text-align:center;font-size:.3rem;line-height:.6rem;margin-top:5px}@keyframes haha-data-v-1b81fe72{0%{transform:scale(6);opacity:0}to{transform:scale(1);opacity:1}}.closebtn[data-v-1b81fe72]{position:absolute;cursor:pointer;left:50%;bottom:-1.2rem;margin-left:-.44rem;width:.88rem;height:.88rem;background:url(" + __webpack_require__(28) + ") no-repeat;background-size:100% 100%}", ""]);

// exports


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "a{color:#666;font-size:14px}.components-list .search-bar{background:red}", ""]);

// exports


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".head-nav-dark[data-v-284bfd44]{height:45px;background:#4c4c4c;color:#ddd;font-size:12px;position:relative;z-index:101}.wrapper[data-v-284bfd44]{width:1000px;margin:0 auto;position:relative}.site-top-v2-inner[data-v-284bfd44]{padding:6px 0 0;display:inline;float:right}.site-logo-compact[data-v-284bfd44]{display:inline-block;float:left;height:45px;width:130px;background-image:url(\"http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact.png\");background-image:image-set(url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact.png) 1x,url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact@2x.png) 2x);background-image:-webkit-image-set(url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact.png) 1x,url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact@2x.png) 2x);background-image:-moz-image-set(url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact.png) 1x,url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact@2x.png) 2x);background-image:-o-image-set(url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact.png) 1x,url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact@2x.png) 2x);background-image:-ms-image-set(url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact.png) 1x,url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact@2x.png) 2x);background-repeat:no-repeat;background-position:0 50%;background-size:100% auto}.site-nav-compact[data-v-284bfd44]{float:left;margin-left:10px}.site-nav-compact li[data-v-284bfd44]{float:left;height:45px;line-height:45px;font-size:14px}.site-nav-compact li a[data-v-284bfd44]{color:#fff;height:45px;line-height:45px;padding:0 10px;display:inline-block;-moz-transition:all .2s;-o-transition:all .2s;-webkit-transition:all .2s;transition:all .2s}.site-nav-compact li a[data-v-284bfd44]:hover{background:#393939;text-decoration:none;color:#f6554a}", ""]);

// exports


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports
exports.i(__webpack_require__(7), "");

// module
exports.push([module.i, ".article-list[data-v-76f571f4]{width:100%;border-top:1px solid #ccc;background:#fff;font-size:12px;z-index:999999;text-align:left}.newsTitle[data-v-76f571f4]{background:#f2f2f2;height:22px;line-height:22px;font-size:12px;padding:0 9px}.newsTitle a[data-v-76f571f4]{color:#000}.newsTitle a[data-v-76f571f4]:hover{text-decoration:underline}.newList[data-v-76f571f4]{line-height:20px;padding:0 9px;margin-bottom:10px}.newList li a[data-v-76f571f4]{color:#000}.newList li a[data-v-76f571f4]:hover{text-decoration:underline}", ""]);

// exports


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".component-panel[data-v-c39f54b6]{margin:10px;background:#fff;border-radius:5px;padding:5px}.btns-panel[data-v-c39f54b6]{text-align:right}.btn-detail[data-v-c39f54b6]{display:inline-block;padding:4px 7px}h2[data-v-c39f54b6]{font-size:14px;font-weight:400;text-align:left;padding:4px 0;margin:0;float:left;color:#3380ff}.doc-block[data-v-c39f54b6]{text-align:left;border-bottom:1px solid #efefef;padding:20px 0 10px}.doc-block-head[data-v-c39f54b6]{font-weight:700}.doc-item[data-v-c39f54b6]{color:#999;line-height:30px;font-size:14px}.prop-name[data-v-c39f54b6]{color:#ff5d5d}.component-desc[data-v-c39f54b6]{color:#999}.prop-input[data-v-c39f54b6]{outline:0;border:1px solid #ccc;padding:4px 7px;display:block;box-sizing:border-box;width:100%}", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports
exports.i(__webpack_require__(7), "");

// module
exports.push([module.i, ".search-bar[data-v-fe8892e6]{width:100%;height:24px;line-height:0}form[data-v-fe8892e6]{position:relative;text-align:left}input[data-v-fe8892e6]{outline:0;border:0;background:0;color:#666}.search_t[data-v-fe8892e6]{width:100%;height:24px;line-height:24px;font-size:12px;padding-left:10px}.search_t[data-v-fe8892e6]::-webkit-input-placeholder{color:#bfbec0}", ""]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAABTCAYAAADjsjsAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTM4NjRFMEU2MEE3MTFFN0IwQkNEM0U3ODBCNTY3QzUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTM4NjRFMEY2MEE3MTFFN0IwQkNEM0U3ODBCNTY3QzUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMzg2NEUwQzYwQTcxMUU3QjBCQ0QzRTc4MEI1NjdDNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMzg2NEUwRDYwQTcxMUU3QjBCQ0QzRTc4MEI1NjdDNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmlkducAAAbpSURBVHja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"

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(44),i.__inject__&&i.__inject__(ssrContext),i)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(14),
  /* template */
  __webpack_require__(38),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-76f571f4",
  /* moduleIdentifier (server only) */
  "fdc40962"
)

module.exports = Component.exports


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(45),i.__inject__&&i.__inject__(ssrContext),i)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(15),
  /* template */
  __webpack_require__(39),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-c39f54b6",
  /* moduleIdentifier (server only) */
  "7d0eeb2c"
)

module.exports = Component.exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(42),i.__inject__&&i.__inject__(ssrContext),i)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(36),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  "4626c5ab"
)

module.exports = Component.exports


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(43),i.__inject__&&i.__inject__(ssrContext),i)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(37),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-284bfd44",
  /* moduleIdentifier (server only) */
  "26c2a363"
)

module.exports = Component.exports


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(41),i.__inject__&&i.__inject__(ssrContext),i)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(35),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-1b81fe72",
  /* moduleIdentifier (server only) */
  "7c184c3c"
)

module.exports = Component.exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(46),i.__inject__&&i.__inject__(ssrContext),i)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(19),
  /* template */
  __webpack_require__(40),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-fe8892e6",
  /* moduleIdentifier (server only) */
  "7e9cdaa8"
)

module.exports = Component.exports


/***/ }),
/* 35 */
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
  }, [_vm._v("活动说明")]), _vm._v(" "), _vm._m(0)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_vm._v("1、您需要连续三日截图分享到朋友圈、微信好友、QQ、微博后，即可参与成功"), _c('br'), _vm._v(" 2、该活动只限于没有体验过Z点操盘的用户，如果您已经体验过z点操盘，则我们将送你8折购买优惠券\n      "), _c('br'), _vm._v(" 3、你在分享时一定处在登录状态，分享后我们才能发金豆和Z点操盘7天免费体验。非登录情况下，参加活动无效。\n      "), _c('br'), _vm._v(" 4、同一个账号（包括同一个设备、同一个账号、同一个身份证）只能参加一次分享活动。\n      "), _c('br'), _vm._v(" 5、Z点操盘免费活动激活后，我们会发放短信给您，请您及时使用。从激活开始算起7天后免费体验结束。\n      "), _c('br'), _vm._v(" 6、您在参加活动成功后，我们将在3个工作日内发放金豆（积分），到您的积分商场。\n    ")])
}]}

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "components-list"
  }, [_c('ComponentPanel', {
    attrs: {
      "name": "head-nav-dark",
      "desc": "金融界网站头部深色导航2",
      "props": [{
        name: 'logo-url',
        desc: '替换logo图片'
      }],
      "events": [{
        name: 'logoclick',
        desc: '点击logo触发的事件'
      }],
      "slots": [{
        name: 'search',
        desc: '用于插入搜索框'
      }]
    }
  }, [_c('HeadNavDark')], 1), _vm._v(" "), _c('ComponentPanel', {
    attrs: {
      "name": "search-bar",
      "desc": "搜索框",
      "props": [{
        name: 'placeholder',
        desc: '替换文本'
      }],
      "events": [{
        name: 'searchsuccess',
        desc: '搜索完成时触发'
      }],
      "slots": [

      ]
    }
  }, [_c('SearchBar', {
    attrs: {
      "placeholder": "支持搜索股票、主题、信号、指标、资讯、研报"
    },
    on: {
      "searchsuccess": _vm.showArticleList,
      "searcherror": _vm.cleanArticleList
    }
  })], 1), _vm._v(" "), _c('ComponentPanel', {
    attrs: {
      "name": "search-bar",
      "desc": "文章列表块",
      "props": [{
        name: 'data',
        desc: "传入的数据。数据结构：[{\n            title:'资讯',\n            count:22,\n            moreLink:'http://10.77.4.23:8081/dbus/search/infor/list.shtml?w=00',\n            list:[{\n                title:'预告：乐视网临时股东大会将于今日下午14：00召开',\n                link:'http://localhost:8000/dbus/news/0000000000000ip3k8.shtml?searchval=00'\n            }]\n        },{\n            title:'研报',\n            count:5,\n            moreLink:'http://10.77.4.23:8081/dbus/search/infor/list.shtml?w=00',\n            list:[{\n                title:'China CYTS Tours Alert:Post Result Update Con Call on April 24',\n                link:'http://localhost:8000/dbus/stock/reportinfo/0000000000000hw282.shtml?searchval=00'\n            }]\n        }]"
      }],
      "events": [

      ],
      "slots": [

      ]
    }
  }, [_c('ArticleList', {
    attrs: {
      "data": _vm.articleList,
      "width": "498"
    }
  })], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 37 */
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
/* 38 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "article-list"
  }, _vm._l((_vm.data), function(block) {
    return (_vm.data && _vm.data.length > 0) ? _c('div', [(block.count != 0) ? [_c('p', {
      staticClass: "c999 clearfix newsTitle"
    }, [_c('span', {
      staticClass: "fl title"
    }, [_vm._v(_vm._s(block.title))]), _vm._v(" "), _c('router-link', {
      staticClass: "fr",
      attrs: {
        "to": {
          name: 'search',
          params: {
            linkText: block.linkText,
            keyword: _vm.keyword
          }
        }
      }
    }, [_vm._v("共" + _vm._s(block.count) + "条相关" + _vm._s(block.title) + ">>")])], 1), _vm._v(" "), _c('ul', {
      staticClass: "newList"
    }, _vm._l((block.list), function(article) {
      return _c('li', [_c('a', {
        attrs: {
          "href": article.link
        }
      }, [_vm._v(_vm._s(article.title))])])
    }))] : _vm._e()], 2) : _vm._e()
  }))
},staticRenderFns: []}

/***/ }),
/* 39 */
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
/* 40 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "search-bar"
  }, [_c('form', {
    on: {
      "submit": function($event) {
        _vm.search($event)
      }
    }
  }, [_c('input', {
    ref: "keyword",
    staticClass: "search_t",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": _vm.placeholder,
      "autocomplete": "off"
    },
    on: {
      "input": function($event) {
        _vm.search($event)
      },
      "keyup": function($event) {
        _vm.keyEnter($event)
      }
    }
  })])])
},staticRenderFns: []}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(22);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("6c47609e", content, true, context)
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("5e28ac92", content, true, context)
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("c017b4b6", content, true, context)
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("85e05c5e", content, true, context)
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("40a53680", content, true, context)
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("75f3e00b", content, true, context)
};

/***/ }),
/* 47 */
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
/* 48 */
/***/ (function(module, exports) {

module.exports = require("camel-case");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("pify");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("vue-server-renderer");

/***/ })
/******/ ]);
(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/App.jsx", function(exports, require, module) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Content = _interopRequireDefault(require("./content/Content"));

var _Nav = _interopRequireDefault(require("./nav/Nav"));

var _Footer = _interopRequireDefault(require("./footer/Footer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var App = /*#__PURE__*/function (_React$Component) {
  _inherits(App, _React$Component);

  var _super = _createSuper(App);

  function App() {
    _classCallCheck(this, App);

    return _super.apply(this, arguments);
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Nav["default"], null), /*#__PURE__*/_react["default"].createElement(_Content["default"], null), /*#__PURE__*/_react["default"].createElement(_Footer["default"], null));
    }
  }]);

  return App;
}(_react["default"].Component);

exports["default"] = App;
});

;require.register("components/content/Content.js", function(exports, require, module) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var data = require('../../playlist');

var Content = function Content() {
  var _useState = (0, _react.useState)({
    playlist: '',
    suffle: false,
    playing: {
      isSongPlaying: false,
      song: ''
    },
    lastPlayingSong: ''
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var audioElement = (0, _react.useRef)();
  var playlist = state.playlist,
      suffle = state.suffle,
      _state$playing = state.playing,
      isSongPlaying = _state$playing.isSongPlaying,
      song = _state$playing.song,
      lastPlayingSong = state.lastPlayingSong;
  (0, _react.useEffect)(function () {
    setState(_objectSpread(_objectSpread({}, state), {}, {
      playlist: data["default"],
      playing: {
        isSongPlaying: false,
        song: data["default"][0]
      },
      lastPlayingSong: data["default"][data["default"].length - 1]
    }));
  }, []);

  var getRandomNumber = function getRandomNumber() {
    return Math.floor(Math.random() * Math.floor(playlist.length));
  };

  var getIndexOfSong = function getIndexOfSong(song) {
    return playlist.findIndex(function (el) {
      if (el.id === song.id) {
        return true;
      }
    });
  };

  var next = function next(e) {
    e.preventDefault();
    var nextSongIndex;

    if (suffle) {
      nextSongIndex = getRandomNumber();
    } else {
      var getIndexOfCurrentSong = getIndexOfSong(song);
      nextSongIndex = getIndexOfCurrentSong < data["default"].length - 1 ? getIndexOfCurrentSong + 1 : 0;
    }

    setState(_objectSpread(_objectSpread({}, state), {}, {
      playing: _objectSpread(_objectSpread({}, state.playing), {}, {
        isSongPlaying: true,
        song: playlist[nextSongIndex]
      }),
      lastPlayingSong: song
    }));
  };

  var prev = function prev(e) {
    e.preventDefault();
    setState(_objectSpread(_objectSpread({}, state), {}, {
      playing: _objectSpread(_objectSpread({}, state.playing), {}, {
        isSongPlaying: true,
        song: lastPlayingSong
      })
    }));
  };

  var action = function action(e) {
    e.preventDefault();

    if (isSongPlaying) {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        playing: _objectSpread(_objectSpread({}, state.playing), {}, {
          isSongPlaying: false
        })
      }));
      audioElement.pause();
    } else {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        playing: _objectSpread(_objectSpread({}, state.playing), {}, {
          isSongPlaying: true
        })
      }));
      audioElement.play();
    }
  };

  var handleSuffle = function handleSuffle() {
    setState(_objectSpread(_objectSpread({}, state), {}, {
      suffle: !suffle
    }));
  };

  var playSong = function playSong(e, song) {
    e.preventDefault();
    setState(_objectSpread(_objectSpread({}, state), {}, {
      playing: _objectSpread(_objectSpread({}, state.playing), {}, {
        isSongPlaying: true,
        song: song
      })
    }));
  };

  (0, _react.useEffect)(function () {
    if (song && isSongPlaying) audioElement.play();
  }, [song]);

  var displayPlaylist = function displayPlaylist() {
    return playlist.map(function (el) {
      var id = el.id,
          album = el.album,
          artist = el.artist,
          track = el.track;
      return /*#__PURE__*/_react["default"].createElement("li", {
        key: id
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(song && song.id === id ? 'song-card-body-focus' : 'song-card-body'),
        onClick: function onClick(e) {
          return playSong(e, el);
        },
        tabIndex: "0"
      }, /*#__PURE__*/_react["default"].createElement("h5", {
        className: "title"
      }, track), /*#__PURE__*/_react["default"].createElement("p", {
        className: "song-description"
      }, "".concat(artist, " - ").concat(album))));
    });
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react["default"].createElement("audio", {
    className: "audio",
    ref: function ref(input) {
      audioElement = input;
    },
    controls: true,
    src: song.url
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "song-title"
  }, song.track), /*#__PURE__*/_react["default"].createElement("ul", {
    className: "nav-buttons"
  }, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: prev,
    className: "button btn-left"
  }, "Prev")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: action,
    className: "button btn-middle"
  }, isSongPlaying ? 'Pause' : 'Play')), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: next,
    className: "button btn-right"
  }, "Next")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "container playlist-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "playlist-header"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "playlist-container"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-muted"
  }, "PLAYLIST")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-check-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-check"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    className: "form-check-input",
    name: "suffle",
    type: "checkbox",
    onChange: handleSuffle,
    value: suffle,
    checked: suffle,
    id: "flexCheckDefault"
  }), /*#__PURE__*/_react["default"].createElement("label", {
    className: "form-check-label",
    htmlFor: "flexCheckDefault"
  }, "Shuffle")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "songs-list"
  }, /*#__PURE__*/_react["default"].createElement("ul", null, playlist ? displayPlaylist() : ''))));
};

var _default = Content;
exports["default"] = _default;
});

;require.register("components/footer/Footer.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Footer = function Footer() {
  var getYear = function getYear() {
    var date = new Date();
    return date.getFullYear();
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "cpy-right text-center py-3"
  }, /*#__PURE__*/_react["default"].createElement("p", null, "\xA9 ", getYear(), " NIK-DJETELI. All rights reserved."));
};

var _default = Footer;
exports["default"] = _default;
});

require.register("components/nav/Nav.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Nav = function Nav() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "Nav"
  }, /*#__PURE__*/_react["default"].createElement("nav", {
    className: "navbar navbar-light bg-light mb-3"
  }, /*#__PURE__*/_react["default"].createElement("a", {
    href: "/",
    className: "navbar-brand"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: "https://my-lab-1.s3.amazonaws.com/file-1574398835047.jpeg",
    width: "30",
    height: "30",
    className: "d-inline-block align-top",
    alt: ""
  }))));
};

var _default = Nav;
exports["default"] = _default;
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react = _interopRequireDefault(require("react"));

var _App = _interopRequireDefault(require("components/App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

document.addEventListener('DOMContentLoaded', function () {
  _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(_App["default"], null), document.querySelector('#app'));
});
});

;require.register("playlist.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = [{
  artist: 'Frank Ocean',
  album: 'channel ORANGE',
  track: 'Sweet Life',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/frank_ocean_sweet_life.mp3',
  id: '7a187a2c-e6fe-46a6-a8d4-5b5984da3de3'
}, {
  artist: 'Grace Jones',
  album: 'Bulletproof Heart',
  track: 'On My Way',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/grace_jones_on_my_way.mp3',
  id: '9f6b44a3-0d57-4ae1-bfab-2447adf6eaf0'
}, {
  artist: 'Junior Boys',
  album: 'Big Black Coat',
  track: 'You Say That',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/junior_boys_you_say_that.mp3',
  id: '1c8d7409-59fb-4bf8-9ee6-8a328559754a'
}, {
  artist: 'Kate Bush',
  album: 'Hounds of Love',
  track: 'Running Up That Hill',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/kate_bush_running_up_that_hill.mp3',
  id: 'a27f140e-082d-4004-9368-1c7bfd84e9d0'
}, {
  artist: 'King',
  album: 'We Are King',
  track: 'Supernatural',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/king_supernatural.mp3',
  id: '0a78d3b2-7dc6-462b-8d8c-a5310ccb6451'
}, {
  artist: 'Terry Riley',
  album: 'Persian Surgery Dervishes',
  track: 'Performance 1, part 1',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/terry_riley_persian_surgery_dervises_performance_1_part_1.mp3',
  id: 'd7e10f3c-e967-43f8-babc-14ce537a2578'
}];
exports["default"] = _default;
});

;require.alias("buffer/index.js", "buffer");
require.alias("events/events.js", "events");
require.alias("path-browserify/index.js", "path");
require.alias("process/browser.js", "process");
require.alias("stream-browserify/index.js", "stream");
require.alias("string_decoder/lib/string_decoder.js", "string_decoder");
require.alias("util/util.js", "sys");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map
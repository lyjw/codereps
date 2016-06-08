module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Panel = function (_Component) {
	  _inherits(Panel, _Component);

	  function Panel() {
	    _classCallCheck(this, Panel);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Panel).apply(this, arguments));
	  }

	  _createClass(Panel, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { id: "user-panel" },
	        _react2.default.createElement(
	          "div",
	          { id: "main-panel" },
	          _react2.default.createElement(
	            "div",
	            { className: "name-header" },
	            _react2.default.createElement(
	              "h4",
	              null,
	              this.props.user.name
	            ),
	            _react2.default.createElement("span", { className: "glyphicon glyphicon-cog toggle-settings", ariaHidden: "true" })
	          ),
	          _react2.default.createElement(
	            "div",
	            { id: "user-settings" },
	            _react2.default.createElement(
	              "div",
	              { className: "row" },
	              _react2.default.createElement(
	                "div",
	                { className: "col-md-4 col-md-offset-1" },
	                _react2.default.createElement(
	                  "span",
	                  { className: "settings-heading" },
	                  "Experience"
	                )
	              ),
	              _react2.default.createElement(
	                "div",
	                { className: "col-md-7" },
	                _react2.default.createElement(
	                  "p",
	                  null,
	                  this.props.user.experience
	                )
	              ),
	              _react2.default.createElement(
	                "div",
	                { className: "col-md-4 col-md-offset-1" },
	                _react2.default.createElement(
	                  "span",
	                  { className: "settings-heading" },
	                  "Languages"
	                )
	              ),
	              _react2.default.createElement(
	                "div",
	                { className: "col-md-7" },
	                _react2.default.createElement(
	                  "p",
	                  null,
	                  this.props.user.languages
	                )
	              ),
	              _react2.default.createElement(
	                "div",
	                { className: "col-md-10 col-md-offset-1 text-center" },
	                _react2.default.createElement("hr", null),
	                _react2.default.createElement(
	                  "div",
	                  null,
	                  "You are currently working on ",
	                  _react2.default.createElement("br", null),
	                  _react2.default.createElement(
	                    "strong",
	                    null,
	                    this.props.user.challengeRecords.length
	                  ),
	                  " reps."
	                ),
	                _react2.default.createElement(
	                  "a",
	                  { href: "/users/settings" },
	                  _react2.default.createElement(
	                    "button",
	                    { className: "btn btn-default" },
	                    "Edit Settings"
	                  )
	                )
	              )
	            )
	          ),
	          _react2.default.createElement("hr", null),
	          _react2.default.createElement(
	            "div",
	            { className: "stats-container text-center" },
	            _react2.default.createElement(
	              "div",
	              { className: "stats-heading" },
	              "Current Streak"
	            ),
	            _react2.default.createElement(
	              "div",
	              { className: "stats-value" },
	              this.props.user.streakCount.length
	            )
	          ),
	          _react2.default.createElement(
	            "div",
	            { className: "stats-container text-center" },
	            _react2.default.createElement(
	              "div",
	              { className: "stats-heading" },
	              "Reps Completed"
	            ),
	            _react2.default.createElement(
	              "div",
	              { className: "stats-value" },
	              this.props.user.repsCompleted
	            )
	          ),
	          _react2.default.createElement(
	            "div",
	            { id: "user-footer" },
	            _react2.default.createElement(
	              "a",
	              { href: "/users/logout" },
	              "Log Out"
	            )
	          )
	        ),
	        _react2.default.createElement(
	          "div",
	          { id: "side-panel" },
	          _react2.default.createElement("span", { className: "glyphicon glyphicon-triangle-right toggle-panel", ariaHidden: "true" })
	        )
	      );
	    }
	  }]);

	  return Panel;
	}(_react.Component);

	exports.default = Panel;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ }
/******/ ]);
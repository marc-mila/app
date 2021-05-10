"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

var _transitions = require("@material-ui/core/styles/transitions");

var _classnames = _interopRequireDefault(require("classnames"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var styles = function styles(theme) {
  return {
    root: {
      width: 256,
      height: 256,
      fontFamily: theme.typography.fontFamily,
      cursor: 'default'
    },
    circle: {
      width: 256,
      height: 256,
      borderRadius: '50%',
      background: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],
      color: theme.palette.text.primary,
      position: 'relative'
    },
    number: {
      width: 32,
      height: 32,
      left: 'calc(50% - 16px)',
      top: 'calc(50% - 16px)',
      position: 'absolute',
      textAlign: 'center',
      lineHeight: '32px',
      cursor: 'pointer',
      fontSize: '14px',
      pointerEvents: 'none',
      userSelect: 'none',
      '&.selected': {
        color: (0, _colorManipulator.getContrastRatio)(theme.palette.primary.main, theme.palette.common.black) < 7 ? theme.palette.common.white : theme.palette.common.black
      }
    },
    smallNumber: {
      fontSize: '12px',
      color: theme.palette.text.secondary
    },
    pointer: {
      width: 'calc(50% - 20px)',
      height: 2,
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      left: '50%',
      top: 'calc(50% - 1px)',
      transformOrigin: 'left center',
      pointerEvents: 'none'
    },
    animatedPointer: {
      transition: "all ".concat(_transitions.duration["short"], "ms ").concat(_transitions.easing.easeInOut)
    },
    smallPointer: {
      width: 'calc(50% - 52px)'
    },
    innerDot: {
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      top: -4 + 1,
      left: -4,
      width: 8,
      height: 8,
      borderRadius: '50%'
    },
    outerDot: {
      border: "16px solid ".concat(theme.palette.primary.main),
      borderWidth: 16,
      position: 'absolute',
      top: -16 + 1,
      right: -16,
      width: 0,
      height: 0,
      borderRadius: '50%',
      boxSizing: 'content-box'
    },
    outerDotOdd: {
      background: (0, _colorManipulator.getContrastRatio)(theme.palette.primary.main, theme.palette.common.black) < 7 ? theme.palette.common.white : theme.palette.common.black,
      width: 4,
      height: 4,
      borderWidth: 14
    }
  };
};

var size = 256;

var Clock =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Clock, _React$PureComponent);

  function Clock(props) {
    var _this;

    _classCallCheck(this, Clock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Clock).call(this, props));

    _this.disableAnimatedPointer = function () {
      return _this.setState({
        touching: true
      });
    };

    _this.enableAnimatedPointer = function () {
      return _this.setState({
        touching: false
      });
    };

    _this.handleTouchMove = function (e) {
      e.preventDefault(); // prevent scrolling behind the clock on iOS

      var rect = e.target.getBoundingClientRect();

      _this.movePointer(e.changedTouches[0].clientX - rect.left, e.changedTouches[0].clientY - rect.top);
    };

    _this.handleTouchEnd = function (e) {
      _this.handleTouchMove(e);

      _this.enableAnimatedPointer();
    };

    _this.handleMouseMove = function (e) {
      // MouseEvent.which is deprecated, but MouseEvent.buttons is not supported in Safari
      if (e.buttons === 1 || e.which === 1) {
        var rect = e.target.getBoundingClientRect();

        _this.movePointer(e.clientX - rect.left, e.clientY - rect.top);
      }
    };

    _this.handleClick = function (e) {
      var rect = e.target.getBoundingClientRect();

      _this.movePointer(e.clientX - rect.left, e.clientY - rect.top);
    };

    _this.state = {
      touching: false,
      angle: getPointerAngle(props.value, props.mode)
    };
    return _this;
  }

  _createClass(Clock, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(_ref) {
      var value = _ref.value,
          mode = _ref.mode;

      if (mode !== this.props.mode || value !== this.props.value) {
        this.setState({
          angle: (0, _util.getShortestAngle)(this.state.angle, getPointerAngle(value, mode))
        });
      }
    }
  }, {
    key: "movePointer",
    value: function movePointer(x, y) {
      var value = getPointerValue(x, y, this.props.mode);

      if (value !== this.props.value && this.props.onChange != null) {
        this.props.onChange(value);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props = this.props,
          classes = _this$props.classes,
          mode = _this$props.mode,
          value = _this$props.value,
          other = _objectWithoutProperties(_this$props, ["classes", "mode", "value"]);

      var touching = this.state.touching;
      return _react["default"].createElement("div", _extends({
        className: classes.root
      }, other), _react["default"].createElement("div", {
        className: classes.circle,
        onTouchMove: this.handleTouchMove,
        onMouseMove: this.handleMouseMove,
        onTouchStart: this.disableAnimatedPointer,
        onMouseDown: this.disableAnimatedPointer,
        onTouchEnd: this.handleTouchEnd,
        onMouseUp: this.enableAnimatedPointer,
        onClick: this.handleClick
      }, _react["default"].createElement("div", {
        className: (0, _classnames["default"])(classes.pointer, (_classNames = {}, _defineProperty(_classNames, classes.smallPointer, mode === '24h' && (value === 0 || value > 12)), _defineProperty(_classNames, classes.animatedPointer, !touching), _classNames)),
        style: {
          transform: "rotate(".concat(this.state.angle, "deg)")
        }
      }, _react["default"].createElement("div", {
        className: classes.innerDot
      }), _react["default"].createElement("div", {
        className: (0, _classnames["default"])(classes.outerDot, _defineProperty({}, classes.outerDotOdd, mode === 'minutes' && value % 5 !== 0))
      })), mode === '12h' && getNumbers(12, {
        size: size
      }).map(function (digit, i) {
        return _react["default"].createElement("span", {
          key: digit.display,
          className: (0, _classnames["default"])(classes.number, {
            selected: value === digit.display
          }),
          style: {
            transform: "translate(".concat(digit.translateX, "px, ").concat(digit.translateY, "px)")
          }
        }, digit.display);
      }), mode === '24h' && getNumbers(12, {
        size: size
      }).map(function (digit, i) {
        return _react["default"].createElement("span", {
          key: digit.display,
          className: (0, _classnames["default"])(classes.number, {
            selected: value === digit.display
          }),
          style: {
            transform: "translate(".concat(digit.translateX, "px, ").concat(digit.translateY, "px)")
          }
        }, digit.display);
      }), mode === '24h' && getNumbers(12, {
        size: size - 64,
        start: 13
      }).map(function (digit, i) {
        return _react["default"].createElement("span", {
          key: digit.display,
          className: (0, _classnames["default"])(classes.number, classes.smallNumber, {
            selected: value === digit.display || digit.display === 24 && value === 0
          }),
          style: {
            transform: "translate(".concat(digit.translateX, "px, ").concat(digit.translateY, "px)")
          }
        }, digit.display === 24 ? '00' : digit.display);
      }), mode === 'minutes' && getNumbers(12, {
        size: size,
        start: 5,
        step: 5
      }).map(function (digit, i) {
        return _react["default"].createElement("span", {
          key: digit.display,
          className: (0, _classnames["default"])(classes.number, {
            selected: value === digit.display || digit.display === 60 && value === 0
          }),
          style: {
            transform: "translate(".concat(digit.translateX, "px, ").concat(digit.translateY, "px)")
          }
        }, digit.display === 60 ? '00' : digit.display);
      })));
    }
  }]);

  return Clock;
}(_react["default"].PureComponent);

Clock.propTypes = {
  /** Sets the mode of this clock. It can either select hours (supports 12- and 24-hour-clock) or minutes. */
  mode: _propTypes["default"].oneOf(['12h', '24h', 'minutes']).isRequired,

  /** Callback that is called with the new hours/minutes (as a number) when the value is changed. */
  onChange: _propTypes["default"].func,

  /** The value of the clock. */
  value: _propTypes["default"].number.isRequired
};

var _default = (0, _styles.withStyles)(styles)(Clock);

exports["default"] = _default;

function getNumbers(count, _ref2) {
  var size = _ref2.size,
      _ref2$start = _ref2.start,
      start = _ref2$start === void 0 ? 1 : _ref2$start,
      _ref2$step = _ref2.step,
      step = _ref2$step === void 0 ? 1 : _ref2$step;
  return Array.apply(null, Array(count)).map(function (_, i) {
    return {
      display: i * step + start,
      translateX: (size / 2 - 20) * Math.cos(2 * Math.PI * (i - 2) / count),
      translateY: (size / 2 - 20) * Math.sin(2 * Math.PI * (i - 2) / count)
    };
  });
}

function getPointerAngle(value, mode) {
  switch (mode) {
    case '12h':
      return 360 / 12 * (value - 3);

    case '24h':
      return 360 / 12 * (value % 12 - 3);

    case 'minutes':
      return 360 / 60 * (value - 15);
  }
}

function getPointerValue(x, y, mode) {
  var angle = Math.atan2(size / 2 - x, size / 2 - y) / Math.PI * 180;

  if (angle < 0) {
    angle = 360 + angle;
  }

  switch (mode) {
    case '12h':
      {
        var value = 12 - Math.round(angle * 12 / 360);
        return value === 0 ? 12 : value;
      }

    case '24h':
      {
        var radius = Math.sqrt(Math.pow(size / 2 - x, 2) + Math.pow(size / 2 - y, 2));

        var _value = 12 - Math.round(angle * 12 / 360);

        if (_value === 0) {
          _value = 12;
        }

        if (radius < size / 2 - 32) {
          _value = _value === 12 ? 0 : _value + 12;
        }

        return _value;
      }

    case 'minutes':
      {
        var _value2 = Math.round(60 - 60 * angle / 360);

        return _value2 === 60 ? 0 : _value2;
      }
  }
}
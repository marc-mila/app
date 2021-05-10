"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _transitions = require("@material-ui/core/styles/transitions");

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

var _classnames = _interopRequireDefault(require("classnames"));

var _Clock = _interopRequireDefault(require("./Clock"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      width: 288,
      fontFamily: theme.typography.fontFamily
    },
    header: {
      background: theme.palette.primary.main,
      color: (0, _colorManipulator.fade)((0, _colorManipulator.getContrastRatio)(theme.palette.primary.main, theme.palette.common.black) < 7 ? theme.palette.common.white : theme.palette.common.black, 0.54),
      padding: '20px 0',
      lineHeight: '58px',
      fontSize: '58px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      userSelect: 'none'
    },
    time: {
      transition: "all ".concat(_transitions.duration["short"], "ms ").concat(_transitions.easing.easeInOut),
      cursor: 'pointer'
    },
    placeholder: {
      flex: 1
    },
    ampm: {
      display: 'flex',
      flexDirection: 'column-reverse',
      flex: 1,
      fontSize: '14px',
      lineHeight: '20px',
      marginLeft: 16,
      fontWeight: 700
    },
    select: {
      color: (0, _colorManipulator.getContrastRatio)(theme.palette.primary.main, theme.palette.common.black) < 7 ? theme.palette.common.white : theme.palette.common.black
    },
    body: {
      padding: '24px 16px',
      background: theme.palette.background.paper
    }
  };
};

var TimePicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TimePicker, _React$Component);

  function TimePicker(props) {
    var _this;

    _classCallCheck(this, TimePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TimePicker).call(this, props));

    _this.handleClockChange = function (value) {
      if (_this.state.select === 'h') {
        if (_this.props.mode === '12h') {
          if (_this.state.hours >= 12) {
            _this.setState({
              hours: value === 12 ? value : value + 12
            }, _this.propagateChange);
          } else {
            _this.setState({
              hours: value === 12 ? 0 : value
            }, _this.propagateChange);
          }
        } else {
          _this.setState({
            hours: value
          }, _this.propagateChange);
        }
      } else {
        _this.setState({
          minutes: value
        }, function () {
          _this.propagateChange();
        });
      }
    };

    _this.handleClockChangeDone = function (e) {
      e.preventDefault(); // prevent mouseUp after touchEnd

      if (_this.state.select === 'm') {
        if (_this.props.onMinutesSelected) {
          setTimeout(function () {
            _this.props.onMinutesSelected();
          }, 300);
        }
      } else {
        setTimeout(function () {
          _this.setState({
            select: 'm'
          });
        }, 300);
      }
    };

    _this.editHours = function () {
      return _this.setState({
        select: 'h'
      });
    };

    _this.editMinutes = function () {
      return _this.setState({
        select: 'm'
      });
    };

    _this.setAm = function () {
      if (_this.state.hours >= 12) {
        _this.setState({
          hours: _this.state.hours - 12
        }, _this.propagateChange);
      }
    };

    _this.setPm = function () {
      if (_this.state.hours < 12) {
        _this.setState({
          hours: _this.state.hours + 12
        }, _this.propagateChange);
      }
    };

    _this.propagateChange = function () {
      if (_this.props.onChange != null) {
        var date = new Date();
        date.setHours(_this.state.hours);
        date.setMinutes(_this.state.minutes);
        date.setSeconds(0);
        date.setMilliseconds(0);

        _this.props.onChange(date);
      }
    };

    var defaultValue = new Date();
    defaultValue.setSeconds(0);
    defaultValue.setMilliseconds(0);
    var time = props.value || props.defaultValue || defaultValue;
    _this.state = {
      select: 'h',
      hours: time.getHours(),
      minutes: time.getMinutes()
    };
    return _this;
  }

  _createClass(TimePicker, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value != null && (this.props.value == null || nextProps.value.getTime() !== this.props.value.getTime())) {
        this.setState({
          hours: nextProps.value.getHours(),
          minutes: nextProps.value.getMinutes()
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          mode = _this$props.mode,
          ClockProps = _this$props.ClockProps;
      var clockMode = this.state.select === 'm' ? 'minutes' : mode;
      var minutes = this.state.minutes;

      var _formatHours = (0, _util.formatHours)(this.state.hours, mode),
          hours = _formatHours.hours,
          isPm = _formatHours.isPm;

      return _react["default"].createElement("div", {
        className: classes.root
      }, _react["default"].createElement("div", {
        className: classes.header
      }, _react["default"].createElement("div", {
        className: classes.placeholder
      }), _react["default"].createElement("div", null, _react["default"].createElement("span", {
        className: (0, _classnames["default"])(classes.time, _defineProperty({}, classes.select, this.state.select === 'h' && 'active')),
        onClick: this.editHours
      }, (0, _util.twoDigits)(hours)), ":", _react["default"].createElement("span", {
        className: (0, _classnames["default"])(classes.time, _defineProperty({}, classes.select, this.state.select === 'm' && 'active')),
        onClick: this.editMinutes
      }, (0, _util.twoDigits)(minutes))), mode === '12h' ? _react["default"].createElement("div", {
        className: classes.ampm
      }, _react["default"].createElement("span", {
        className: (0, _classnames["default"])(classes.time, _defineProperty({}, classes.select, isPm)),
        onClick: this.setPm
      }, "PM"), _react["default"].createElement("span", {
        className: (0, _classnames["default"])(classes.time, _defineProperty({}, classes.select, !isPm)),
        onClick: this.setAm
      }, "AM")) : _react["default"].createElement("div", {
        className: classes.placeholder
      })), _react["default"].createElement("div", {
        className: classes.body
      }, _react["default"].createElement(_Clock["default"], _extends({}, ClockProps, {
        mode: clockMode,
        onChange: this.handleClockChange,
        value: clockMode === 'minutes' ? minutes : hours,
        onMouseUp: this.handleClockChangeDone,
        onTouchEnd: this.handleClockChangeDone
      }))));
    }
  }]);

  return TimePicker;
}(_react["default"].Component);

TimePicker.propTypes = {
  /** The initial value of the time picker. */
  defaultValue: _propTypes["default"].instanceOf(Date),

  /** Sets the clock mode, 12-hour or 24-hour clocks are supported. */
  mode: _propTypes["default"].oneOf(['12h', '24h']),

  /** Callback that is called with the new date (as Date instance) when the value is changed. */
  onChange: _propTypes["default"].func,

  /** Callback that is called when the minutes are changed. Can be used to automatically hide the picker after selecting a time. */
  onMinutesSelected: _propTypes["default"].func,

  /** The value of the time picker, for use in controlled mode. */
  value: _propTypes["default"].instanceOf(Date),

  /** Properties to pass down to the Clock component */
  ClockProps: _propTypes["default"].object
};
TimePicker.defaultProps = {
  mode: '12h'
};

var _default = (0, _styles.withStyles)(styles)(TimePicker);

exports["default"] = _default;
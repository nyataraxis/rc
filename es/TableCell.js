function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

import * as React from 'react';
import classNames from 'classnames';
import get from 'lodash/get';

function isInvalidRenderCellText(text) {
  return text && !React.isValidElement(text) && Object.prototype.toString.call(text) === '[object Object]';
}

var TableCell = /*#__PURE__*/function (_React$Component) {
  _inherits(TableCell, _React$Component);

  var _super = _createSuper(TableCell);

  function TableCell() {
    var _this;

    _classCallCheck(this, TableCell);

    _this = _super.apply(this, arguments);

    _this.handleClick = function (e) {
      var _this$props = _this.props,
          record = _this$props.record,
          onCellClick = _this$props.column.onCellClick;

      if (onCellClick) {
        onCellClick(record, e);
      }
    };

    return _this;
  }

  _createClass(TableCell, [{
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props2 = this.props,
          record = _this$props2.record,
          indentSize = _this$props2.indentSize,
          prefixCls = _this$props2.prefixCls,
          indent = _this$props2.indent,
          index = _this$props2.index,
          expandIcon = _this$props2.expandIcon,
          column = _this$props2.column,
          BodyCell = _this$props2.component;
      var dataIndex = column.dataIndex,
          render = column.render,
          _column$className = column.className,
          className = _column$className === void 0 ? '' : _column$className; // We should return undefined if no dataIndex is specified, but in order to
      // be compatible with object-path's behavior, we return the record object instead.

      var text;

      if (typeof dataIndex === 'number') {
        text = get(record, dataIndex);
      } else if (!dataIndex || dataIndex.length === 0) {
        text = record;
      } else {
        text = get(record, dataIndex);
      }

      var tdProps = {};
      var colSpan;
      var rowSpan;

      if (render) {
        text = render(text, record, index); // `render` support cell with additional config like `props`

        if (isInvalidRenderCellText(text)) {
          tdProps = text.props || tdProps;
          var _tdProps = tdProps;
          colSpan = _tdProps.colSpan;
          rowSpan = _tdProps.rowSpan;
          text = text.children;
        }
      }

      if (column.onCell) {
        tdProps = _objectSpread(_objectSpread({}, tdProps), column.onCell(record, index));
      } // Fix https://github.com/ant-design/ant-design/issues/1202


      if (isInvalidRenderCellText(text)) {
        text = null;
      }

      var indentText = expandIcon ? React.createElement("span", {
        style: {
          paddingLeft: "".concat(indentSize * indent, "px")
        },
        className: "".concat(prefixCls, "-indent indent-level-").concat(indent)
      }) : null;

      if (rowSpan === 0 || colSpan === 0) {
        return null;
      }

      if (column.align) {
        tdProps.style = _objectSpread({
          textAlign: column.align
        }, tdProps.style);
      }

      var cellClassName = classNames(className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-cell-ellipsis"), !!column.ellipsis), _defineProperty(_classNames, "".concat(prefixCls, "-cell-break-word"), !!column.width), _classNames));

      if (column.ellipsis) {
        if (typeof text === 'string') {
          tdProps.title = text;
        } else if (text) {
          var _text = text,
              textProps = _text.props;

          if (textProps && textProps.children && typeof textProps.children === 'string') {
            tdProps.title = textProps.children;
          }
        }
      }

      return React.createElement(BodyCell, Object.assign({
        className: cellClassName,
        onClick: this.handleClick
      }, tdProps), indentText, expandIcon, text);
    }
  }]);

  return TableCell;
}(React.Component);

export { TableCell as default };
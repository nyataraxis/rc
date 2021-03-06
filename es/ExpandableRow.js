function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
import { connect } from 'mini-store';
import ExpandIcon from './ExpandIcon';

var ExpandableRow = /*#__PURE__*/function (_React$Component) {
  _inherits(ExpandableRow, _React$Component);

  var _super = _createSuper(ExpandableRow);

  function ExpandableRow() {
    var _this;

    _classCallCheck(this, ExpandableRow);

    _this = _super.apply(this, arguments); // Show icon within first column

    _this.hasExpandIcon = function (columnIndex) {
      var _this$props = _this.props,
          expandRowByClick = _this$props.expandRowByClick,
          expandIcon = _this$props.expandIcon;

      if (_this.expandIconAsCell || columnIndex !== _this.expandIconColumnIndex) {
        return false;
      }

      return !!expandIcon || !expandRowByClick;
    };

    _this.handleExpandChange = function (record, event) {
      var _this$props2 = _this.props,
          onExpandedChange = _this$props2.onExpandedChange,
          expanded = _this$props2.expanded,
          rowKey = _this$props2.rowKey;

      if (_this.expandable) {
        onExpandedChange(!expanded, record, event, rowKey);
      }
    };

    _this.handleRowClick = function (record, index, event) {
      var _this$props3 = _this.props,
          expandRowByClick = _this$props3.expandRowByClick,
          onRowClick = _this$props3.onRowClick;

      if (expandRowByClick) {
        _this.handleExpandChange(record, event);
      }

      if (onRowClick) {
        onRowClick(record, index, event);
      }
    };

    _this.renderExpandIcon = function () {
      var _this$props4 = _this.props,
          prefixCls = _this$props4.prefixCls,
          expanded = _this$props4.expanded,
          record = _this$props4.record,
          needIndentSpaced = _this$props4.needIndentSpaced,
          expandIcon = _this$props4.expandIcon;

      if (expandIcon) {
        return expandIcon({
          prefixCls: prefixCls,
          expanded: expanded,
          record: record,
          needIndentSpaced: needIndentSpaced,
          expandable: _this.expandable,
          onExpand: _this.handleExpandChange
        });
      }

      return React.createElement(ExpandIcon, {
        expandable: _this.expandable,
        prefixCls: prefixCls,
        onExpand: _this.handleExpandChange,
        needIndentSpaced: needIndentSpaced,
        expanded: expanded,
        record: record
      });
    };

    _this.renderExpandIconCell = function (cells) {
      if (!_this.expandIconAsCell) {
        return;
      }

      var prefixCls = _this.props.prefixCls;
      cells.push(React.createElement("td", {
        className: "".concat(prefixCls, "-expand-icon-cell"),
        key: "rc-table-expand-icon-cell"
      }, _this.renderExpandIcon()));
    };

    return _this;
  }

  _createClass(ExpandableRow, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.handleDestroy();
    }
  }, {
    key: "handleDestroy",
    value: function handleDestroy() {
      var _this$props5 = this.props,
          onExpandedChange = _this$props5.onExpandedChange,
          rowKey = _this$props5.rowKey,
          record = _this$props5.record;

      if (this.expandable) {
        onExpandedChange(false, record, null, rowKey, true);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          childrenColumnName = _this$props6.childrenColumnName,
          expandedRowRender = _this$props6.expandedRowRender,
          indentSize = _this$props6.indentSize,
          record = _this$props6.record,
          fixed = _this$props6.fixed,
          expanded = _this$props6.expanded;
      this.expandIconAsCell = fixed !== 'right' ? this.props.expandIconAsCell : false;
      this.expandIconColumnIndex = fixed !== 'right' ? this.props.expandIconColumnIndex : -1;
      var childrenData = record[childrenColumnName];
      this.expandable = !!(childrenData || expandedRowRender);
      var expandableRowProps = {
        indentSize: indentSize,
        // not used in TableRow, but it's required to re-render TableRow when `expanded` changes
        expanded: expanded,
        onRowClick: this.handleRowClick,
        hasExpandIcon: this.hasExpandIcon,
        renderExpandIcon: this.renderExpandIcon,
        renderExpandIconCell: this.renderExpandIconCell
      };
      return this.props.children(expandableRowProps);
    }
  }]);

  return ExpandableRow;
}(React.Component);

export default connect(function (_ref, _ref2) {
  var expandedRowKeys = _ref.expandedRowKeys;
  var rowKey = _ref2.rowKey;
  return {
    expanded: expandedRowKeys.includes(rowKey)
  };
})(ExpandableRow);
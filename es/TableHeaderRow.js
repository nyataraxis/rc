function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { connect } from 'mini-store';
import classNames from 'classnames';

function TableHeaderRow(_ref) {
  var row = _ref.row,
      index = _ref.index,
      height = _ref.height,
      components = _ref.components,
      onHeaderRow = _ref.onHeaderRow,
      prefixCls = _ref.prefixCls;
  var HeaderRow = components.header.row;
  var HeaderCell = components.header.cell;
  var rowProps = onHeaderRow(row.map(function (cell) {
    return cell.column;
  }), index);
  var customStyle = rowProps ? rowProps.style : {};

  var style = _objectSpread({
    height: height
  }, customStyle);

  return React.createElement(HeaderRow, Object.assign({}, rowProps, {
    style: style
  }), row.map(function (cell, i) {
    var _classNames;

    var column = cell.column,
        isLast = cell.isLast,
        cellProps = _objectWithoutProperties(cell, ["column", "isLast"]);

    var customProps = column.onHeaderCell ? column.onHeaderCell(column) : {};

    if (column.align) {
      customProps.style = _objectSpread(_objectSpread({}, customProps.style), {}, {
        textAlign: column.align
      });
    }

    customProps.className = classNames(customProps.className, column.className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-align-").concat(column.align), !!column.align), _defineProperty(_classNames, "".concat(prefixCls, "-row-cell-ellipsis"), !!column.ellipsis), _defineProperty(_classNames, "".concat(prefixCls, "-row-cell-break-word"), !!column.width), _defineProperty(_classNames, "".concat(prefixCls, "-row-cell-last"), isLast), _classNames));
    return React.createElement(HeaderCell, Object.assign({}, cellProps, customProps, {
      key: column.key || column.dataIndex || i
    }));
  }));
}

function getRowHeight(state, props) {
  var fixedColumnsHeadRowsHeight = state.fixedColumnsHeadRowsHeight;
  var columns = props.columns,
      rows = props.rows,
      fixed = props.fixed;
  var headerHeight = fixedColumnsHeadRowsHeight[0];

  if (!fixed) {
    return null;
  }

  if (headerHeight && columns) {
    if (headerHeight === 'auto') {
      return 'auto';
    }

    return headerHeight / rows.length;
  }

  return null;
}

export default connect(function (state, props) {
  return {
    height: getRowHeight(state, props)
  };
})(TableHeaderRow);
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _addEventListener = _interopRequireDefault(require("rc-util/lib/Dom/addEventListener"));

var _warning = _interopRequireDefault(require("rc-util/lib/warning"));

var _miniStore = require("mini-store");

var _merge = _interopRequireDefault(require("lodash/merge"));

var _componentClasses = _interopRequireDefault(require("component-classes"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _utils = require("./utils");

var _ColumnManager = _interopRequireDefault(require("./ColumnManager"));

var _HeadTable = _interopRequireDefault(require("./HeadTable"));

var _BodyTable = _interopRequireDefault(require("./BodyTable"));

var _Column = _interopRequireDefault(require("./Column"));

var _ColumnGroup = _interopRequireDefault(require("./ColumnGroup"));

var _ExpandableTable = _interopRequireDefault(require("./ExpandableTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var Table = /*#__PURE__*/function (_React$Component) {
  _inherits(Table, _React$Component);

  var _super = _createSuper(Table);

  function Table(props) {
    var _this;

    _classCallCheck(this, Table);

    _this = _super.call(this, props);
    _this.state = {};

    _this.getRowKey = function (record, index) {
      var rowKey = _this.props.rowKey;
      var key = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];
      (0, _warning.default)(key !== undefined, 'Each record in table should have a unique `key` prop,' + 'or set `rowKey` to an unique primary key.');
      return key === undefined ? index : key;
    };

    _this.handleWindowResize = function () {
      _this.syncFixedTableRowHeight();

      _this.setScrollPositionClassName();
    };

    _this.syncFixedTableRowHeight = function () {
      var tableRect = _this.tableNode.getBoundingClientRect(); // If tableNode's height less than 0, suppose it is hidden and don't recalculate rowHeight.
      // see: https://github.com/ant-design/ant-design/issues/4836


      if (tableRect.height !== undefined && tableRect.height <= 0) {
        return;
      }

      var prefixCls = _this.props.prefixCls;
      var headRows = _this.headTable ? _this.headTable.querySelectorAll('thead') : _this.bodyTable.querySelectorAll('thead');
      var bodyRows = _this.bodyTable.querySelectorAll(".".concat(prefixCls, "-row")) || [];
      var fixedColumnsHeadRowsHeight = [].map.call(headRows, function (row) {
        return row.getBoundingClientRect().height || 'auto';
      });

      var state = _this.store.getState();

      var fixedColumnsBodyRowsHeight = [].reduce.call(bodyRows, function (acc, row) {
        var rowKey = row.getAttribute('data-row-key');
        var height = row.getBoundingClientRect().height || state.fixedColumnsBodyRowsHeight[rowKey] || 'auto';
        acc[rowKey] = height;
        return acc;
      }, {});

      if ((0, _shallowequal.default)(state.fixedColumnsHeadRowsHeight, fixedColumnsHeadRowsHeight) && (0, _shallowequal.default)(state.fixedColumnsBodyRowsHeight, fixedColumnsBodyRowsHeight)) {
        return;
      }

      _this.store.setState({
        fixedColumnsHeadRowsHeight: fixedColumnsHeadRowsHeight,
        fixedColumnsBodyRowsHeight: fixedColumnsBodyRowsHeight
      });
    };

    _this.handleBodyScrollLeft = function (e) {
      // Fix https://github.com/ant-design/ant-design/issues/7635
      if (e.currentTarget !== e.target) {
        return;
      }

      var target = e.target;
      var _this$props$scroll = _this.props.scroll,
          scroll = _this$props$scroll === void 0 ? {} : _this$props$scroll;

      var _assertThisInitialize = _assertThisInitialized(_this),
          headTable = _assertThisInitialize.headTable,
          bodyTable = _assertThisInitialize.bodyTable;

      if (target.scrollLeft !== _this.lastScrollLeft && scroll.x) {
        if (target === bodyTable && headTable) {
          headTable.scrollLeft = target.scrollLeft;
        } else if (target === headTable && bodyTable) {
          bodyTable.scrollLeft = target.scrollLeft;
        }

        _this.setScrollPositionClassName();
      } // Remember last scrollLeft for scroll direction detecting.


      _this.lastScrollLeft = target.scrollLeft;
    };

    _this.handleBodyScrollTop = function (e) {
      var target = e.target; // Fix https://github.com/ant-design/ant-design/issues/9033

      if (e.currentTarget !== target) {
        return;
      }

      var _this$props$scroll2 = _this.props.scroll,
          scroll = _this$props$scroll2 === void 0 ? {} : _this$props$scroll2;

      var _assertThisInitialize2 = _assertThisInitialized(_this),
          headTable = _assertThisInitialize2.headTable,
          bodyTable = _assertThisInitialize2.bodyTable,
          fixedColumnsBodyLeft = _assertThisInitialize2.fixedColumnsBodyLeft,
          fixedColumnsBodyRight = _assertThisInitialize2.fixedColumnsBodyRight;

      if (target.scrollTop !== _this.lastScrollTop && scroll.y && target !== headTable) {
        var scrollTop = target.scrollTop;

        if (fixedColumnsBodyLeft && target !== fixedColumnsBodyLeft) {
          fixedColumnsBodyLeft.scrollTop = scrollTop;
        }

        if (fixedColumnsBodyRight && target !== fixedColumnsBodyRight) {
          fixedColumnsBodyRight.scrollTop = scrollTop;
        }

        if (bodyTable && target !== bodyTable) {
          bodyTable.scrollTop = scrollTop;
        }
      } // Remember last scrollTop for scroll direction detecting.


      _this.lastScrollTop = target.scrollTop;
    };

    _this.handleBodyScroll = function (e) {
      _this.handleBodyScrollLeft(e);

      _this.handleBodyScrollTop(e);
    };

    _this.handleWheel = function (event) {
      var _this$props$scroll3 = _this.props.scroll,
          scroll = _this$props$scroll3 === void 0 ? {} : _this$props$scroll3;

      if (window.navigator.userAgent.match(/Trident\/7\./) && scroll.y) {
        event.preventDefault();
        var wd = event.deltaY;
        var target = event.target;

        var _assertThisInitialize3 = _assertThisInitialized(_this),
            bodyTable = _assertThisInitialize3.bodyTable,
            fixedColumnsBodyLeft = _assertThisInitialize3.fixedColumnsBodyLeft,
            fixedColumnsBodyRight = _assertThisInitialize3.fixedColumnsBodyRight;

        var scrollTop = 0;

        if (_this.lastScrollTop) {
          scrollTop = _this.lastScrollTop + wd;
        } else {
          scrollTop = wd;
        }

        if (fixedColumnsBodyLeft && target !== fixedColumnsBodyLeft) {
          fixedColumnsBodyLeft.scrollTop = scrollTop;
        }

        if (fixedColumnsBodyRight && target !== fixedColumnsBodyRight) {
          fixedColumnsBodyRight.scrollTop = scrollTop;
        }

        if (bodyTable && target !== bodyTable) {
          bodyTable.scrollTop = scrollTop;
        }
      }
    };

    _this.saveRef = function (name) {
      return function (node) {
        _this[name] = node;
      };
    };

    _this.saveTableNodeRef = function (node) {
      _this.tableNode = node;
    };

    ['onRowClick', 'onRowDoubleClick', 'onRowContextMenu', 'onRowMouseEnter', 'onRowMouseLeave'].forEach(function (name) {
      (0, _warning.default)(props[name] === undefined, "".concat(name, " is deprecated, please use onRow instead."));
    });
    (0, _warning.default)(props.getBodyWrapper === undefined, 'getBodyWrapper is deprecated, please use custom components instead.');
    _this.columnManager = new _ColumnManager.default(props.columns, props.children);
    _this.store = (0, _miniStore.create)({
      currentHoverKey: null,
      fixedColumnsHeadRowsHeight: [],
      fixedColumnsBodyRowsHeight: {}
    });

    _this.setScrollPosition('left');

    _this.debouncedWindowResize = (0, _utils.debounce)(_this.handleWindowResize, 150);
    return _this;
  }

  _createClass(Table, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        table: {
          props: this.props,
          columnManager: this.columnManager,
          saveRef: this.saveRef,
          components: (0, _merge.default)({
            table: 'table',
            header: {
              wrapper: 'thead',
              row: 'tr',
              cell: 'th'
            },
            body: {
              wrapper: 'tbody',
              row: 'tr',
              cell: 'td'
            }
          }, this.props.components)
        }
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.columnManager.isAnyColumnsFixed()) {
        this.handleWindowResize();
        this.resizeEvent = (0, _addEventListener.default)(window, 'resize', this.debouncedWindowResize);
      } // https://github.com/ant-design/ant-design/issues/11635


      if (this.headTable) {
        this.headTable.scrollLeft = 0;
      }

      if (this.bodyTable) {
        this.bodyTable.scrollLeft = 0;
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.columnManager.isAnyColumnsFixed()) {
        this.handleWindowResize();

        if (!this.resizeEvent) {
          this.resizeEvent = (0, _addEventListener.default)(window, 'resize', this.debouncedWindowResize);
        }
      } // when table changes to empty, reset scrollLeft


      if (prevProps.data.length > 0 && this.props.data.length === 0 && this.hasScrollX()) {
        this.resetScrollX();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.resizeEvent) {
        this.resizeEvent.remove();
      }

      if (this.debouncedWindowResize) {
        this.debouncedWindowResize.cancel();
      }
    }
  }, {
    key: "setScrollPosition",
    value: function setScrollPosition(position) {
      this.scrollPosition = position;

      if (this.tableNode) {
        var prefixCls = this.props.prefixCls;

        if (position === 'both') {
          (0, _componentClasses.default)(this.tableNode).remove(new RegExp("^".concat(prefixCls, "-scroll-position-.+$"))).add("".concat(prefixCls, "-scroll-position-left")).add("".concat(prefixCls, "-scroll-position-right"));
        } else {
          (0, _componentClasses.default)(this.tableNode).remove(new RegExp("^".concat(prefixCls, "-scroll-position-.+$"))).add("".concat(prefixCls, "-scroll-position-").concat(position));
        }
      }
    }
  }, {
    key: "setScrollPositionClassName",
    value: function setScrollPositionClassName() {
      var node = this.bodyTable;
      var scrollToLeft = node.scrollLeft === 0;
      var scrollToRight = node.scrollLeft + 1 >= node.children[0].getBoundingClientRect().width - node.getBoundingClientRect().width;

      if (scrollToLeft && scrollToRight) {
        this.setScrollPosition('both');
      } else if (scrollToLeft) {
        this.setScrollPosition('left');
      } else if (scrollToRight) {
        this.setScrollPosition('right');
      } else if (this.scrollPosition !== 'middle') {
        this.setScrollPosition('middle');
      }
    }
  }, {
    key: "isTableLayoutFixed",
    value: function isTableLayoutFixed() {
      var _this$props = this.props,
          tableLayout = _this$props.tableLayout,
          _this$props$columns = _this$props.columns,
          columns = _this$props$columns === void 0 ? [] : _this$props$columns,
          useFixedHeader = _this$props.useFixedHeader,
          _this$props$scroll4 = _this$props.scroll,
          scroll = _this$props$scroll4 === void 0 ? {} : _this$props$scroll4;

      if (typeof tableLayout !== 'undefined') {
        return tableLayout === 'fixed';
      } // if one column is ellipsis, use fixed table layout to fix align issue


      if (columns.some(function (_ref) {
        var ellipsis = _ref.ellipsis;
        return !!ellipsis;
      })) {
        return true;
      } // if header fixed, use fixed table layout to fix align issue


      if (useFixedHeader || scroll.y) {
        return true;
      } // if scroll.x is number/px/% width value, we should fixed table layout
      // to avoid long word layout broken issue


      if (scroll.x && scroll.x !== true && scroll.x !== 'max-content') {
        return true;
      }

      return false;
    }
  }, {
    key: "resetScrollX",
    value: function resetScrollX() {
      if (this.headTable) {
        this.headTable.scrollLeft = 0;
      }

      if (this.bodyTable) {
        this.bodyTable.scrollLeft = 0;
      }
    }
  }, {
    key: "hasScrollX",
    value: function hasScrollX() {
      var _this$props$scroll5 = this.props.scroll,
          scroll = _this$props$scroll5 === void 0 ? {} : _this$props$scroll5;
      return 'x' in scroll;
    }
  }, {
    key: "renderMainTable",
    value: function renderMainTable() {
      var _this$props2 = this.props,
          scroll = _this$props2.scroll,
          prefixCls = _this$props2.prefixCls;
      var isAnyColumnsFixed = this.columnManager.isAnyColumnsFixed();
      var scrollable = isAnyColumnsFixed || scroll.x || scroll.y;
      var table = [this.renderTable({
        columns: this.columnManager.groupedColumns(),
        isAnyColumnsFixed: isAnyColumnsFixed
      }), this.renderEmptyText(), this.renderFooter()];
      return scrollable ? React.createElement("div", {
        className: "".concat(prefixCls, "-scroll")
      }, table) : table;
    }
  }, {
    key: "renderLeftFixedTable",
    value: function renderLeftFixedTable() {
      var prefixCls = this.props.prefixCls;
      return React.createElement("div", {
        className: "".concat(prefixCls, "-fixed-left")
      }, this.renderTable({
        columns: this.columnManager.leftColumns(),
        fixed: 'left'
      }));
    }
  }, {
    key: "renderRightFixedTable",
    value: function renderRightFixedTable() {
      var prefixCls = this.props.prefixCls;
      return React.createElement("div", {
        className: "".concat(prefixCls, "-fixed-right")
      }, this.renderTable({
        columns: this.columnManager.rightColumns(),
        fixed: 'right'
      }));
    }
  }, {
    key: "renderTable",
    value: function renderTable(options) {
      var columns = options.columns,
          fixed = options.fixed,
          isAnyColumnsFixed = options.isAnyColumnsFixed;
      var _this$props3 = this.props,
          prefixCls = _this$props3.prefixCls,
          _this$props3$scroll = _this$props3.scroll,
          scroll = _this$props3$scroll === void 0 ? {} : _this$props3$scroll;
      var tableClassName = scroll.x || fixed ? "".concat(prefixCls, "-fixed") : '';
      var headTable = React.createElement(_HeadTable.default, {
        key: "head",
        columns: columns,
        fixed: fixed,
        tableClassName: tableClassName,
        handleBodyScrollLeft: this.handleBodyScrollLeft,
        expander: this.expander
      });
      var bodyTable = React.createElement(_BodyTable.default, {
        key: "body",
        columns: columns,
        fixed: fixed,
        tableClassName: tableClassName,
        getRowKey: this.getRowKey,
        handleWheel: this.handleWheel,
        handleBodyScroll: this.handleBodyScroll,
        expander: this.expander,
        isAnyColumnsFixed: isAnyColumnsFixed
      });
      return [headTable, bodyTable];
    }
  }, {
    key: "renderTitle",
    value: function renderTitle() {
      var _this$props4 = this.props,
          title = _this$props4.title,
          prefixCls = _this$props4.prefixCls;
      return title ? React.createElement("div", {
        className: "".concat(prefixCls, "-title"),
        key: "title"
      }, title(this.props.data)) : null;
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      var _this$props5 = this.props,
          footer = _this$props5.footer,
          prefixCls = _this$props5.prefixCls;
      return footer ? React.createElement("div", {
        className: "".concat(prefixCls, "-footer"),
        key: "footer"
      }, footer(this.props.data)) : null;
    }
  }, {
    key: "renderEmptyText",
    value: function renderEmptyText() {
      var _this$props6 = this.props,
          emptyText = _this$props6.emptyText,
          prefixCls = _this$props6.prefixCls,
          data = _this$props6.data;

      if (data.length) {
        return null;
      }

      var emptyClassName = "".concat(prefixCls, "-placeholder");
      return React.createElement("div", {
        className: emptyClassName,
        key: "emptyText"
      }, typeof emptyText === 'function' ? emptyText() : emptyText);
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames,
          _this2 = this;

      var props = this.props;
      var prefixCls = props.prefixCls;

      if (this.state.columns) {
        this.columnManager.reset(props.columns);
      } else if (this.state.children) {
        this.columnManager.reset(null, props.children);
      }

      var tableClassName = (0, _classnames.default)(props.prefixCls, props.className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-fixed-header"), props.useFixedHeader || props.scroll && props.scroll.y), _defineProperty(_classNames, "".concat(prefixCls, "-scroll-position-left ").concat(prefixCls, "-scroll-position-right"), this.scrollPosition === 'both'), _defineProperty(_classNames, "".concat(prefixCls, "-scroll-position-").concat(this.scrollPosition), this.scrollPosition !== 'both'), _defineProperty(_classNames, "".concat(prefixCls, "-layout-fixed"), this.isTableLayoutFixed()), _classNames));
      var hasLeftFixed = this.columnManager.isAnyColumnsLeftFixed();
      var hasRightFixed = this.columnManager.isAnyColumnsRightFixed();
      var dataAndAriaProps = (0, _utils.getDataAndAriaProps)(props);
      return React.createElement(_miniStore.Provider, {
        store: this.store
      }, React.createElement(_ExpandableTable.default, Object.assign({}, props, {
        columnManager: this.columnManager,
        getRowKey: this.getRowKey
      }), function (expander) {
        _this2.expander = expander;
        return React.createElement("div", Object.assign({
          ref: _this2.saveTableNodeRef,
          className: tableClassName,
          style: props.style,
          id: props.id
        }, dataAndAriaProps), _this2.renderTitle(), React.createElement("div", {
          className: "".concat(prefixCls, "-content")
        }, _this2.renderMainTable(), hasLeftFixed && _this2.renderLeftFixedTable(), hasRightFixed && _this2.renderRightFixedTable()));
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.columns && nextProps.columns !== prevState.columns) {
        return {
          columns: nextProps.columns,
          children: null
        };
      }

      if (nextProps.children !== prevState.children) {
        return {
          columns: null,
          children: nextProps.children
        };
      }

      return null;
    }
  }]);

  return Table;
}(React.Component);

Table.childContextTypes = {
  table: PropTypes.any,
  components: PropTypes.any
};
Table.Column = _Column.default;
Table.ColumnGroup = _ColumnGroup.default;
Table.defaultProps = {
  data: [],
  useFixedHeader: false,
  rowKey: 'key',
  rowClassName: function rowClassName() {
    return '';
  },
  onRow: function onRow() {},
  onHeaderRow: function onHeaderRow() {},
  prefixCls: 'rc-table',
  bodyStyle: {},
  style: {},
  showHeader: true,
  scroll: {},
  rowRef: function rowRef() {
    return null;
  },
  emptyText: function emptyText() {
    return 'No Data';
  }
};
(0, _reactLifecyclesCompat.polyfill)(Table);
var _default = Table;
exports.default = _default;
import * as React from 'react';
import * as PropTypes from 'prop-types';
import ColumnManager from './ColumnManager';
import ColumnGroup from './ColumnGroup';
import { ColumnType, TableStore, ScrollPosition, Expander } from './interface';
interface TableState {
    columns?: ColumnType[];
    children?: React.ReactNode;
}
declare class Table<ValueType> extends React.Component<any> {
    static childContextTypes: {
        table: PropTypes.Requireable<any>;
        components: PropTypes.Requireable<any>;
    };
    static Column: React.FunctionComponent<ColumnType<Record<string, any>>>;
    static ColumnGroup: typeof ColumnGroup;
    static defaultProps: {
        data: any[];
        useFixedHeader: boolean;
        rowKey: string;
        rowClassName: () => string;
        onRow(): void;
        onHeaderRow(): void;
        prefixCls: string;
        bodyStyle: {};
        style: {};
        showHeader: boolean;
        scroll: {};
        rowRef: () => any;
        emptyText: () => string;
    };
    constructor(props: any);
    state: TableState;
    columnManager: ColumnManager;
    store: TableStore;
    debouncedWindowResize: Function & {
        cancel: Function;
    };
    resizeEvent: {
        remove: Function;
    };
    headTable: HTMLDivElement;
    bodyTable: HTMLDivElement;
    tableNode: HTMLDivElement;
    scrollPosition: ScrollPosition;
    lastScrollLeft: number;
    lastScrollTop: number;
    fixedColumnsBodyLeft: HTMLDivElement;
    fixedColumnsBodyRight: HTMLDivElement;
    expander: Expander;
    getChildContext(): {
        table: {
            props: Readonly<any> & Readonly<{
                children?: React.ReactNode;
            }>;
            columnManager: ColumnManager;
            saveRef: (name: string) => (node: HTMLElement) => void;
            components: any;
        };
    };
    static getDerivedStateFromProps(nextProps: any, prevState: TableState): {
        columns: any;
        children: any;
    } | {
        columns: any;
        children: any;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    getRowKey: (record: ValueType, index: number) => any;
    setScrollPosition(position: ScrollPosition): void;
    setScrollPositionClassName(): void;
    isTableLayoutFixed(): boolean;
    handleWindowResize: () => void;
    syncFixedTableRowHeight: () => void;
    resetScrollX(): void;
    hasScrollX(): boolean;
    handleBodyScrollLeft: React.UIEventHandler<HTMLDivElement>;
    handleBodyScrollTop: React.UIEventHandler<HTMLDivElement>;
    handleBodyScroll: React.UIEventHandler<HTMLDivElement>;
    handleWheel: React.WheelEventHandler<HTMLDivElement>;
    saveRef: (name: string) => (node: HTMLElement) => void;
    saveTableNodeRef: (node: HTMLDivElement) => void;
    renderMainTable(): JSX.Element | (JSX.Element | JSX.Element[])[];
    renderLeftFixedTable(): JSX.Element;
    renderRightFixedTable(): JSX.Element;
    renderTable(options: any): JSX.Element[];
    renderTitle(): JSX.Element;
    renderFooter(): JSX.Element;
    renderEmptyText(): JSX.Element;
    render(): JSX.Element;
}
export default Table;

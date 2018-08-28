import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    AfterViewInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    forwardRef,
    ChangeDetectorRef,
    ElementRef,
    Renderer2,
    SimpleChanges
} from '@angular/core';

import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

import {
    TreeNode
} from './tree-transfer.interface';

import {
    TransferService
} from '../transfer/transfer.service';

/*
 * Provider Expression that allows component to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const TREE_TRANSFER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TreeTransferComponent),
    multi: true
};

@Component({
    selector: 'nb-tree-transfer',
    templateUrl: './tree-transfer.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    providers: [TREE_TRANSFER_VALUE_ACCESSOR, TransferService],
    host: {
        'class': 'nb-widget nb-tree-transfer'
    },
    exportAs: 'nbTreeTransfer'
})

export class TreeTransferComponent implements OnChanges, AfterViewInit {

    /** get selected value event */
    @Output() getValue: EventEmitter<number[] | string[] | object[]>
        = new EventEmitter<number[] | string[] | object[]>();

    /** search event */
    @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();

    /** tree node expand event */
    @Output() onExpandNode: EventEmitter<object> = new EventEmitter<object>();

    /** tree node expand event */
    @Output() onExtendData: EventEmitter<object> = new EventEmitter<object>();

    /**
     * candidate list data
     * @default []
     */
    @Input() candidateData: TreeNode[] = [];
    /**
     * selected list data
     * @default []
     */
    @Input() selectedData: TreeNode[] = [];

    /**
     * Whether the transfer is disabled
     * @default false
     */
    @Input() disabled: boolean = false;

    /**
     * Whether the transfer is can all-trans
     * @default false
     */
    @Input() allSelectLink: boolean = true;

    /**
     * Whether the transfer is can all-delete
     * @default false
     */
    @Input() allDeleteLink: boolean = true;

    /**
     * Whether the transfer is can all-trans
     * @default false
     */
    @Input() candidateSearch: boolean = true;

    /**
     * Whether the transfer is can all-delete
     * @default false
     */
    @Input() selectedSearch: boolean = true;

    /**
     * Whether the transfer is can all-trans
     */
    @Input() candidateTitle: string = '备选列表';

    /**
     * Whether the transfer is can all-delete
     */
    @Input() selectedTitle: string = '已选列表';

    @Input() addLink: any;

    /**
     * all options count
     * @docs-private
     */
    candidateCount: number = 0;

    /**
     * all selected options count
     * @docs-private
     */
    selectedCount: number = 0;

    /**
     * candidate trans to list data
     * @docs-private
     */
    private _candidateNodeList: Object = {};
    /**
     * selected trans to list data
     * @docs-private
     */
    private _selectedNodeList: Object = {};

    /**
     * selected options's id as list
     * @docs-private
     */
    private value: Array<object> = [];

    constructor(
        private _cd: ChangeDetectorRef,
        private el: ElementRef,
        private _render: Renderer2,
        private service: TransferService
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['candidateData'] || changes['selectedData']) {
            this.initTransfer();
        }
    }

    ngAfterViewInit() {
        this.getValue.emit(this.value);
    }

    /**
     * init transfer
     * @docs-private
     */
    initTransfer() {
        this.initTree(this.candidateData, 'candidate');
        this.initTree(this.selectedData, 'selected');
        this.countSelectedNodes(this.candidateData);
        this.service.sendMsg({ candidateCount: this.candidateCount, selectedCount: this.selectedCount });
        this._candidateNodeList = {};
        this.transferTreeToList(this.candidateData, 'candidate');
        this._selectedNodeList = {};
        this.transferTreeToList(this.selectedData, 'selected');
    }

    /**
     * set the show attribute to true
     * @docs-private
     */
    initTree(treeData: TreeNode[], mode: string) {
        if (treeData && treeData.length) {
            treeData.forEach((node: TreeNode) => {
                node.show = mode === 'candidate' ? true : node.isSelected;
                node.isExpanded = mode === 'candidate' ? false : node.isSelected;
                if (node.children && node.children.length) {
                    this.initTree(node.children, mode);
                }
            });
        }
    }

    /**
     * set the show attribute to false, for fitler
     * @docs-private
     */
    transferTreeToList(treeData: TreeNode[], mode: string, isForSearch?: boolean) {
        if (treeData && treeData.length) {
            treeData.forEach((node: TreeNode) => {
                node.show = !isForSearch ? node.show : false;
                if (mode === 'candidate') {
                    this._candidateNodeList[node.id] = node;
                }
                if (mode === 'selected') {
                    this._selectedNodeList[node.id] = node;
                }
                if (node.children && node.children.length) {
                    this.transferTreeToList(node.children, mode, isForSearch);
                }
            });
        }
    }

    /**
     * init count
     * @docs-private
     */
    initCount() {
        this.candidateCount = 0;
        this.selectedCount = 0;
    }

    /**
     * clear selected options's id as list
     * @docs-private
     */
    clearDataListSelected() {
        this.value = [];
    }

    /**
     * calculate selected options count and push in value
     * @docs-private
     */
    countSelectedNodes(tree: TreeNode[]) {
        if (tree && tree.length) {
            tree.forEach((node: TreeNode) => {
                if (node.isSelected && node.selectable && this.hasChildren(node)) {
                    this.selectedCount++;
                    this.value.push(node);
                }
                if (node.selectable && this.hasChildren(node)) {
                    this.candidateCount++;
                }
                if (node.children && node.children.length) {
                    this.countSelectedNodes(node.children);
                }
            });
        }
    }

    /**
     * judge node whether have child
     * @docs-private
     */
    hasChildren(node: TreeNode) {
        if (!node.children) {
            return true;
        }
        if (node.children && node.children.length === 0) {
            return true;
        }
        return false;
    }

    /**
     * fitler candidate or selected list by key word
     * @docs-private
     */
    searchByKeyWord(e: any) {
        const event = e.event;
        const mode = e.mode;
        // 向组件外部暴露搜索事件
        this.searchValue.emit(event);

        /**
         * when the keyword is null, show the all list data
         * @docs-private
         */
        if (!event) {
            if (mode === 'candidate') {
                this.candidateData = this.getRootNodes(this._candidateNodeList);
                this.initTree(this.candidateData, 'candidate');
                return;
            }
            if (mode === 'selected') {
                this.selectedData = this.getRootNodes(this._selectedNodeList);
                this.initTree(this.selectedData, 'selected');
                return;
            }
        }

        this.resetNodeList(mode);

        if (mode === 'candidate') {
            for (const key in this._candidateNodeList) {
                if (this._candidateNodeList.hasOwnProperty(key)) {
                    let node = this._candidateNodeList[key];
                    if (node.name && node.name.search(event) !== -1) {
                        this.searchNodes(node, mode);
                    }
                }
            }
            this.candidateData = (<any>[]).concat(this.candidateData);
        }
        if (mode === 'selected') {
            for (const key in this._selectedNodeList) {
                if (this._selectedNodeList.hasOwnProperty(key)) {
                    let node = this._selectedNodeList[key];
                    if (node.name && node.name.search(event) !== -1 && node.isSelected) {
                        this.searchNodes(node, mode);
                    }
                }
            }
            this.selectedData = (<any>[]).concat(this.selectedData);
        }
    }

    /**
     * reset candidate or selected node list
     * @docs-private
     */
    resetNodeList(mode: string) {
        if (mode === 'candidate') {
            this._candidateNodeList = {};
        }
        if (mode === 'selected') {
            this._selectedNodeList = {};
        }
        let treeData = mode === 'candidate' ? this.candidateData : this.selectedData;
        this.transferTreeToList(treeData, mode, true);
    }

    /**
     * get node the searched by key word
     * @docs-private
     */
    searchNodes(node: TreeNode, mode: string) {
        this.setSearchNodes(node, mode);
        if (node.parent) {
            let nodeParent: TreeNode | undefined;
            nodeParent = this.getTargetNode(node.parent, mode);
            if (nodeParent) {
                if (nodeParent.parent) {
                    this.searchNodes(nodeParent, mode);
                } else {
                    this.setSearchNodes(nodeParent, mode);
                }
            }
        }
    }

    /**
     * get target node in xxNodeList
     * @docs-private
     */
    getTargetNode(treeNode: TreeNode, mode: string): TreeNode | undefined {
        let targetNode: TreeNode | undefined;
        let nodeList = mode === 'candidate' ? this._candidateNodeList : this._selectedNodeList;
        targetNode = nodeList[treeNode.id];
        return targetNode;
    }

    /**
     * push filtered by word word node into xxSearchNodeList
     * @docs-private
     */
    setSearchNodes(node: TreeNode, mode: string) {
        if (mode === 'selected' && node.isSelected) {
            node.show = true;
        }
        node.show = true;
    }

    /**
     * get target node root node
     * @docs-private
     */
    getRootNodes(nodes: Object) {
        return (<any>Object).values(nodes).filter((node: TreeNode) => {
            return !node.parent;
        });
    }

    /**
     * tree node expand event
     * @docs-private
     */
    expandNode(event: TreeNode) {
        this.onExpandNode.emit(event);
    }

    /**
     * throw the node click event out
     * @docs-private
     */
    transNode(event: TreeNode, mode: string) {
        let chkVal = mode === 'selected' ? true : false;
        let targetNode: TreeNode | undefined = this.getTargetNode(event, mode);
        if (targetNode) {
            this.propagateDown(targetNode, chkVal);
            this.propagateUp(targetNode, chkVal, mode);
        }

        let rootNodes: TreeNode[] = this.renderTargetNode(mode);
        if (mode === 'candidate') {
            this.candidateData = rootNodes;
        } else {
            this.selectedData = rootNodes;
        }
        this.initCount();
        this.clearDataListSelected();
        this.countSelectedNodes(this.candidateData);
        this.service.sendMsg({ candidateCount: this.candidateCount, selectedCount: this.selectedCount });
        this.getValue.emit(this.value);
        this._markForCheck();
    }

    /**
     * propagate down node 'isSelected' value
     * @docs-private
     */
    propagateDown(node: TreeNode, chkVal: boolean) {
        if (node.selectable || (node.children && node.children.length)) {
            node.isSelected = chkVal;
        }
        if (node.children && node.children.length) {
            for (let child of node.children) {
                this.propagateDown(child, chkVal);
            }
        }
    }

    /**
     * propagate up node 'isSelected' value
     * @docs-private
     */
    propagateUp(node: TreeNode, chkVal: boolean, mode: string) {
        node.isSelected = chkVal;
        let nodeParent: TreeNode | undefined;
        if (node.parent) {
            nodeParent = this.getTargetNode(node.parent, mode);
            if (nodeParent) {
                if (nodeParent.parent) {
                    this.propagateUp(nodeParent, chkVal, mode);
                } else {
                    nodeParent.isSelected = chkVal;
                }
            }
        }
    }

    /**
     * render target node 'isExpanded' and 'isSelected' attribute
     * @docs-private
     */
    renderTargetNode(mode: string) {
        let nodeList = mode === 'candidate' ? this._candidateNodeList : this._selectedNodeList;
        let rootNodes: TreeNode[] = [];
        rootNodes = this.getRootNodes(nodeList);
        for (let root of rootNodes) {
            this.renderTransTree(root, mode);
        }
        return rootNodes;
    }

    /**
     * render target's root node and root's children the 'isExpanded' and 'isSelected' attribute
     * @docs-private
     */
    renderTransTree(root: TreeNode, mode: string) {
        root.show = mode === 'candidate' ? true : root.isSelected;
        if (mode === 'selected') {
            root.isExpanded = root.isSelected;
        }
        if (root.children && root.children.length) {
            for (let child of root.children) {
                this.renderTransTree(child, mode);
            }
        }
    }

    /**
     * trans all options to Selected or not
     * @docs-private
     */
    transAll(e) {
        if (this.disabled) {
            return;
        }
        const mode = e.mode;
        const chkVal = e.chkVal;
        // 当是‘candidate’mode，并且没有任何选中，禁止再次执行取消全部选中的操作过程
        if (mode === 'candidate' && this.selectedCount === 0) {
            return;
        }
        // 当是‘selected’mode，并且已经全部选中，禁止再次执行全部选中过程
        if (mode === 'selected' && this.selectedCount === this.candidateCount) {
            return;
        }

        let rootCandidateNodes: TreeNode[] = [];
        rootCandidateNodes = this.renderRootNodes(this.candidateData, mode, chkVal);
        this.candidateData = rootCandidateNodes;

        let rootSelectedNodes: TreeNode[] = [];
        rootSelectedNodes = this.renderRootNodes(this.selectedData, mode, chkVal);
        this.selectedData = rootSelectedNodes;

        this.initCount();
        this.clearDataListSelected();
        this.countSelectedNodes(this.candidateData);
        this.service.sendMsg({ candidateCount: this.candidateCount, selectedCount: this.selectedCount });
        this.getValue.emit(this.value);
        this._markForCheck();
    }

    /**
     * render root nodes and root's children the 'isExpanded' and 'isSelected' attribute
     * @docs-private
     */
    renderRootNodes(treeData: TreeNode[], mode: string, chkVal: boolean) {
        let rootNodes: TreeNode[] = this.getRootNodes(treeData);
        for (let root of rootNodes) {
            this.propagateDown(root, chkVal);
            this.renderTransTree(root, mode);
        }
        return rootNodes;
    }

    /**
     * throw out extend data event
     */
    extendData() {
        this.onExtendData.emit();
    }

    /**
     * The method to be called in order to update ngModel.
     * Now `ngModel` binding is not supported in multiple selection mode.
     */
    private _onModelChange: Function;

    /**
     * Registers a callback that will be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param fn On change callback function.
     */
    registerOnChange(fn: Function) {
        this._onModelChange = fn;
    }

    /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
    private _onTouch: Function;

    /**
     * Registers a callback that will be triggered when the control has been touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn On touch callback function.
     */
    registerOnTouched(fn: Function) {
        this._onTouch = fn;
    }

    /**
     * set tree-transfer model value
     * @docs-private
     */
    writeValue(value: any) {
        if (value != null) {
            this.value = value;
            this._cd.markForCheck();
        }
    }

    /**
     * update form model value and mark for check
     * @docs-private
     */
    _markForCheck() {
        if (this._onModelChange) {
            this._onModelChange(this.value);
        }

        if (this._onTouch) {
            this._onTouch(this.value);
        }

        this._cd.markForCheck();
    }
}

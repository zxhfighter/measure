import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    TemplateRef
} from '@angular/core';

import {
    SiderBarModel,
    TreeNode,
    TreeNodeParent
} from './side-bar-interface';
import { IS_SUGGESTION } from './side-bar.config';

@Component({
    selector: 'nb-side-bar',
    templateUrl: './side-bar.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-side-bar'
    }
})

export class SideBarComponent implements OnInit {

    /** click navi event */
    @Output() onNavi = new EventEmitter();

    /** toggle side-bar */
    @Output() toggle = new EventEmitter();

    /** side-bar data */
    @Input() data: SiderBarModel;

    /** side-bar default selected node */
    @Input() selectedNodeId: string;

    @Input() optionTpl: TemplateRef<any>;

    // search-box option
    /** search-box placeholder */
    @Input() searchPlaceholder: string = '联想搜索';
    
    /** Use search recommendation or not */
    @Input() isSuggestion: boolean = true;

    /**
     * storage tree-nodes as list
     * @docs-private
     */
    private _listTreeNodes: TreeNode[] = [];

    /**
     * storage search matched tree-nodes as list
     * @docs-private
     */
    private _listSearchNodes: TreeNode[] = [];

    /**
     * tree title node
     * @docs-private
     */
    root: string = '';

    /**
     * side-bar tree data
     * @docs-private
     */
    treeData: TreeNode[] = [];

    /**
     * search-box suggestion content
     * @docs-private
     */
    suggestionValue: Array<string | undefined> = [];

    /**
     * side-bar tree-node expanded or not
     * @docs-private
     */
    expanded: boolean = true;

    /**
     * judge treeData has data or not
     * @docs-private
     */
    hasTreeData: boolean = true;

    /**
     * selected node
     * @docs-private
     */
    selectedNode: TreeNode;

    /**
     * temp original data
     * @docs-private
     */
    tempData: SiderBarModel;

    constructor() { }

    ngOnInit() {
        this.setSelectNodeId();
        this.initTreeNodeProperty();
        this.tempDataIndex();
    }

    /**
     * set selected node id
     * @docs-private
     */
    setSelectNodeId() {
        if (!this.selectedNodeId && this.data.tree && this.data.tree.length > 0) {
            let firstChild: TreeNode | undefined;
            firstChild = this.getFirstChild(this.data.tree[0]);
            if (firstChild) {
                this.selectedNodeId = firstChild.id;
                this.onNavi.emit(firstChild);
            }
        }
    }
    /**
     * side-bar static search fuzzy match
     * @param {string} keyWord 搜索的字符串片段
     * @param {string} fullWord 完整的字符串
     * @returns boolean 字符串片段在字符串中的位置
     */
    fuzzySearch(keyWord: string, fullWord: string) {
        return fullWord.toLowerCase().includes(keyWord.trim().toLowerCase());
    }
    /**
     * init tree node property
     * @docs-private
     */
    initTreeNodeProperty() {
        if (this.data.tree) {
            this.treeData = JSON.parse(JSON.stringify(this.data.tree));
            this.initTree(this.treeData, !!this.data.expanded);
            this.transferTreeToList(this.data.tree);
            this.hasTreeData = this.checkTreeData();
        }
    }

    /**
     * temp data index
     * @docs-private
     */
    tempDataIndex() {
        this.tempData = this.data;
    }

    /**
     * change data-tree when data soure change
     * @docs-private
     */
    changeTree() {

        if (this.tempData !== this.data) {
            this.selectedNodeId = '';
            this.setSelectNodeId();
            this.initTreeNodeProperty();
            this.tempDataIndex();
        }

        return this.treeData;
    }

    /**
     * init tree data
     * @docs-private
     */
    initTree(treeData: TreeNode[], expanded: boolean) {
        if (treeData.length) {
            treeData.forEach((node: TreeNode) => {
                node.isExpanded = expanded;
                node.selectable = node.selectable !== false ? true : false;
                node.show = true;
                if (this.selectedNodeId === node.id) {
                    node.isSelected = true;
                    this.selectedNode = node;
                }
                if (node.children && node.children.length) {
                    this.initTree(node.children, expanded);
                }
            });
        }
    }

    /**
     * transfer tree to list
     * @docs-private
     */
    transferTreeToList(treeData: TreeNode[]) {
        if (treeData.length) {
            treeData.forEach((node: TreeNode) => {
                node.isExpanded = false;
                node.selectable = node.selectable !== false ? true : false;
                node.show = false;
                this._listTreeNodes.push(node);
                if (node.children && node.children.length) {
                    this.transferTreeToList(node.children);
                }
            });
        }
    }

    /**
     * listen the search-box search keyword suggest event
     * @docs-private
     */
    searchSuggestion(event: string) {
        let suggestionNodes: TreeNode[] = [];
        suggestionNodes = this.getSuggestionNodes(event);
        this.suggestionValue = suggestionNodes.length ? suggestionNodes.map((node: TreeNode) => node.name) : [];
    }

    /**
     * get matched keyword the suggest tree-node
     * @docs-private
     */
    getSuggestionNodes(event: string) {
        let listMatchedTreeNodes: TreeNode[] = [];
        for (let node of this._listTreeNodes) {
            if (node.name && this.fuzzySearch(event, node.name)) {
                listMatchedTreeNodes.push(node);
            }
        }
        return listMatchedTreeNodes.slice(0, 5);
    }

    /**
     * check tree data has data or not
     * @docs-private
     */
    checkTreeData() {
        return this.treeData && this.treeData.length ? true : false;
    }

    /**
     * listen search-box clear keyword event
     * @docs-private
     */
    clear(event: string) {
        this.search(event);
    }

    /**
     * listen tree-root refresh tree event
     * @docs-private
     */
    refreshTree() {
        this.search();
    }

    /**
     * listen search-box filter tree-node event
     * @docs-private
     */
    search(event: string = '') {
        /**
         * when the keyword is null, show the all navi item
         * @docs-private
         */
        if (!event) {
            this.treeData = JSON.parse(JSON.stringify(this.data.tree));
            this.initTree(this.treeData, !!this.data.expanded);
            this.hasTreeData = this.checkTreeData();
            return;
        }

        this._listTreeNodes = [];
        if (this.data.tree) {
            this.transferTreeToList(this.data.tree);
        }

        this._listSearchNodes = [];
        // get all matched keyword tree-nodes
        for (let node of this._listTreeNodes) {
            if (node.name && this.fuzzySearch(event, node.name)) {
                this.searchNodes(node);
            }
        }

        let rootNodes: TreeNode[] = [];
        rootNodes = this.getRootNodes(this._listSearchNodes);

        for (let root of rootNodes) {
            for (let node of this._listSearchNodes) {
                this.renderSelectedNode(root, node);
            }
        }

        this.treeData = rootNodes;
        this.hasTreeData = this.checkTreeData();
    }

    /**
     * find all the tree nodes associated with the key words
     * @docs-private
     */
    searchNodes(node: TreeNode) {
        if (node.parent) {
            this.setSearchNodes(node);
            let nodeParent: TreeNode | undefined;
            nodeParent = this.getParentNode(node.parent);
            if (nodeParent) {
                if (nodeParent.parent) {
                    this.searchNodes(nodeParent);
                } else {
                    this.setSearchNodes(nodeParent);
                }
            }
        } else {
            this.setSearchNodes(node);
        }
    }

    /**
     * get tree-node parent node
     * @docs-private
     */
    getParentNode(parent: TreeNodeParent): TreeNode | undefined {
        let parentNode: TreeNode | undefined;
        parentNode = this._listTreeNodes.find((node: TreeNode) => {
            return parent.id === node.id;
        });
        return parentNode;
    }

    /**
     * push matched keyword search node into _listSearchNodes
     * @docs-private
     */
    setSearchNodes(node: TreeNode) {
        if (!this.isExistRepetition(node)) {
            this._listSearchNodes.push(node);
        }
    }

    /**
     * judge in _listSearchNodes has repeat node or not
     * @docs-private
     */
    isExistRepetition(targetNode: TreeNode) {
        if (this._listSearchNodes.length === 0) {
            return false;
        } else {
            let nodeFinded: TreeNode | undefined;
            nodeFinded = this._listSearchNodes.find((node: TreeNode) => {
                return targetNode.id === node.id;
            });
            if (nodeFinded) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * get root nodes
     * @docs-private
     */
    getRootNodes(rootNodes: TreeNode[]) {
        return rootNodes.filter((node: TreeNode) => {
            return !node.parent;
        });
    }

    /**
     * render filtered tree-node
     * @docs-private
     */
    renderSelectedNode(rootNode: TreeNode, targetNode: TreeNode) {
        if (rootNode.id === targetNode.id) {
            rootNode.isExpanded = true;
            rootNode.selectable = rootNode.selectable !== false ? true : false;
            rootNode.show = true;
        } else {
            if (rootNode.children && rootNode.children.length) {
                for (let child of rootNode.children) {
                    if (targetNode.id === child.id) {
                        child.isExpanded = true;
                        child.selectable = child.selectable !== false ? true : false;
                        child.show = true;
                    } else {
                        this.renderSelectedNode(child, targetNode);
                    }
                }
            }
        }
    }

    /**
     * throw the navigation click event out
     * @docs-private
     */
    nodeSelect(event: TreeNode) {
        let targetNode: TreeNode | undefined;
        targetNode = this.setSelectedNode(event);
        if (targetNode) {
            this.selectedNode.isSelected = false;
            targetNode.isSelected = true;
            this.selectedNode = targetNode;
        }
        this.onNavi.emit(this.selectedNode);
    }

    /**
     * fold or unfold side-bar
     * @docs-private
     */
    fold() {
        this.expanded = !this.expanded;
        this.toggle.emit(this.expanded);
    }

    /**
     * set selected node
     * @docs-private
     */
    setSelectedNode(node: TreeNode) {
        if (node && node.children && node.children.length > 0) {
            let targetNode: TreeNode | undefined = this.getFirstChild(node);
            if (targetNode) {
                return targetNode;
            }
        } else {
            return node;
        }
    }

    /**
     * get node the first child
     * @param node
     * @docs-private
     */
    getFirstChild(node: TreeNode): TreeNode | undefined {
        if (node && node.children && node.children.length) {
            let firstChild: TreeNode | undefined;
            firstChild = node.children[0];
            if (firstChild && firstChild.children && firstChild.children.length > 0) {
                return this.getFirstChild(firstChild);
            } else {
                return firstChild;
            }
        } else {
            return node;
        }
    }
}

import {
    Component, 
    Input, 
    Output, 
    EventEmitter,
    OnInit, 
    ViewEncapsulation, 
    ChangeDetectionStrategy
} from '@angular/core';

import {SiderBarModel, TreeNode, TreeNodeParent} from './side-bar-interface';

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

    /** side-bar data */
    @Input() data: SiderBarModel;

    /** click navi event */
    @Output() onNavi = new EventEmitter();

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
    private root: string = '';

    /**
     * side-bar tree data
     * @docs-private
     */
    private treeData: TreeNode[] = [];

    /**
     * search-box suggestion content
     * @docs-private
     */
    private suggestionValue: string[] = [];

    /**
     * side-bar tree-node expanded or not
     * @docs-private
     */
    private expanded: boolean = true;

    /**
     * judge treeData has data or not
     * @docs-private
     */
    private hasTreeData: boolean = true;

    constructor() { }

    ngOnInit() {
        if (this.data.root) {
            this.root = this.data.root;
        }
        
        if (this.data.tree) {
            this.treeData = JSON.parse(JSON.stringify(this.data.tree));
            this.initTree(this.treeData, !!this.data.expanded);
            this.transferTreeToList(this.data.tree);
            this.hasTreeData = this.checkTreeData();
        }
    }

    /** init tree data */
    initTree(treeData: TreeNode[], expanded: boolean) {
        if (treeData.length) {
            treeData.forEach((node: TreeNode) => {
                node.isExpanded = expanded;
                node.show = true;
                if (node.children && node.children.length) {
                    this.initTree(node.children, expanded);
                }
            });
        }
    }

    /** transfer tree to list */
    transferTreeToList(treeData: TreeNode[]) {
        if (treeData.length) {
            treeData.forEach((node: TreeNode) => {
                node.isExpanded = false;
                node.show = false;
                this._listTreeNodes.push(node);
                if (node.children && node.children.length) {
                    this.transferTreeToList(node.children);
                }
            });
        }
    }

    /** listen the search-box search keyword suggest event */
    searchSuggestion(event: string) {
        let suggestionNodes: TreeNode[] = [];
        suggestionNodes = this.getSuggestionNodes(event);
        this.suggestionValue = suggestionNodes.map((node: TreeNode) => {
            return node.name;
        });
    }

    /** get matched keyword the suggest tree-node */
    getSuggestionNodes(event: string) {
        let listMatchedTreeNodes: TreeNode[] = [];
        let lengthMaxNodes = this._listTreeNodes.length > 3 ? 3 : this._listTreeNodes.length;
        for (let node of this._listTreeNodes) {
            /**
             * matching node that conform to key word
             * @docs-private
             */
            if (node.name && node.name.search(event) !== -1) {
                listMatchedTreeNodes.push(node);
            } 
            if (listMatchedTreeNodes.length === lengthMaxNodes) {
                return listMatchedTreeNodes;
            }
        }

        /**
         * when keyword filter results amount less than lengthMaxNodes, completion the lengthMaxNodes results.
         * @docs-private
         */
        if (listMatchedTreeNodes.length < lengthMaxNodes) {
            listMatchedTreeNodes = listMatchedTreeNodes.concat(
                this._listTreeNodes.slice(0, lengthMaxNodes - listMatchedTreeNodes.length)
            );
        }

        return listMatchedTreeNodes;
    }

    /**
     * check tree data has data or not
     * @docs-private
     */
    checkTreeData() {
        return this.treeData && this.treeData.length ? true : false;
    }

    /** listen search-box clear keyword event */
    clear(event: string) {
        this.search(event);
    }

    /** listen tree-root refresh tree event */
    refreshTree() {
        this.search();
    }

    /** listen search-box filter tree-node event */
    search(event?: string) {
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
            if (node.name && node.name.search(event) !== -1) {
                this.searchNodes(node);
            }
        }

        let rootNodes: TreeNode[] = [];
        rootNodes =  this.getRootNodes(this._listSearchNodes);
        
        for (let root of rootNodes) {
            for (let node of this._listSearchNodes) {
                this.renderSelectedNode(root, node);
            }
        }

        this.treeData = rootNodes;
        this.hasTreeData = this.checkTreeData();
    }

    /** find all the tree nodes associated with the key words */
    searchNodes(node: TreeNode) {
        if (node.parent) {
            this.setSearchNodes(node);
            let nodeParent: TreeNode;
            nodeParent = this.getParentNode(node.parent);
            if (nodeParent.parent) {
                this.searchNodes(nodeParent);
            } else {
                this.setSearchNodes(nodeParent);
            }
        } else {
            this.setSearchNodes(node);
        }
    }

    /** get tree-node parent node */
    getParentNode(parent: TreeNodeParent) {
        return this._listTreeNodes.find((node: TreeNode) => {
            return parent.id === node.id;
        });
    }

    /** push matched keyword search node into _listSearchNodes */
    setSearchNodes(node: TreeNode) {
        if (!this.isExistRepetition(node)) {
            this._listSearchNodes.push(node);
        }
    }

    /** judge in _listSearchNodes has repeat node or not */
    isExistRepetition(targetNode: TreeNode) {
        if (this._listSearchNodes.length === 0) {
            return false;
        } else {
            let nodeFinded: TreeNode;
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

    /** get root nodes */
    getRootNodes(rootNodes: TreeNode[]) {
        return rootNodes.filter((node: TreeNode) => {
            return !node.parent;
        });
    }

    /** render filtered tree-node */
    renderSelectedNode(rootNode: TreeNode, targetNode: TreeNode) {
        if (rootNode.id === targetNode.id) {
            rootNode.isExpanded = true;
            rootNode.show = true;
        } else {
            if (rootNode.children && rootNode.children.length) {
                for (let child of rootNode.children) {
                    if (targetNode.id === child.id) {
                        child.isExpanded = true;
                        child.show = true;
                    } else {
                        this.renderSelectedNode(child, targetNode);
                    }
                }
            }
        }
    }

    /** throw the navigation click event out */
    nodeSelect(event) {
        this.onNavi.emit(event);
    }

    /** fold or unfold side-bar */
    fold() {
        this.expanded = !this.expanded;
    }
}

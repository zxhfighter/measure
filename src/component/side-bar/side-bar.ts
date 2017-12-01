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

    @Input() data: SiderBarModel;

    private _listTreeNodes: TreeNode[] = [];

    private _listSearchNodes: TreeNode[] = [];

    private suggestionValue: string[] = [];

    constructor() { }

    ngOnInit() {
        if (this.data.tree) {
            this.transferTreeToList(this.data.tree);
        }
    }

    /** transfer tree to list */
    transferTreeToList(treeData: TreeNode[]) {
        if (treeData.length) {
            treeData.forEach((node: TreeNode) => {
                this._listTreeNodes.push(node);
                if (node.children && node.children.length) {
                    this.transferTreeToList(node.children);
                }
            });
        }
    }

    searchSuggestion(event: string) {
        let suggestionNodes: TreeNode[] = [];
        suggestionNodes = this.getSuggestionNodes(event);
        this.suggestionValue = suggestionNodes.map((node: TreeNode) => {
            return node.name;
        });
    }

    getSuggestionNodes(event: string) {
        let listMatchedTreeNodes: TreeNode[] = [];
        let lengthMaxNodes = this.data.tree.length > 3 ? 3 : this.data.tree.length;
        for (let node of this._listTreeNodes) {
            /**
             * matching node that conform to key word
             * @docs-private
             */
            if (node.name.search(event) !== -1) {
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

    search(event: string) {
        for (let node of this._listTreeNodes) {
            if (node.name.search(event) !== -1) {
                this.searchNodes(node);
            }
        }
    }

    searchNodes(node: TreeNode) {
        // let nodeParent: TreeNode;
        // if(node.parent) {
        //     nodeParent = this.getParentNode(node.parent);
        // } else {
        //     return node;
        // }
        // if (nodeParent.parent) {
        //     return this.searchNodes(nodeParent);
        // } else {
        //     return nodeParent;
        // }

        
        if (node.parent) {
            console.log(node);
            let nodeParent: TreeNode;
            nodeParent = this.getParentNode(node.parent);
            // console.log(nodeParent);
            if (nodeParent.parent) {
                this.searchNodes(nodeParent);
            } else {
                console.log(nodeParent);
            }
        } else {
            console.log(node);
        }
    }

    getParentNode(parent: TreeNodeParent) {
        return this._listTreeNodes.find((node: TreeNode) => {
            return parent.id === node.id;
        });
    }

    setSearchNodes(node: TreeNode) {

    }
}

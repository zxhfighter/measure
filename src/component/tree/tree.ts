import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy
} from '@angular/core';

import { TreeNode } from './treenode';
import { TreeNodeParent } from './treenodeparent';

@Component({
    selector: 'nb-tree',
    templateUrl: './tree.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-tree'
    }
})
export class TreeComponent implements OnInit {

    /** input tree-nodes value */
    @Input() treeData: TreeNode[] = [];

    /** input tree mode, default: '', have ''|'candidate'|'selected' three modes*/
    @Input() selectionMode: string;

    /** Whether upward propagation events, default:true */
    @Input() propagateSelectionUp: boolean = true;

    /** Whether downward propagation events, default:true */
    @Input() propagateSelectionDown: boolean = true;

    /** Outward exposure selection event */
    @Output() onNodeSelect = new EventEmitter();

    /** private variable tree-list
     *  @docs-private
     */
    private _treeList = [];

    constructor() { }

    ngOnInit() {
        if (this.selectionMode) {
            this.transferTreeToList(this.treeData);
        }
    }

    /** transfer tree to list */
    transferTreeToList(treeData: object[]) {
        if (treeData.length) {
            treeData.forEach((node: TreeNode) => {
                this._treeList.push(node);
                if (node.children && node.children.length) {
                    this.transferTreeToList(node.children);
                }
            });
        }
    }

    /** listen tree-node click event */
    onNodeClick(node: TreeNode) {
        if (!node.selectable) {
            return;
        }

        switch (this.selectionMode) {
            case "candidate":
                this.clickCandidate(node);
                break;
            case "selected":
                this.clickSelected(node);
                break;
            case "navigation":
                this.clickNavigation(node);
                break;
            default:
                return;
        }
    }

    /** candidate mode click event handler */
    clickCandidate(node: TreeNode) {
        if (!node.isSelected) {
            if (this.propagateSelectionDown) {
                this.propagateDown(node, true);
            }
            if (this.propagateSelectionUp) {
                this.propagateUp(node, true);
            }
            this.onNodeSelect.emit(node);
        }
    }

    /** selected mode click event handler */
    clickSelected(node: TreeNode) {
        if (node.isSelected) {
            if (this.propagateSelectionDown) {
                this.propagateDown(node, false);
            }
            if (this.propagateSelectionUp) {
                this.propagateUp(node, false);
            }
            this.onNodeSelect.emit(node);
        }
    }

    clickNavigation(node: TreeNode) {
        this.onNodeSelect.emit(node);
    }

    /** select event downward propagate handler */
    propagateDown(node: TreeNode, select: boolean) {
        node.isSelected = select;
        if (node.children && node.children.length) {
            for (let child of node.children) {
                this.propagateDown(child, select);
            }
        }
    }

    /** select event upward propagate handler */
    propagateUp(node: TreeNode, select: boolean) {
        node.isSelected = select;
        let nodeParent: TreeNode;
        if (node.parent) {
            nodeParent = this.getParent(node.parent);
            if (nodeParent.children && nodeParent.children.length) {
                let selectedCount: number = 0;
                for (let child of nodeParent.children) {
                    if (child.isSelected === select || (child.isSelected === undefined && !child.selectable)) {
                        selectedCount++;
                    }
                }
                if (nodeParent.children.length === selectedCount) {
                    nodeParent.isSelected = select;
                }
            }

            if (nodeParent.isSelected === select && nodeParent.parent) {
                this.propagateUp(nodeParent, select);
            }
        }
    }

    /** get tree-node parent tree-node */
    getParent(treeNodeParent: TreeNodeParent) {
        return this._treeList.find((node: TreeNode) => {
            return treeNodeParent.id === node.id;
        });
    }
}

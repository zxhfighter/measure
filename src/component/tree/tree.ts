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

    /** tree node selection event */
    @Output() onNodeSelect = new EventEmitter();

    /** tree node expand event */
    @Output() onExpandNode = new EventEmitter();

    /**
     * input tree-nodes value
     * @default []
     */
    @Input() treeData: TreeNode[] = [];

    /**
     * input four mode, have '', 'candidate', 'selected', 'navigation' four modes
     * @default ''
     */
    @Input() selectionMode: string;

    /**
     * Whether is disabled or not
     * @default false
     */
    @Input() disabled: boolean = false;

    /**
     * Whether upward propagation events, default: true
     * @default true
     */
    @Input() propagateSelectionUp: boolean = true;

    /**
     * Whether downward propagation events, default: true
     * @default true
     */
    @Input() propagateSelectionDown: boolean = true;

    /**
     * support custom template
     */
    @Input() optionTpl: TemplateRef<any>;

    /** private variable tree-list
     *  @docs-private
     */
    private _treeList: TreeNode[] = [];

    constructor() { }

    ngOnInit() {
        if (this.selectionMode) {
            this.transferTreeToList(this.treeData);
        }
    }

    /**
     * transfer tree to list
     * @docs-private
     */
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

    /**
     * tree node expand event
     * @docs-private
     */
    expandNode(event: TreeNode) {
        this.onExpandNode.emit(event);
    }

    /**
     * listen tree-node click event
     * @docs-private
     */
    onNodeClick(node: TreeNode) {
        if (!node.selectable || this.disabled) {
            return;
        }

        switch (this.selectionMode) {
            case 'candidate':
                this.clickCandidate(node);
                break;
            case 'selected':
                this.clickSelected(node);
                break;
            case 'navigation':
                this.clickNavigation(node);
                break;
            default:
                return;
        }
    }

    /**
     * candidate mode click event handler
     * @docs-private
     */
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

    /**
     * selected mode click event handler
     * @docs-private
     */
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

    /**
     * click navigation node
     * @param node
     * @docs-private
     */
    clickNavigation(node: TreeNode) {
        this.onNodeSelect.emit(node);
    }

    /**
     * select event downward propagate handler
     * @docs-private
     */
    propagateDown(node: TreeNode, select: boolean) {
        node.isSelected = select;
        node.show = select;
        if (node.children && node.children.length) {
            for (let child of node.children) {
                this.propagateDown(child, select);
            }
        }
    }

    /**
     * select event upward propagate handler
     * @docs-private
     */
    propagateUp(node: TreeNode, select: boolean) {
        node.isSelected = select;
        node.show = select;
        if (node.parent) {
            let nodeParent: TreeNode | undefined;
            nodeParent = this.getParent(node.parent);
            if (nodeParent && nodeParent.children && nodeParent.children.length) {
                let selectedCount: number = 0;
                for (let child of nodeParent.children) {
                    if (child.isSelected === select || (child.isSelected === undefined && !child.selectable)) {
                        selectedCount++;
                    }
                }
                if (nodeParent.children.length === selectedCount) {
                    nodeParent.isSelected = select;
                    nodeParent.show = select;
                }
            }

            if (nodeParent && nodeParent.isSelected === select && nodeParent.parent) {
                this.propagateUp(nodeParent, select);
            }
        }
    }

    /**
     * get tree-node parent tree-node
     * @docs-private
     */
    getParent(treeNodeParent: TreeNodeParent): TreeNode | undefined {
        let parentNode: TreeNode | undefined;
        parentNode = this._treeList.find((node: TreeNode) => {
            return treeNodeParent.id === node.id;
        });
        return parentNode;
    }
}

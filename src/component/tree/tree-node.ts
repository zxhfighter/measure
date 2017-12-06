import {
    Component, 
    Input, 
    Output, 
    EventEmitter,
    OnInit, 
    ViewEncapsulation, 
    ChangeDetectionStrategy, 
    Inject, 
    forwardRef
} from '@angular/core';
import {TreeNode} from './treenode';
import {TreeComponent} from './tree';

@Component({
    selector: 'nb-tree-node',
    templateUrl: './tree-node.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-tree-node'
    }
})
export class TreeNodeComponent implements OnInit {

     /** input tree-node value */
    @Input() node: TreeNode;

    constructor(@Inject(forwardRef(() => TreeComponent)) public tree: TreeComponent) { }

    ngOnInit() { }
    
    /** listen tree-node click event */
    onNodeClick() {
        this.tree.onNodeClick(this.node);
    }

    /** fold or unfold tree-node event */
    toggle(event: Event) {
        event.stopPropagation();
        this.node.isExpanded = !this.node.isExpanded;
    }
}

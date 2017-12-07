import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy
} from '@angular/core';

import { TreeNode, TreeNodeParent } from './transfer-interface';

export type CANDIDATE_MODE = 'tree' | 'table';

export type SELECTED_MODE = 'tree' | 'path';

@Component({
    selector: 'nb-transfer',
    templateUrl: './transfer.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-transfer'
    },
    exportAs: 'nbTransfer'
})
export class TransferComponent implements OnInit {

    @Input() candidateData: TreeNode[] = [];

    @Input() originalCandidateData: TreeNode[] = [];

    @Input() candidateMode: CANDIDATE_MODE = 'tree';

    @Input() selectedData: TreeNode[] = [];

    @Input() originalselectedData: TreeNode[] = [];

    @Input() selectedMode: SELECTED_MODE = 'tree';

    private candidateCount: number = 0;

    private selectedCount: number = 0;

    private hasTreeData: boolean = true;

    constructor() { }

    ngOnInit() {
        this.originalCandidateData = JSON.parse(JSON.stringify(this.candidateData));
        this.originalselectedData = JSON.parse(JSON.stringify(this.selectedData));
        this.initTree(this.candidateData, 'candidate');
        this.initTree(this.selectedData, 'selected');
    }

    initTree(treeData: TreeNode[], mode: string) {
        if (treeData.length) {
            treeData.forEach((node: TreeNode) => {
                if (mode === 'candidate') {
                    node.show = true;
                    node.isExpanded = false;
                    this.candidateCount++;
                    if (node.isSelected) {
                        this.selectedCount++;
                    }
                }
                if (mode === 'selected') {
                    node.show = node.isSelected;
                    node.isExpanded = node.isSelected;
                }
                if (node.children && node.children.length) {
                    this.initTree(node.children, mode);
                }
            });
        }
    }

    clearCandidate(event) {

    }

    searchCandidate(event) {
        
    }

    /** throw the navigation click event out */
    nodeSelect(event) {
        console.log(event);
    }
}

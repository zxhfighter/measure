export interface TreeNodeParent {
    id: string;
}

export interface TreeNode {
    id?: any;
    name?: string;
    selectable?: boolean;
    isExpanded?: boolean;
    isSelected?: boolean;
    show?: boolean;
    parent?: TreeNodeParent;
    children?: TreeNode[];
    leaf?: boolean;
    styleClass?: string;
    expandedIcon?: any;
    collapsedIcon?: any;
    icon?: any;
}

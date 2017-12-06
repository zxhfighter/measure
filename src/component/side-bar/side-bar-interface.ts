export interface TreeNodeParent {
    id: string;
}

export interface TreeNode {
    id?: any;
    name?: string;
    selectable?: boolean;
    isExpanded?: boolean;
    isSelected?: boolean;
    parent?: TreeNodeParent;
    children?: TreeNode[];
    leaf?: boolean;
    styleClass?: string;
    expandedIcon?: any;
    collapsedIcon?: any;
    icon?: any;
}

export interface SiderBarModel {
    title?: string;
    expanded?: boolean;
    root?: string;
    tree?: TreeNode[];
}

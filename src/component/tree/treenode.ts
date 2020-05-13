import { TreeNodeParent } from './treenodeparent';

export interface TreeNode  {
    id?: any;
    name?: string;
    selectable?: boolean;
    isExpanded?: boolean;
    isSelected?: boolean;
    isPartSelected?: boolean;
    level?: number;
    show?: boolean;
    parent?: TreeNodeParent;
    hasChild?: boolean;
    children?: TreeNode[];
    leaf?: boolean;
    styleClass?: string;
    expandedIcon?: any;
    collapsedIcon?: any;
    icon?: any;
}

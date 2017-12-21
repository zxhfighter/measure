import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree';
import { TreeNodeComponent } from './tree-node';

@NgModule({
    imports: [CommonModule],
    declarations: [
        TreeComponent,
        TreeNodeComponent
    ],
    providers: [],
    exports: [
        TreeComponent,
        TreeNodeComponent
    ]
})

export class TreeModule { }

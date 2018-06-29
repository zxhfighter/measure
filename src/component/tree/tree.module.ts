import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree';
import { TreeNodeComponent } from './tree-node';
import { TooltipModule } from '../tooltip';

@NgModule({
    imports: [
        CommonModule,
        TooltipModule
    ],
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

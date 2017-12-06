import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    ButtonModule,
    BreadcrumbModule,
    SwitchModule,
    ButtonGroupModule,
    BoxGroupModule,
    ChartModule,
    ProgressBarModule,
    SpinnerModule,
    CarouselModule,
    InputModule,
    TableModule,
    TabsModule,
    StepModule,
    TooltipModule,
    OverlayModule,
    PageModule,
    TextareaModule,
    TextLineModule,
    SearchBoxModule,
    ToastModule,
    ToastService,
    SelectModule,
    CalendarModule,
    RegionModule,
    DialogModule,
    ChipsModule,
    CodeHighlighterModule,
    CodeBoxModule,
    TreeModule,
    SideBarModule,
    AccordionModule,
    UploaderModule,
    TransferModule
} from '../component';

import { AppComponent } from './app.component';
import { appRoutes } from './app.router';

import { DemoInput } from './input';
import { DemoTabs } from './tabs';
import { DemoTooltip } from './tooltip';
import { DemoPage } from './page';
import { DemoTextarea } from './textarea';
import { DemoTextLine } from './text-line';
import { DemoSearchBox } from './search-box';
import { DemoTree } from './tree';
import { DemoToast } from './toast';
import { DemoSelect } from './select';
import { DemoDialog } from './dialog';
import { ChipsDemoModule } from './chips';
import { DemoCodeHighlighter } from './code-highlighter';
import { DemoCodeBox } from './code-box';
import { DemoAccordion } from './accordion';
import { DemoUploader } from './uploader';
import { DemoSideBar } from './side-bar';
import { DemoTransfer } from './transfer';

import { ButtonDemoModule } from './button';
import { BreadcrumbDemoModule } from './breadcrumb';
import { SwitchDemoModule } from './switch';
import { ButtonGroupDemoModule } from './button-group';
import { BoxGroupDemoModule } from './box-group';
import { ChartDemoModule } from './chart';
import { ProgressbarDemoModule } from './progress-bar';
import { SpinnerDemoModule } from './spinner';
import { CarouselDemoModule } from './carousel';
import { StepDemoModule } from './step';
import { CalendarDemoModule } from './calendar';
import { RegionDemoModule } from './region';
import { CardDemoModule } from './card';
import { TableDemoModule } from './table';

const demoModules = [
    ButtonDemoModule,
    BreadcrumbDemoModule,
    SwitchDemoModule,
    ButtonGroupDemoModule,
    BoxGroupDemoModule,
    ChartDemoModule,
    ProgressbarDemoModule,
    SpinnerDemoModule,
    CarouselDemoModule,
    StepDemoModule,
    CalendarDemoModule,
    RegionDemoModule,
    CardDemoModule,
    TableDemoModule,
    ChipsDemoModule
];

@NgModule({
    declarations: [
        AppComponent,
        DemoInput,
        DemoTabs,
        DemoTooltip,
        DemoPage,
        DemoTextarea,
        DemoTextLine,
        DemoSearchBox,
        DemoTree,
        DemoToast,
        DemoSelect,
        DemoDialog,
        DemoCodeHighlighter,
        DemoCodeBox,
        DemoTree,
        DemoSideBar,
        DemoAccordion,
        DemoUploader,
        DemoTransfer
    ],
    imports: [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule.forRoot(),
        BreadcrumbModule,
        SwitchModule,
        ButtonGroupModule,
        BoxGroupModule,
        ChartModule,
        ProgressBarModule,
        SpinnerModule,
        CarouselModule,
        InputModule,
        TabsModule,
        StepModule,
        TableModule,
        PageModule,
        TooltipModule,
        OverlayModule,
        TextareaModule,
        TextLineModule,
        SearchBoxModule,
        CalendarModule,
        ToastModule,
        SelectModule,
        RegionModule,
        DialogModule,
        ChipsModule,
        CodeHighlighterModule,
        CodeBoxModule,
        TreeModule,
        SideBarModule,
        AccordionModule,
        UploaderModule,
        TransferModule,
        // demos
        ...demoModules,
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    providers: [ToastService],
    bootstrap: [AppComponent]
})
export class AppModule { }

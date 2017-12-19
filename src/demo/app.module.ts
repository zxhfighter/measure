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
    ScheduleModule,
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

import { DemoPage } from './page';
import { DemoSchedule } from './schedule';
import { DemoTextarea } from './textarea';
import { DemoTextLine } from './text-line';
import { SearchBoxDemo } from './search-box';
import { DemoTree } from './tree';
import { ToastDemoModule } from './toast';
import { SelectDemoModule } from './select';
import { OverlayDemo } from './overlay';
import { DialogDemoModule } from './dialog';
import { ChipsDemoModule } from './chips';
import { CodeBoxDemo } from './code-box';
import { DemoAccordion } from './accordion';
import { DemoUploader } from './uploader';
import { DemoSideBar } from './side-bar';
import { DemoTransfer } from './transfer';
import { GuideComponentDemo } from './docs';
import { IconsComponentDemo } from './icons';
import { TypographyDemo } from './typography';

import { InputDemoModule } from './input';
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
import { CodeHighlighterDemoModule } from './code-highlighter';
import { SliderDemoModule } from './slider';
import { TabsDemoModule } from './tabs';
import { TooltipDemoModule } from './tooltip';

const demoModules = [
    InputDemoModule,
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
    ToastDemoModule,
    SelectDemoModule,
    ChipsDemoModule,
    CodeHighlighterDemoModule,
    SliderDemoModule,
    TabsDemoModule,
    TooltipDemoModule,
    DialogDemoModule
];

@NgModule({
    declarations: [
        AppComponent,
        DemoPage,
        DemoSchedule,
        DemoTextarea,
        DemoTextLine,
        SearchBoxDemo,
        DemoTree,
        CodeBoxDemo,
        DemoTree,
        DemoSideBar,
        OverlayDemo,
        DemoAccordion,
        DemoUploader,
        DemoTransfer,
        GuideComponentDemo,
        IconsComponentDemo,
        OverlayDemo,
        TypographyDemo
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
        ScheduleModule,
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

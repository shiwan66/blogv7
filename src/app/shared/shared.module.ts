import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";
import { CustomFormsModule } from 'ng2-validation'
import { ModalModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { Ng2TableModule } from 'ng2-table'
import { PaginationModule } from 'ngx-bootstrap'
import { BaiduMapModule } from 'angular2-baidu-map';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxAddressModule } from 'ngx-address';
import { NgSelectModule } from '@ng-select/ng-select';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxStepperModule } from 'ngx-stepper';
import { CalendarModule } from 'angular-calendar';
import localeZh from '@angular/common/locales/zh';
import { LoadingModule } from 'ngx-loading';

import { AddressDataChinaService } from 'ngx-address/data/china';

import { LayoutFluidComponent } from './layout-fluid/layout-fluid.component';
import { SwitchMenuComponent } from './switch-menu/switch-menu.component';
import { CommonTableComponent } from './common/table/common-table/common-table.component';
import { SituationCardComponent } from './common/situation-card/situation-card.component';
import { CommonLineChartComponent } from './common/common-line-chart/common-line-chart.component';
import { ImportComponent } from './common/import/import.component';
import { AlertComponent } from './common/alert/alert.component';
import { HolderComponent } from './common/holder/holder.component';
import { CalendarHeaderComponent } from './common/calendar-header/calendar-header.component';
import { LiquidComponent } from './common/liquid/liquid.component';

registerLocaleData(localeZh);
import { defineLocale } from 'ngx-bootstrap/chronos';
import { zhCnLocale } from 'ngx-bootstrap/locale';
defineLocale('zh-cn', zhCnLocale); 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    CustomFormsModule,
    NgxEchartsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    Ng2TableModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxAddressModule,
    BaiduMapModule.forRoot({ak: 'eYwAcLkbQRZQPLgF9x0VnMkKunQcilpb'}),
    NgSelectModule,
    DpDatePickerModule,
    NgxDatatableModule,
    NgxStepperModule,
    CalendarModule.forRoot(),
    LoadingModule
  ],
  declarations: [LayoutFluidComponent, SwitchMenuComponent, CommonTableComponent, SituationCardComponent, CommonLineChartComponent, ImportComponent, AlertComponent, HolderComponent, CalendarHeaderComponent, LiquidComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    CustomFormsModule,
    ModalModule,
    TabsModule,
    Ng2TableModule,
    PaginationModule,
    BsDatepickerModule,
    BaiduMapModule,
    NgxEchartsModule,
    NgxAddressModule,
    NgSelectModule,
    DpDatePickerModule,
    NgxDatatableModule,
    NgxStepperModule,
    CalendarModule,
    LoadingModule,
    LayoutFluidComponent,
    SwitchMenuComponent,
    CommonTableComponent,
    SituationCardComponent,
    CommonLineChartComponent,
    ImportComponent,
    AlertComponent,
    HolderComponent,
    CalendarHeaderComponent,
    LiquidComponent
  ],
  providers: [AddressDataChinaService]
})
export class SharedModule { }

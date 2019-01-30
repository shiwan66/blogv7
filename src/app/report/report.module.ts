import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReportRouterModule } from './report-router.module'

import { ReportService } from './services/report.service'

import { ReportComponent } from './report/report.component';
import { ReportTableComponent } from './common/table/report-table/report-table.component';

@NgModule({
  imports: [
    SharedModule,
    ReportRouterModule
  ],
  declarations: [ReportComponent, ReportTableComponent],
  providers: [ReportService]
})
export class ReportModule { }

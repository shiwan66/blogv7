import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReportRouterModule } from './report-router.module'

import { ReportService } from './services/project-progress.service'

import { ReportComponent } from './report/report.component';

@NgModule({
  imports: [
    SharedModule,
    ReportRouterModule
  ],
  declarations: [ReportComponent],
  providers: [ReportService]
})
export class ReportModule { }

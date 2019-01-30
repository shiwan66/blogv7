import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from '../core/auth-guard.service'

import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path: '', canActivate:[AuthGuardService], component: ReportComponent}
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ReportRouterModule { }

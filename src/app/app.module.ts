import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TaskComponent } from './task/task.component';
import { PointComponent } from './point/point.component';
import { SampleComponent } from './sample/sample.component';
import { InputComponent } from './input/input.component';
import { LoginComponent } from './login/login.component';

// head组件
import {HeadComponent} from './head/head.component';
import {TaskStatisticComponent} from './task-statistic/task-statistic.component';
import {ProjectProgressComponent} from './project-progress/project-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    PointComponent,
    SampleComponent,
    InputComponent,
    LoginComponent,
    HeadComponent,
    TaskStatisticComponent,
    ProjectProgressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

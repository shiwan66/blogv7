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
import { CameraComponent } from './camera/camera.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    PointComponent,
    SampleComponent,
    InputComponent,
    LoginComponent,
    CameraComponent
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

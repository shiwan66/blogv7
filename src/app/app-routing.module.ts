import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { PointComponent } from './point/point.component';
import { SampleComponent } from './sample/sample.component';
import { InputComponent } from './input/input.component';
import { LoginComponent } from './login/login.component';
import { CameraComponent } from './camera/camera.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'task', component: TaskComponent},
  {path: 'point', component: PointComponent},
  {path: 'sample', component: SampleComponent},
  {path: 'input', component: InputComponent},
  {path: 'camera', component: CameraComponent},
  {path: '**', component: LoginComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

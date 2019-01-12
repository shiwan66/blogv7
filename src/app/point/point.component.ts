import { Component, OnInit } from '@angular/core';
import { Task } from '../model/Task';
import { SampleService } from '../sample.service';
import { Router } from '@angular/router';
import { Point } from '../model/Point';
declare var $: any;

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.css']
})
export class PointComponent implements OnInit {
  task: Task;
  points: Point[];

  constructor(private sampleService: SampleService,
    private router: Router) { }

  ngOnInit() {
    let id: number;
    id = parseInt(localStorage.getItem("taskId"));
    this.getIdTask(id);
    this.getPoints();
    const inter = setInterval(function() {
      if($) {
        clearInterval(inter);
      }
    }, 10)
  }

  getIdTask(id: number):void{
    this.sampleService.getIdTask(id).subscribe(task =>{ this.task = task });
  }

  getPoints():void{
    this.sampleService.getPoint().subscribe(points =>{ 
      this.points = points.filter(point => point.task.project.user.login == localStorage.getItem("login") && point.task.id == this.task.id);
    });
  }

  onClick(point: Point){
    localStorage.setItem("pointId", point.id+'');
    this.router.navigate(['/sample']);
  }

}

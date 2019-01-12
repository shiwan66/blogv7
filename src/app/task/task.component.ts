import { Component, OnInit } from '@angular/core';
import { SampleService } from '../sample.service';
import { Task } from '../model/Task';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[];
  selectedTask: Task;

  constructor(private sampleService: SampleService,
    private router: Router) { }

  ngOnInit(){
    this.getTask();
    const inter = setInterval(function() {
      if($) {
        clearInterval(inter);
      }
    }, 10)
  }

  getTask():void{
    this.sampleService.getTask()
      .subscribe(tasks => this.tasks = tasks);
  }

  onSelect(task: Task): void {
    localStorage.setItem("taskId", task.id+"");
    this.selectedTask = task;
  }

  getPoint(task: Task):void{
    localStorage.setItem("taskId", task.id+"");
    this.router.navigate(['/point']);
  }
}

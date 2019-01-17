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
  tasks: Task[] = [];
  currentTasks: Task[] = [];
  selectedTask: Task;
  search: string = "";

  constructor(private sampleService: SampleService,
    private router: Router) { }

  ngOnInit(){
    this.getTask();
  }

  getTask():void{
    this.sampleService.getTask().subscribe(tasks => {
      this.tasks = tasks
      this.currentTasks = this.tasks;
    });
  }

  onSelect(task: Task): void {
    localStorage.setItem("taskId", task.id+"");
    this.selectedTask = task;
  }

  getPoint(task: Task):void{
    localStorage.setItem("taskId", task.id+"");
    this.router.navigate(['/point']);
  }

  filterTask() {
    this.currentTasks = this.tasks.filter(item => item.code.indexOf(this.search) > -1);
  }
}

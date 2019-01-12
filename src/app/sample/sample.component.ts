import { Component, OnInit } from '@angular/core';
import { Point } from '../model/Point';
import { SampleService } from '../sample.service';
import { Router } from '@angular/router';
import { Sample } from '../model/Sample';
declare var $: any;

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {
  point: Point;
  samples: Sample[];
  selectedAll: boolean;

  constructor(private sampleService: SampleService,
    private router: Router) { }

  ngOnInit() {
    let id = parseInt(localStorage.getItem("pointId"));
    this.getIdPoint(id);
    this.getSample();
    this.selectedAll = false;
    const inter = setInterval(function() {
      if($) {
        clearInterval(inter);
      }
    }, 10)
  }

  //获取点位列表
  getIdPoint(id: number):void{
    this.sampleService.getIdPoint(id).subscribe(
       point =>{ this.point = point }
    );
  }

  //获取采样列表
  getSample():void{
    this.sampleService.getSamples().subscribe(
      samples =>{ 
        this.samples = samples.filter(sample => sample.point.task.project.user.login == localStorage.getItem("login") && sample.point.id == this.point.id);
      }
    );
  }

  //全选
  selectAll():void{
    this.selectedAll = !this.selectedAll;
  }

  //点击选中
  onCheck(sample: Sample):void{
  
  }

  //提交
  submit(){

  }

  //跳转测定结果
  onClick(sample: Sample){
    localStorage.setItem("sampleId", sample.id+'');
    this.router.navigate(['/input']);
  }
}

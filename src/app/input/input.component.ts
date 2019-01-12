import { Component, OnInit } from '@angular/core';
import { SampleService } from '../sample.service';
import { Router, Params } from '@angular/router';
import { Sample } from '../model/Sample';
import { SampleUser } from '../model/SampleUser';
declare var $: any;

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  params: Params;
  samples: Sample[];
  currentSample: Sample = {};
  sampleUsers: SampleUser[];
  list: any;

  constructor(private sampleService: SampleService,
    private router: Router) { }

  ngOnInit() {
    var id = localStorage.getItem("sampleId");        
    var pointId = localStorage.getItem("pointId"); 
    this.getSample(parseInt(pointId));
    this.getIdSample(parseInt(id));
    this.getSampleUser();
    this.getParams(parseInt(id));
    const inter = setInterval(function() {
      if($) {
        clearInterval(inter);
      }
    }, 10)
  }

  getParams(id: number){
    this.sampleService.getParams().subscribe(
      params =>{ 
        this.params = params.filter(param => param.sample.id == id);
        this.list = JSON.parse(this.params[0].json);
      }
   );
  }

  //获取采样列表
  getSample(pointId: number):void{
    this.sampleService.getSamples().subscribe(
      samples =>{ 
        this.samples = samples.filter(sample => sample.point.task.project.user.login == localStorage.getItem("login") && sample.point.id == pointId);
      }
    );
  }

  //获取采样列表
  getIdSample(id: number):void{
    this.sampleService.getIdSamples(id).subscribe(
      sample =>{ this.currentSample = sample;}
    );
  }

  getSampleUser():void{
    this.sampleService.getSampleUsers().subscribe(
      sampleUsers => { this.sampleUsers= sampleUsers }
    );
  }

  sampleCodeChange(select){
    localStorage.setItem("sampleId", select+'');
    location.reload()
    console.log(select+'');
  }

  save(){

  }

  submit(){
    
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { SampleService } from '../sample.service';
import { Router } from '@angular/router';
import { Sample } from '../model/Sample';
import { SampleUser } from '../model/SampleUser';
import { Params } from '../model/Params';
declare var $: any;
declare var BKDialog: any;
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
  user1Id: number;
  user2Id: number;
  @ViewChild('baseInput') baseInput;
  @ViewChild('paramInput') paramInput;

  constructor(private sampleService: SampleService,
    private router: Router) { }

  ngOnInit() {
    var id = localStorage.getItem("sampleId");        
    var pointId = localStorage.getItem("pointId"); 
    this.getSample(parseInt(pointId));
    this.getIdSample(parseInt(id));
    this.getSampleUser();
    this.getParams(parseInt(id));
  }

  getParams(id: number){
    this.sampleService.getParams().subscribe(
      params =>{ 
        this.params = params.filter(param => param.sample.id == id)[0];
        this.list = JSON.parse(this.params.json);
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
      sample =>{ 
        this.user1Id = sample.user1.id;
        this.user2Id = sample.user2.id;
        this.currentSample = sample;
      }
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
  }

  userChange(key) {
    if(key == 'user1') {
      this.currentSample.user1  = this.sampleUsers.filter(user => user.id == this.user1Id)[0]
    } else if(key == 'user2') {
      this.currentSample.user2  = this.sampleUsers.filter(user => user.id == this.user2Id)[0]
    } 
  }

  save(){
    this.params.json = JSON.stringify(this.list);
    this.sampleService.putParams(this.params).subscribe(result => {
      alert('数据提交成功');
      history.back();
    }, error => {
      console.dir(error);
    })
  }

  submit(save:boolean){
    var that = this;
    if(this.currentSample.sampleDate &&
      this.user1Id &&
      this.user2Id &&
      (this.currentSample.dqy || this.currentSample.dqy==0) &&
      this.currentSample.fx&&
      (this.currentSample.fs || this.currentSample.fs==0) &&
      (this.currentSample.wd || this.currentSample.wd==0) &&
      (this.currentSample.xdsd || this.currentSample.xdsd==0)
    ) {
      if(save) {
        this.currentSample.status = "PROCESS";
      } else {
        this.currentSample.status = "COMPLATE";
      }
      this.save();
      this.sampleService.putSample(this.currentSample).subscribe(result => {
        console.dir("基础数据保存成功");
      }, error => {
        alert("基础数据保存失败")
      });
    } else {
      alert("请将基础数据录入完整");
      this.baseInput.nativeElement.focus()
    }
  }
}

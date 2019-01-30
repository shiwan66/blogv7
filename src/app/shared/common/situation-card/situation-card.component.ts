import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-situation-card',
  templateUrl: './situation-card.component.html',
  styleUrls: ['./situation-card.component.scss']
})
export class SituationCardComponent implements OnInit {
//   @Input() deviceId?: string = "";
  @Input() currentDevice?:any = {};
  @Input() devMeasure?:any = {};
  @Output() removeSelect: EventEmitter<any> = new EventEmitter();
  @ViewChild("panel") panel;
  dragFlag = false;
  x:any;
  y:any;
  div:any;
  constructor() { }

  ngOnInit() {
    setTimeout(() => this.dragPanel(this.devMeasure.deviceId), 1000);
  }

  close() {
    this.removeSelect.emit({
        type: 'close',
        value: this.devMeasure.deviceId
    })
  }
  select() {
    this.removeSelect.emit({
        type: 'select',
        value: this.devMeasure.deviceId
    })
  }
  dragPanel(id){
    this.div = document.getElementById(id);
    this.div.style.top = 145+Math.random()*50+'px';
    this.div.style.left = 1450+Math.random()*50+'px';
    var that = this
    that.div.onmousedown = function (e) {
        e = e || window.event;
        that.x = e.clientX - that.div.offsetLeft;
        that.y = e.clientY - that.div.offsetTop;
        that.dragFlag = true;

        that.div.style.cursor = "move";
    };

    that.div.onmousemove = function (e) {
        if (that.dragFlag) {
            e = e || window.event;
            that.div.style.left = e.clientX - that.x + "px";
            that.div.style.top = e.clientY - that.y + "px";
        }
    };

    that.div.onmouseup = function (e) {
        that.dragFlag = false;
        that.div.style.cursor = "default";
    };
}

}

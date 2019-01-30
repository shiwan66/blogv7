import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() model: {type?: string, message?: string};
  @Output() selectChanged = new EventEmitter();
  isExpired: boolean;

  private date: Date;
  constructor() {
      //setTimeout(() => this.OnTimeOut(), 1000);
  }

  private OnTimeOut() {

  }
}

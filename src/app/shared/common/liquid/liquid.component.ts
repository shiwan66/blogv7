import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-liquid',
  templateUrl: './liquid.component.html',
  styleUrls: ['./liquid.component.scss']
})
export class LiquidComponent implements OnInit {
  @Input() value: string;
  constructor() { }
  ngOnInit() {
  }

}

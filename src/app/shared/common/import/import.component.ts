import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  @Input() title: string = "";
  @Input() type: string = "";
  constructor() { }

  ngOnInit() {
  }

}

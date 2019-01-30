import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from '../services/report.service'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  instruments: any[];
  instrumentId: string;
  logId: string;
  measures: any[];
  measureId: string;
  constructor(private reportSvc: ReportService, private router: Router) { }

  ngOnInit() {
    this.reportSvc.getInstrumentList().subscribe(result => {
      if (result) {
        this.instruments = result.datas;
        this.instrumentId = this.instruments[0];
        this.selectChange(this.instrumentId);
      }
    })
  }

  selectChange(id) {
    this.measures = null;
    this.reportSvc.getMeasuresByInstrumentId(this.instrumentId).subscribe(result => {
      if (result) {
        this.measures = result;
      }
    })
  }

  clickItem(data) {
    this.measureId = data.batchNumber;
    this.logId = data.logId
  }

  downloadReport() {
    if(this.logId && this.instrumentId && this.measureId) {
      this.reportSvc.getReport(this.logId, this.instrumentId, this.measureId).subscribe(result => {
        if(result) {
          console.dir('http://'+(<any>result)._body)
          // this.router.navigateByUrl('http://'+(<any>result)._body);
          window.open('http://'+(<any>result)._body, "_blank", "")
        }
      })
    }
  }

}

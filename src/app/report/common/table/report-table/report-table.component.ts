import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit {
  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: '测量批号',      name: 'batchNumber'},
    {title: '开始时间',      name: 'startTime'},
    {title: '结束时间',    name: 'endTime'},
    {title: 'O2浓度均值(%)',    name: 'resultO2Avg' },
    {title: 'SO2浓度均值(mg/m³)', name: 'resultSO2Avg' },
    {title: 'NO浓度均值(mg/m³)',    name: 'resultNOAvg'},
    {title: 'NO2浓度均值(mg/m³)',    name: 'resultNO2Avg'}, 
    {title: 'NOx浓度均值(mg/m³)',  name: 'resultNOXAvg' } ,
    {title: 'CO浓度均值(mg/m³)',  name: 'resultCOAvg' } , 
    {title: 'H2S浓度均值(mg/m³)', name: 'resultH2SAvg'} , 
    {title: 'CO2浓度均值(mg/m³)', name: 'resultCO2Avg'} , 
    {title: '测量时流量(L/min)',  name: 'flowRateAvg' }
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered', 'font12']
  };
  public configs: any;

  @Input() data?:Array<any> = [];
  @Output() clickItem = new EventEmitter();
  firstText: string = "首页";
  lastText: string = "尾页";
  previousText: string = "上一页";
  nextText: string = "下一页";

  public constructor() { }

  public ngOnInit():void {
    this.length = this.data.length;
    this.onChangeTable(this.config);
  }

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if(this.configs == null) this.configs = config;
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    this.clickItem.emit(data.row);
  }

  public pageChanged(result) {
    this.onChangeTable(this.config, result)
  }
}

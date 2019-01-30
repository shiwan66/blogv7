import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges,ChangeDetectionStrategy  } from '@angular/core';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent implements OnInit {
  @Input() columns:Array<any> = [];
  @Input() data?:Array<any> = [];
  @Input() count?:number = 0;
  @Input() config?:any = {};
  @Input() paging?: boolean = false;
  @Output() pagingChange?:EventEmitter<{page: number, pageSize: number}> = new EventEmitter();
  @Input('showSerach') show?: boolean = true; 
  @Output() cellClick:EventEmitter<any> = new EventEmitter();
  public configs: any;
  public customerPage: any;

  public rows:Array<any> = [];
  public page:number = 1;
  @Input() itemsPerPage?:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  firstText: string = "首页";
  lastText: string = "尾页";
  previousText: string = "上一页";
  nextText: string = "下一页";

  public constructor() {
  }

  public ngOnInit():void {
    this.config = Object.assign({}, {
      paging: true,
      sorting: {columns: this.columns},
      filtering: {filterString: ''},
      className: ['table-striped', 'table-bordered']
    }, this.config);
    this.onChangeTable(this.config);
  }

  ngOnChanges(changes: SimpleChanges) {
    // if(changes.data.currentValue != changes.data.previousValue) {
    //   this.onChangeTable(this.config, {page: this.page, itemsPerPage: this.itemsPerPage}, this.customerPage);
    // }
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

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}, customerPage?: any):any {
    // if(this.count) this.length = this.count;
    // else this.length = this.data.length;
    // if(this.configs == null) this.configs = config;
    // if (config.filtering) {
    //   Object.assign(this.config.filtering, config.filtering);
    // }

    // if (config.sorting) {
    //   Object.assign(this.config.sorting, config.sorting);
    // }
    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    if(!this.customerPage) {
      this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    } else {
      this.rows = sortedData;
      // this.length = sortedData.length;
    }
  }

  public onCellClick(data: any): any {
    this.cellClick.emit(data);
  }

  public pageChanged(result) {
    if(this.paging) {
      this.customerPage = {page: result.page, pageSize:result.itemsPerPage};
      this.pagingChange.emit(this.customerPage);
    } else {
      this.onChangeTable(this.config)
    }
  }
}

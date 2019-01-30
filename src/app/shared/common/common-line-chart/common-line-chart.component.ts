import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-common-line-chart',
  templateUrl: './common-line-chart.component.html',
  styleUrls: ['./common-line-chart.component.scss']
})
export class CommonLineChartComponent implements OnInit {
  @Input() data?: any;
  @Input() setting?: any = {};
  lineoption = {
    title: {
      // text: '性能变化率'
    },
    smooth: true,
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: [
        { name: '值', textStyle: { fontSize: 10, color: "#9bca62" } }
      ]
    },
    grid: {
      show: true,
      x: 25,//grid 组件离容器左侧的距离
      y: 26,
      x2: 25,
      y2: 26,
      borderWidth: 2,
      borderColor: '#53c6f8',
      backgroundColor: 'rgba(255,255, 255, 0.05)'
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        boundaryGap: false
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '{value}',
          textStyle: { color: '#ddd' }
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
          name: '值',
          type: 'line',
          smooth: true,
          label: {
            normal: {
              show: true,
              position: 'top',
              color:'#fff'
            }
          },
      }
    ]
  };
  updateLineoption: any;
  values: any[] = [];
  constructor() { }

  ngOnInit() {
    this.values = [this.data];
    this.updateLineoption = {
      series: [
        {
          data: this.values
        }
      ]  
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.values) {
      if(this.values.length >= 10) {
        this.values.shift();
      }
      this.values.push(this.data);
      this.updateLineoption = {
        series: [
          {
            data: this.values
          }
        ]
      }
    }
  }

}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonLineChartComponent } from './common-line-chart.component';

describe('CommonLineChartComponent', () => {
  let component: CommonLineChartComponent;
  let fixture: ComponentFixture<CommonLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

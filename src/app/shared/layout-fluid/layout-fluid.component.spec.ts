import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutFluidComponent } from './layout-fluid.component';

describe('LayoutFluidComponent', () => {
  let component: LayoutFluidComponent;
  let fixture: ComponentFixture<LayoutFluidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutFluidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutFluidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

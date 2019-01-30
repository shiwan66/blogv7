import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidComponent } from './liquid.component';

describe('LiquidComponent', () => {
  let component: LiquidComponent;
  let fixture: ComponentFixture<LiquidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiquidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

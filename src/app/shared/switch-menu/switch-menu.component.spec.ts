import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchMenuComponent } from './switch-menu.component';

describe('SwitchMenuComponent', () => {
  let component: SwitchMenuComponent;
  let fixture: ComponentFixture<SwitchMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

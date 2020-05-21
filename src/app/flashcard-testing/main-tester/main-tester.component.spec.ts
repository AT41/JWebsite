import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTesterComponent } from './main-tester.component';

describe('MainTesterComponent', () => {
  let component: MainTesterComponent;
  let fixture: ComponentFixture<MainTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

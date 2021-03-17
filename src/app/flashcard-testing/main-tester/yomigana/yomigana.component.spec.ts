import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YomiganaComponent } from './yomigana.component';

describe('YomiganaComponent', () => {
  let component: YomiganaComponent;
  let fixture: ComponentFixture<YomiganaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YomiganaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YomiganaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

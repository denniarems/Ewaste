import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSortedComponent } from './view-sorted.component';

describe('ViewSortedComponent', () => {
  let component: ViewSortedComponent;
  let fixture: ComponentFixture<ViewSortedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSortedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSortedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

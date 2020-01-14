import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclerRouteComponent } from './recycler-route.component';

describe('RecyclerRouteComponent', () => {
  let component: RecyclerRouteComponent;
  let fixture: ComponentFixture<RecyclerRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecyclerRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecyclerRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

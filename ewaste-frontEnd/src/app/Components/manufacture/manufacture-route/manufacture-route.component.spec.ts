import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureRouteComponent } from './manufacture-route.component';

describe('ManufactureRouteComponent', () => {
  let component: ManufactureRouteComponent;
  let fixture: ComponentFixture<ManufactureRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufactureRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

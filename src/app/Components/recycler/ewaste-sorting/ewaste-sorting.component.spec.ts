import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EwasteSortingComponent } from './ewaste-sorting.component';

describe('EwasteSortingComponent', () => {
  let component: EwasteSortingComponent;
  let fixture: ComponentFixture<EwasteSortingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EwasteSortingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EwasteSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

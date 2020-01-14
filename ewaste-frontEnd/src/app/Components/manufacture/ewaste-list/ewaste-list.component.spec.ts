import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EwasteListComponent } from './ewaste-list.component';

describe('EwasteListComponent', () => {
  let component: EwasteListComponent;
  let fixture: ComponentFixture<EwasteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EwasteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EwasteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

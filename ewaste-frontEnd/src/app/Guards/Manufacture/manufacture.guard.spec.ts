import { TestBed, async, inject } from '@angular/core/testing';

import { ManufactureGuard } from './manufacture.guard';

describe('ManufactureGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManufactureGuard]
    });
  });

  it('should ...', inject([ManufactureGuard], (guard: ManufactureGuard) => {
    expect(guard).toBeTruthy();
  }));
});

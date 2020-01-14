import { TestBed, async, inject } from '@angular/core/testing';

import { RecyclerGuard } from './recycler.guard';

describe('RecyclerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecyclerGuard]
    });
  });

  it('should ...', inject([RecyclerGuard], (guard: RecyclerGuard) => {
    expect(guard).toBeTruthy();
  }));
});

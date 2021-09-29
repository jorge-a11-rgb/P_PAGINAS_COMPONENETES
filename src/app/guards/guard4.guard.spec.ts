import { TestBed } from '@angular/core/testing';

import { Guard4Guard } from './guard4.guard';

describe('Guard4Guard', () => {
  let guard: Guard4Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Guard4Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

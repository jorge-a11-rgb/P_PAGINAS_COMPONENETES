import { TestBed } from '@angular/core/testing';

import { Guards1Guard } from './guards1.guard';

describe('Guards1Guard', () => {
  let guard: Guards1Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Guards1Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

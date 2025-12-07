import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard';

describe('authGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const guard = TestBed.inject(AuthGuard);
    expect(guard).toBeTruthy();
  });
});

import {
  inject,
  TestBed,
} from '@angular/core/testing';
import {
  AuthedGuardService,
} from './authed-guard.service';

describe('AuthedGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthedGuardService,
      ],
    });
  });

  it('should be created', inject([
    AuthedGuardService,
  ], (service: AuthedGuardService) => {
    expect(service).toBeTruthy();
  }));
});

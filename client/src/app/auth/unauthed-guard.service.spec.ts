import {
  inject,
  TestBed,
} from '@angular/core/testing';
import {
  UnauthedGuardService,
} from './unauthed-guard.service';

describe('UnauthedGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnauthedGuardService,
      ],
    });
  });

  it('should be created', inject([
    UnauthedGuardService,
  ], (service: UnauthedGuardService) => {
    expect(service).toBeTruthy();
  }));
});

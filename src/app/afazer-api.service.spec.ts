import { TestBed } from '@angular/core/testing';

import { AfazerApiService } from './afazer-api.service';

describe('AfazerApiService', () => {
  let service: AfazerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfazerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FinDataService } from './fin-data.service';

describe('FinDataService', () => {
  let service: FinDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(FinDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

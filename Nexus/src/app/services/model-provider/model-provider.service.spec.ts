import { TestBed, inject } from '@angular/core/testing';

import { ModelProviderService } from './model-provider.service';

describe('ModelProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelProviderService]
    });
  });

  it('should be created', inject([ModelProviderService], (service: ModelProviderService) => {
    expect(service).toBeTruthy();
  }));
});

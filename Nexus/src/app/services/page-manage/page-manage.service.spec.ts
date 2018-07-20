import { TestBed, inject } from '@angular/core/testing';

import { PageManageService } from './page-manage.service';

describe('PageManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageManageService]
    });
  });

  it('should be created', inject([PageManageService], (service: PageManageService) => {
    expect(service).toBeTruthy();
  }));
});

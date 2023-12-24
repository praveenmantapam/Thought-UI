import { TestBed } from '@angular/core/testing';

import { NgxWiztreeService } from './ngx-wiztree.service';

describe('NgxWiztreeService', () => {
  let service: NgxWiztreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxWiztreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

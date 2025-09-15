import { TestBed } from '@angular/core/testing';

import { SidebarService } from './sidebar-service';

describe('SidebarService', () => {
  let service: SidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidebarService]
    });
    service = TestBed.inject(SidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shoud have initial state as flase', (done) => {
    service.isOpen$.subscribe((value) => {
      expect(value).toBeFalse();
      done();
    });
  });

  it('should toggle the drawer state', (done) => {
    let callCount = 0;
    service.isOpen$.subscribe((value) => {
      callCount++;
      if (callCount === 2) {
        expect(value).toBeTrue();
        done();
      }
    });
    service.toggleDrawer();
  });

  it('should set drawer state explicitly', (done) => {
    let results: boolean[] = [];
    service.isOpen$.subscribe((value) => {
      results.push(value);
      if (results.length === 2) {
        expect(results[1]).toBeTrue();
        done();
      }
    });
    service.setDrawerState(true);
  });
});

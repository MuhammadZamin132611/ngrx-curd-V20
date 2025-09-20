import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { StorageService } from './employee/services/storage-service';

describe('App', () => {
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  beforeEach(async () => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['getItem']);

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: StorageService, useValue: storageServiceSpy }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call storage.getItem oninit (constructor)', () => {
    TestBed.createComponent(App);
    expect(storageServiceSpy.getItem).toHaveBeenCalled();
  });

});

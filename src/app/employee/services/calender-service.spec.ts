import { TestBed } from '@angular/core/testing';

import { CalenderService } from './calender-service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CalenderModel } from '../model/calender.model';

describe('CalenderService', () => {
  let service: CalenderService;
  let httpMock: HttpTestingController;

  const baseUrl = 'http://localhost:3000/calender';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideHttpClientTesting()],
      providers: [CalenderService]
      // providers: [CalenderService, provideHttpClientTesting()]
    });

    service = TestBed.inject(CalenderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all calender entries', () => {
    const mockData: CalenderModel[] = [
      {
        id: "Ad5w9fw2kbi8BYLK",
        title: "Client Meet",
        participants: "zamin@gmail.com",
        startDate: "2025-09-11T09:00:00.000Z",
        startTime: "14:30",
        endDate: "2025-09-11T09:00:00.000Z",
        endTime: "15:00",
        location: "New Delhi",
        details: "Discuss about projects",
        repeat: "daily",
        bypassLobby: "everyone",
        presenter: "everyone"
      }
    ];

    service.getCalender().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch calender entry by id', () => {
    const mockEntry: CalenderModel =
    {
      id: "Ad5w9fw2kbi8BYLK",
      title: "Client Meet",
      participants: "zamin@gmail.com",
      startDate: "2025-09-11T09:00:00.000Z",
      startTime: "14:30",
      endDate: "2025-09-11T09:00:00.000Z",
      endTime: "15:00",
      location: "New Delhi",
      details: "Discuss about projects",
      repeat: "daily",
      bypassLobby: "everyone",
      presenter: "everyone"
    };

    service.getByIdCalender(mockEntry.id).subscribe((data) => {
      expect(data).toEqual(mockEntry);
    });

    const req = httpMock.expectOne(`${baseUrl}/${mockEntry.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEntry);
  });

  it('should add a new calender entry', () => {
    const newEntry: CalenderModel =
    {
      id: "Ad5w9fw2kbi8BYLK",
      title: "Client Meet",
      participants: "zamin@gmail.com",
      startDate: "2025-09-11T09:00:00.000Z",
      startTime: "14:30",
      endDate: "2025-09-11T09:00:00.000Z",
      endTime: "15:00",
      location: "New Delhi",
      details: "Discuss about projects",
      repeat: "daily",
      bypassLobby: "everyone",
      presenter: "everyone"
    };

    service.addCalender(newEntry).subscribe((data) => {
      expect(data).toEqual(newEntry)
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newEntry);
  });

  it('should update a calender entry', () => {
    const updateEntry: CalenderModel =
    {
      id: "Ad5w9fw2kbi8BYLK",
      title: "Client Meet",
      participants: "zamin@gmail.com",
      startDate: "2025-09-11T09:00:00.000Z",
      startTime: "14:30",
      endDate: "2025-09-11T09:00:00.000Z",
      endTime: "15:00",
      location: "New Delhi",
      details: "Discuss about projects",
      repeat: "daily",
      bypassLobby: "everyone",
      presenter: "everyone"
    };

    service.updateCalender(updateEntry.id, updateEntry).subscribe((data) => {
      expect(data).toEqual(updateEntry);
    });

    const req = httpMock.expectOne(`${baseUrl}/${updateEntry.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updateEntry);
  });

  it('should delete a calender entery', () => {
    const id = "qFLtBePKVnZxuYpJ";

    service.deleteCalender(id).subscribe((data) => {
      expect(data).toBeTruthy();
    });

    const req = httpMock.expectOne(`${baseUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });

});

import {TestBed} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";


let testUrl = '/data';

interface Data {
  name: string;
}

describe('Http Client Testing Module', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should call the testurl with get Request method', () => {
    const testData: Data = {name: 'Lukas'};
    httpClient.get<Data>(testUrl).subscribe(data => {
      expect(data).toEqual(testData);
    });
    const request = httpTestingController.expectOne('/data');
    request.flush(testData);
    expect(request.request.method).toBe('GET');
  });

  it('should test multiple requests', () => {
    const testData: Data[] = [{name: 'Lukas'}, {name: 'Markus'}];
    httpClient.get<Data[]>(testUrl).subscribe();
    httpClient.get<Data[]>(testUrl).subscribe();
    httpClient.get<Data[]>(testUrl).subscribe();
    const requests = httpTestingController.match(testUrl);
    expect(requests.length).toEqual(3);

    requests[0].flush([]);
    requests[1].flush([testData[0]]);
    requests[2].flush([testData]);
  });
});

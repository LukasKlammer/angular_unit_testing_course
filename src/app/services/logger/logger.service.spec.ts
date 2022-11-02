import { LoggerService } from "./logger.service"
import {TestBed} from "@angular/core/testing";

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService],
    });
    service = TestBed.inject(LoggerService);
  });

  it(('should not have any messages at starting'), () => {
    // arrange - beforeEach()

    // act
    let count = service.messages.length;

    // assert
    expect(count).toBe(0);
  });

  it(('should add the message when log is called'), () => {
    // arrange

    // act
    service.log('message');

    // assert
    expect(service.messages.length).toBe(1);
  });

  it(('should clear the service if clear is called'), () => {
    // arrange

    // act
    service.log('message1');
    service.log('message2');
    service.clear();

    // assert
    expect(service.messages.length).toBe(0);
  })
});

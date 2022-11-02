import {LoggerService} from "../logger/logger.service";
import {CalculatorService} from "./calculator.service"
import {TestBed} from "@angular/core/testing";

function setUp() {
  const mockLoggerService = jasmine.createSpyObj('loggerService', ['log']);
  TestBed.configureTestingModule({
    providers: [
      CalculatorService, {
        provide: LoggerService,
        useValue: mockLoggerService
      }
    ]
  })
  const calculator = TestBed.inject(CalculatorService);
  const loggerServiceSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;

  return {calculator, loggerServiceSpy}
}

describe('CalculatorService', () => {
  it('should add two numbers', () => {
    const {calculator, loggerServiceSpy} = setUp();
    let result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    const {calculator, loggerServiceSpy} = setUp();
    let result = calculator.subtract(2, 2);
    expect(result).toBe(0);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });
})

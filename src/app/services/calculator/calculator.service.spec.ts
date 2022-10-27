import { LoggerService } from "../logger/logger.service";
import { CalculatorService } from "./calculator.service"

describe('CalculatorService', () => {
  let mockLoggerService: LoggerService;
  let calculator: CalculatorService;

  beforeEach(()=>{
    mockLoggerService = jasmine.createSpyObj('loggerService', ['log']);
    calculator = new CalculatorService(mockLoggerService);
  })

  it('should add two numbers', () => {
    let result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  })

  it('should subtract two numbers', () => {
    let result = calculator.subtract(2, 2);
    expect(result).toBe(0);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  })
})

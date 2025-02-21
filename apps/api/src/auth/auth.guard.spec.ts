import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClerkAuthGuard } from './clerk-auth.guard';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

describe('ClerkAuthGuard', () => {
  let guard: ClerkAuthGuard;
  let mockReflector: jest.Mocked<Reflector>;
  let mockContext: jest.Mocked<ExecutionContext>;

  beforeEach(() => {
    mockReflector = {
      getAllAndOverride: jest.fn(),
    } as any;

    mockContext = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as any;

    guard = new ClerkAuthGuard(mockReflector);
  });

  it('should handle public routes', () => {
    mockReflector.getAllAndOverride.mockReturnValue(true);

    const result = guard.canActivate(mockContext);

    expect(result).toBe(true);
    expect(mockReflector.getAllAndOverride).toHaveBeenCalledWith(
      IS_PUBLIC_KEY,
      [mockContext.getHandler(), mockContext.getClass()],
    );
  });

  it('should handle protected routes', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(false);

    // Spy on the parent AuthGuard's canActivate method
    const authGuardSpy = jest
      .spyOn(Object.getPrototypeOf(ClerkAuthGuard.prototype), 'canActivate')
      .mockReturnValue(true);

    const result = await guard.canActivate(mockContext);

    expect(result).toBe(true);
    expect(mockReflector.getAllAndOverride).toHaveBeenCalledWith(
      IS_PUBLIC_KEY,
      [mockContext.getHandler(), mockContext.getClass()],
    );
    expect(authGuardSpy).toHaveBeenCalledWith(mockContext);
  });
});

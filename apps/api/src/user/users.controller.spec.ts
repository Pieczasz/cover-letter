import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn().mockResolvedValue({
              userId: 'test-id',
              name: 'Test User',
              email: 'test@example.com',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UserService>(UserService);
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const body = {
        userId: 'test-id',
        name: 'Test User',
        email: 'test@example.com',
      };

      const result = await controller.createUser(body, {});

      expect(result).toEqual(body);
      expect(userService.createUser).toHaveBeenCalledWith(
        body.userId,
        body.name,
        body.email,
      );
    });
  });
});

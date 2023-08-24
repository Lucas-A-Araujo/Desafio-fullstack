import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Knowledge } from './entities/knowledge.entity';
import {
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getAll: jest.fn(),
            getOne: jest.fn(),
            create: jest.fn(),
            validateUser: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'User 1',
        email: 'user1@example.com',
        cpf: '12345678901231',
        celular: '987654321',
        knowledge: ['Knowledge 1'],
        // Provide necessary properties for createUserDto
      };
      const createdUser = {}; // Provide a sample User object

      usersService.create = jest.fn().mockReturnValue(createdUser);

      const result = await usersController.create(createUserDto);
      expect(result).toEqual(createdUser);
    });

    // Add more test cases for edge cases and validation
  });

  // Add tests for other methods in UsersController
});

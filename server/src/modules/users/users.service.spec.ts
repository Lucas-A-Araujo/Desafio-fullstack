import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Knowledge } from './entities/knowledge.entity';

describe('UsersService', () => {
  let usersService: UsersService;
  const userRepositoryMock = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };
  const knowledgeRepositoryMock = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
        {
          provide: getRepositoryToken(Knowledge),
          useValue: knowledgeRepositoryMock,
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      const users = [
        {
          id: 1,
          name: 'User 1',
          email: 'user1@example.com',
          cpf: '12345678901231',
          celular: '987654321',
          knowledge: [{ id: '1', name: 'Knowledge 1' }],
        },
        {
          id: 2,
          name: 'User 2',
          email: 'user2@example.com',
          cpf: '12345678901232',
          celular: '987654322',
          knowledge: [{ id: '2', name: 'Knowledge 2' }],
        },
      ];
      userRepositoryMock.find.mockResolvedValue(users);

      const result = await usersService.getAll();
      expect(result).toEqual(users);
    });
  });
});

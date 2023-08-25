import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Knowledge } from './entities/knowledge.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let usersService: UsersService;
  const userRepositoryMock = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(),
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

  describe('getOne', () => {
    it('should return a user by id', async () => {
      const user = {
        id: 1,
        name: 'User 1',
        email: 'user1@example.com',
        cpf: '12345678901231',
        celular: '987654321',
        knowledge: [{ id: '1', name: 'Knowledge 1' }],
      };
      userRepositoryMock.findOne.mockResolvedValue(user);

      const result = await usersService.getOne('1');
      expect(result).toEqual(user);
    });

    it('should throw an error if the user is not found', async () => {
      userRepositoryMock.findOne.mockResolvedValue(null);

      try {
        await usersService.getOne('1');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toEqual(HttpStatus.NOT_FOUND);
        expect(error.message).toEqual(`User ID 1 not found`);
      }
    });
  });

  describe('getUserByName', () => {
    it('should return a user by name', async () => {
      const user = {
        id: 1,
        name: 'User 1',
        email: 'user1@example.com',
        cpf: '12345678901231',
        celular: '987654321',
        knowledge: [{ id: '1', name: 'Knowledge 1' }],
      };
      userRepositoryMock.createQueryBuilder = jest.fn().mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(user),
      });

      const result = await usersService.getUserByName('User 1');
      expect(result).toEqual(user);
    });

    it('should throw an error if the user is not found', async () => {
      userRepositoryMock.createQueryBuilder = jest.fn().mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null),
      });

      try {
        await usersService.getUserByName('Nonexistent User');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toEqual(HttpStatus.NOT_FOUND);
        expect(error.message).toEqual('User not found');
      }
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'User 1',
        email: 'user1@example.com',
        cpf: '12345678901231',
        celular: '987654321',
        knowledge: ['Knowledge 1'],
      };
      const user = {
        ...createUserDto,
        id: '1',
        knowledge: [{ id: '1', name: 'Knowledge 1' }],
      };
      userRepositoryMock.findOne.mockResolvedValue(null);
      userRepositoryMock.create.mockReturnValue(user);
      userRepositoryMock.save.mockResolvedValue(user);
      knowledgeRepositoryMock.findOne.mockResolvedValue({
        id: '1',
        name: 'Knowledge 1',
      });

      const result = await usersService.create(createUserDto);
      expect(result).toEqual(user);
    });

    it('should not create a new user with the same cpf', async () => {
      const createUserDto: CreateUserDto = {
        name: 'User 1',
        email: 'user1@example.com',
        cpf: '12345678901231',
        celular: '987654321',
        knowledge: ['Knowledge 1'],
      };
      const user = {
        ...createUserDto,
        id: '1',
        knowledge: [{ id: '1', name: 'Knowledge 1' }],
      };
      userRepositoryMock.findOne.mockResolvedValue(user);
      userRepositoryMock.create.mockReturnValue(user);
      userRepositoryMock.save.mockResolvedValue(user);
      knowledgeRepositoryMock.findOne.mockResolvedValue({
        id: '1',
        name: 'Knowledge 1',
      });
      try {
        await usersService.create(createUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toEqual(HttpStatus.CONFLICT);
        expect(error.message).toEqual(`CPF já cadastrado`);
      }
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      const user = {
        id: 1,
        name: 'User 1',
        email: 'user1@example.com',
        cpf: '12345678901231',
        celular: '987654321',
        knowledge: [{ id: '1', name: 'Knowledge 1' }],
      };

      userRepositoryMock.findOne.mockResolvedValue(user);

      await usersService.remove('1');
      expect(userRepositoryMock.remove).toHaveBeenCalledWith(user);
    });

    it('should throw an error if the user is not found', async () => {
      userRepositoryMock.findOne.mockResolvedValue(null);

      try {
        await usersService.remove('1');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toEqual(HttpStatus.NOT_FOUND);
        expect(error.message).toEqual(`Course ID 1 not found`);
      }
    });
  });

  describe('validateUser', () => {
    it('should update the user status and validation date', async () => {
      const user = {
        id: 1,
        status: false,
        dataValidacao: null,
      };
      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(userRepositoryMock, 'save').mockImplementation((user) => user);

      const result = await usersService.validateUser('1', { status: true });
      expect(result.status).toBe(true);
      expect(result.dataValidacao).toBeDefined();
    });

    it('should throw an error if the user is not found', async () => {
      userRepositoryMock.findOne.mockResolvedValue(null);
      const updateUserDto = {
        status: true,
      };

      try {
        await usersService.validateUser('1', updateUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toEqual(HttpStatus.NOT_FOUND);
        expect(error.message).toEqual('Colaborador com ID 1 não encontrado.');
      }
    });
  });
});

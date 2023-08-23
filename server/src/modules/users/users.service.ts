import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Lucas',
      email: 'mail@mail.com',
      cpf: '000.000.000-00',
      celular: '(82) 90000-0000',
      knowledge: [
        'Git',
        'React',
        'PHP',
        'NodeJS',
        'DevOps',
        'Banco de Dados',
        'TypeScript',
      ],
    },
  ];

  getAll() {
    return this.users;
  }

  getOne(id: string) {
    const user = this.users.find((user) => user.id === Number(id));

    if (!user) {
      throw new HttpException(`User ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  create(createUserDto: any) {
    this.users.push(createUserDto);
    return createUserDto;
  }

  remove(id: string) {
    const indexUser = this.users.findIndex((user) => user.id === Number(id));

    if (indexUser >= 0) {
      this.users.splice(indexUser, 1);
    }
  }
}

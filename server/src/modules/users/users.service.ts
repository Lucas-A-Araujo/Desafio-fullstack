import { Delete, Injectable, Param } from '@nestjs/common';
import { User } from './entities/users.entity/users.entity';
import { CreateUserDto } from './dto/create-user.dto';

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
    return this.users.find((user) => user.id === Number(id));
  }

  create(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const indexCourse = this.users.findIndex((user) => user.id === Number(id));
    return indexCourse;
  }
}

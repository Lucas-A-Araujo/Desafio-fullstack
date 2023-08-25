import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Knowledge } from './entities/knowledge.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Knowledge)
    private readonly knowledgeRepository: Repository<Knowledge>,
  ) {}

  getAll() {
    return this.userRepository.find({
      relations: ['knowledge'],
    });
  }

  getOne(id: string) {
    const user = this.userRepository.findOne(id, {
      relations: ['knowledge'],
    });

    if (!user) {
      throw new HttpException(`User ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getUserByName(name: string): Promise<User | null> {
    const formattedName = name.toLowerCase().replace(/\s+/g, '');
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.knowledge', 'knowledge')
      .where('REPLACE(LOWER(user.name), :space, :empty) = :formattedName', {
        space: ' ',
        empty: '',
        formattedName,
      })
      .getOne();
    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const knowledge = await Promise.all(
      createUserDto.knowledge.map((name) => this.preloadKnowledgeByName(name)),
    );
    const cpfExiste = await this.cpfAlreadyExists(createUserDto.cpf);

    if (cpfExiste) {
      throw new ConflictException('CPF já cadastrado');
    }

    const course = this.userRepository.create({
      ...createUserDto,
      knowledge,
      status: false,
    });
    return this.userRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.userRepository.findOne(id);

    if (!course) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }

    return this.userRepository.remove(course);
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(+id);

    if (!user) {
      throw new NotFoundException(`Colaborador com ID ${id} não encontrado.`);
    } else if (user.status) {
      throw new BadRequestException(
        `Colaborador com ID ${id} já está validado.`,
      );
    }

    user.status = true;
    user.dataValidacao = new Date();

    return this.userRepository.save(user);
  }

  private async cpfAlreadyExists(cpf: string): Promise<boolean> {
    const existingColaborador = await this.userRepository.findOne({
      where: { cpf },
    });
    return !!existingColaborador;
  }

  private async preloadKnowledgeByName(name: string): Promise<Knowledge> {
    const knowledge = await this.knowledgeRepository.findOne({ name });

    if (knowledge) {
      return knowledge;
    }

    return this.knowledgeRepository.create({ name });
  }
}

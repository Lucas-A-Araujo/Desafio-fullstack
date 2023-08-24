import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Knowledge } from './entities/knowledge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Knowledge])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

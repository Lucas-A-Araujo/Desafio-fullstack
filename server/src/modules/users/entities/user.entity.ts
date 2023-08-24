import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Knowledge } from './knowledge.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 14 })
  cpf: string;

  @Column({ length: 15, nullable: true })
  celular?: string;

  @JoinTable()
  @ManyToMany(() => Knowledge, (knowledge) => knowledge.users, {
    cascade: true,
  })
  knowledge: Knowledge[];
}

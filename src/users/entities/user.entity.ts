import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Guestbook } from '../../guestbooks/entities/guestbook.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Guestbook, (guestbook) => guestbook.user)
  guestbooks: Guestbook[];
}

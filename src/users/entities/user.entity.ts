import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Guestbook } from '../../guestbooks/entities/guestbook.entity';
import { RefreshToken } from '../../token/refresh-token.entity';
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

  @OneToMany(() => RefreshToken, (token) => token.user)
  tokens: RefreshToken[];
}

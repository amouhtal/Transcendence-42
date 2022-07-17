import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('Games')
export class Games {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  winner_user: string;

  @Column()
  loser_user: string;

  @Column()
  Score : string;

  @CreateDateColumn()
  played_at: Date;

}
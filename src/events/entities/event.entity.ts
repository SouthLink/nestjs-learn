import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

// 复合索引
@Index(['name', 'type'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}

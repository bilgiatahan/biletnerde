import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sync_logs')
export class SyncLogEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  provider!: string;

  @Column()
  status!: string;

  @Column({ nullable: true })
  message?: string;

  @CreateDateColumn()
  createdAt!: Date;
}

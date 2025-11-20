import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tickets')
export class TicketEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  provider!: string;

  @Column()
  title!: string;

  @Column()
  location!: string;

  @Column('float')
  price!: number;

  @Column()
  date!: string;

  @Column()
  url!: string;

  @Column()
  image!: string;

  @Column()
  time!: string;

  @Column()
  description!: string;

  @Column()
  category!: string;

  @Column()
  venue!: string;

  @Column('simple-json')
  rawData!: Record<string, any>;
}

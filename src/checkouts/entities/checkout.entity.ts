import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum CheckoutStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED'
}

@Entity()
export class Checkout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column()
  status: CheckoutStatus = CheckoutStatus.PENDING;

  @CreateDateColumn()
  created_at: Date;
}

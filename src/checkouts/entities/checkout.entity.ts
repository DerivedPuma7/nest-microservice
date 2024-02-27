import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

@Entity()
export class CheckoutProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: number;

  @Column()
  description: string;

  @Column()
  image_url: string;

  @Column()
  product_id: number // id do produto em outro microsserviço
}

@Entity()
export class CheckoutItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Checkout)
  checkout: Checkout;

  @ManyToOne(() => CheckoutProduct)
  product: CheckoutProduct;
}

import { Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { externalFakeProducts } from './products/productsList';
import { Checkout } from './entities/checkout.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CheckoutsService {
  externalProducts = externalFakeProducts;

  constructor(
    /* 
      essa implementação não é legal
      é interessante que o tipo seja uma interface que abstraia o repositorio. dessa maneira, conseguimos 
      ter diferentes implementações, para orms diferentes, que se encaixam na nossa aplicação
    */
    @InjectRepository(Checkout) private readonly checkoutRepo: Repository<Checkout>
  ) {}

  async create(createCheckoutDto: CreateCheckoutDto) {
    const productIds: number[] = createCheckoutDto.items.map((item) => (item.product_id));
    // const productsToSave = ... => chamada externa ao microsservico de produtos para obter informações sobre os produtos recebidos na request
    const productsToSave = this.externalProducts.filter((product) => productIds.includes(product.id));

    const checkout = Checkout.create({
      items: createCheckoutDto.items.map(item => {
        const product = productsToSave.find((product) => product.id === item.product_id);
        return {
          quantity: item.quantity,
          price: product.price,
          product: {
            name: product.name,
            description: product.description,
            image_url: product.image_url,
            product_id: product.id
          }
        }
      })
    });

    await this.checkoutRepo.save(checkout);
    return checkout;
  }

  async findAll() {
    return await this.checkoutRepo.find();
  }

  async findOne(id: number) {
    return await this.checkoutRepo.findOneByOrFail({
      id
    });
  }

  async pay(id: number) {
    const checkout = await this.checkoutRepo.findOneByOrFail({
      id
    });
    checkout.pay();
    await this.checkoutRepo.save(checkout);
  }

  async fail(id: number) {
    const checkout = await this.checkoutRepo.findOneByOrFail({
      id
    });
    checkout.fail();
    await this.checkoutRepo.save(checkout);
  }
}

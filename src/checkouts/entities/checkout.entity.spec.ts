import { Checkout, CreateCheckoutCommand, CreateCheckoutItem } from "./checkout.entity"

describe('Checkout entity test', () => {
  let checkoutInput: CreateCheckoutCommand;
  let checkoutItem1: CreateCheckoutItem;
  let checkoutItem2: CreateCheckoutItem;

  beforeEach(() => {
    checkoutItem1 = {
      quantity: 1,
      price: 20,
      product: {
        name: 'teclado mecanico',
        description: 'teclado que escreve sozinho',
        image_url: 's3.algumaUrl',
        product_id: 1
      }
    };
    checkoutItem2 = {
      quantity: 1,
      price: 10,
      product: {
        name: 'mouse mecanico',
        description: 'mouse que mexe sozinho',
        image_url: 's3.algumaUrl',
        product_id: 2
      }
    }
    checkoutInput = {
      items: [checkoutItem1, checkoutItem2]
    }
  });

  it('should calculate the total correctly', () => {
    const checkout = Checkout.create(checkoutInput);

    expect(checkout.total).toBe(30);
  })
})
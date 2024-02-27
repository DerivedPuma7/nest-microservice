import { Checkout, CheckoutStatus, CreateCheckoutCommand, CreateCheckoutItem } from "./checkout.entity"

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

  it('should be defined', () => {
    const checkout = Checkout.create(checkoutInput);

    expect(checkout).toBeDefined();
    expect(checkout).toBeInstanceOf(Checkout);
    expect(checkout.items.length).toBe(2);
  });

  it('should calculate the total correctly', () => {
    const checkout = Checkout.create(checkoutInput);

    expect(checkout.total).toBe(30);
  })

  describe('pay checkout test', () => {
    it('should be able to pay the checkout', () => {
      const checkout = Checkout.create(checkoutInput);

      checkout.pay();

      expect(checkout.status).toBe(CheckoutStatus.PAID);
    });

    it('should throw when trying to pay failed checkout', () => {
      const checkout = Checkout.create(checkoutInput);
      checkout.status = CheckoutStatus.FAILED;

      expect(() => {
        checkout.pay();
      }).toThrow('Checkout failed');
    });

    it('should throw when trying to pay paid checkout', () => {
      const checkout = Checkout.create(checkoutInput);
      checkout.status = CheckoutStatus.PAID;

      expect(() => {
        checkout.pay();
      }).toThrow('Checkout already paid');
    });
  });

  describe('fail checkout test', () => {
    it('should be able to fail the checkout', () => {
      const checkout = Checkout.create(checkoutInput);

      checkout.fail();

      expect(checkout.status).toBe(CheckoutStatus.FAILED);
    });

    it('should throw when trying to fail failed checkout', () => {
      const checkout = Checkout.create(checkoutInput);
      checkout.status = CheckoutStatus.FAILED;

      expect(() => {
        checkout.pay();
      }).toThrow('Checkout failed');
    });

    it('should throw when trying to pay paid checkout', () => {
      const checkout = Checkout.create(checkoutInput);
      checkout.status = CheckoutStatus.PAID;

      expect(() => {
        checkout.pay();
      }).toThrow('Checkout already paid');
    });
  })
})
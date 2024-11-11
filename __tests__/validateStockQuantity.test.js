import validateStockQuantity from '../src/Validation/validateStockQuantity.js';

describe('validateStockQuantity 함수 테스트', () => {
  test('재고 수량이 충분한 경우 true를 반환해야 합니다.', () => {
    const parsedProducts = [
      {
        name: '상품 A',
        quantity: 10,
        isPromoProduct: () => false,
        isAvailablePromotion: () => false,
      },
      {
        name: '상품 B',
        quantity: 5,
        isPromoProduct: () => true,
        isAvailablePromotion: () => true,
      },
    ];

    const shoppingCart = [
      { name: '상품 A', quantity: 5 },
      { name: '상품 B', quantity: 3 },
    ];

    expect(validateStockQuantity(shoppingCart, parsedProducts)).toBe(true);
  });

  test('재고 수량이 부족한 경우 false를 반환해야 합니다.', () => {
    const parsedProducts = [
      {
        name: '상품 A',
        quantity: 4,
        isPromoProduct: () => false,
        isAvailablePromotion: () => false,
      },
    ];

    const shoppingCart = [{ name: '상품 A', quantity: 5 }];

    expect(validateStockQuantity(shoppingCart, parsedProducts)).toBe(false);
  });

  test('존재하지 않는 상품이 포함된 경우 false를 반환해야 합니다.', () => {
    const parsedProducts = [
      {
        name: '상품 A',
        quantity: 10,
        isPromoProduct: () => false,
        isAvailablePromotion: () => false,
      },
    ];

    const shoppingCart = [{ name: '상품 C', quantity: 1 }];

    expect(validateStockQuantity(shoppingCart, parsedProducts)).toBe(false);
  });

  test('프로모션이 유효하지 않은 경우 재고를 정확히 확인해야 합니다.', () => {
    const parsedProducts = [
      {
        name: '상품 B',
        quantity: 2,
        isPromoProduct: () => true,
        isAvailablePromotion: () => false,
      },
      {
        name: '상품 B',
        quantity: 1,
        isPromoProduct: () => false,
      },
    ];

    const shoppingCart = [{ name: '상품 B', quantity: 3 }];

    expect(validateStockQuantity(shoppingCart, parsedProducts)).toBe(false);
  });
  test('프로모션이 유효한경우 재고를 정확히 확인해야 합니다.', () => {
    const parsedProducts = [
      {
        name: '상품 B',
        quantity: 2,
        isPromoProduct: () => true,
        isAvailablePromotion: () => true,
      },
      {
        name: '상품 B',
        quantity: 1,
        isPromoProduct: () => false,
      },
    ];

    const shoppingCart = [{ name: '상품 B', quantity: 3 }];

    expect(validateStockQuantity(shoppingCart, parsedProducts)).toBe(true);
  });

  test('프로모션이 유효한 경우 재고를 정확히 확인해야 합니다.', () => {
    const parsedProducts = [
      {
        name: '상품 C',
        quantity: 5,
        isPromoProduct: () => true,
        isAvailablePromotion: () => true,
      },
    ];

    const shoppingCart = [{ name: '상품 C', quantity: 5 }];

    expect(validateStockQuantity(shoppingCart, parsedProducts)).toBe(true);
  });
});

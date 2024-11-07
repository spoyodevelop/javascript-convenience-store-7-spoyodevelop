import { Console, DateTimes } from '@woowacourse/mission-utils';
import ShoppingItem from '../Model/ShoppingItem.js';
import findProduct from '../ProductFinder/findProduct.js';
import sellProduct from '../Seller/sellProduct.js';
import sellExpiredProduct from '../Seller/sellExpiredProduct.js';

async function promptUserInput() {
  return Console.readLineAsync(
    '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])',
  );
}
function parseShoppingCart(inputString) {
  const parsedString = inputString.split(',');
  return parsedString.map((items) => {
    const slicedString = items.slice(1, -1);
    const [name, quantity] = slicedString.split('-');
    return new ShoppingItem(name, Number(quantity));
  });
}

// 상품이 존재하는지 확인
function validateItemsExist(shoppingCart, parsedProducts) {
  const invalidItems = shoppingCart.filter((item) => {
    const foundProduct = findProduct(parsedProducts, item.getName());
    return !foundProduct;
  });
  return invalidItems.length === 0;
}

// 재고 수량 검증
function validateStockQuantity(shoppingCart, parsedProducts) {
  return shoppingCart.every((item) => {
    const foundProduct = findProduct(parsedProducts, item.getName());
    if (!foundProduct || foundProduct.length === 0) {
      return false; // 상품이 없는 경우 실패
    }

    const [promoProduct] = foundProduct.filter((product) =>
      product.isPromoProduct(),
    );
    const [nonPromoProduct] = foundProduct.filter(
      (product) => !product.isPromoProduct(),
    );

    const promoQuantity = promoProduct?.getQuantity() ?? 0;
    const nonPromoQuantity = nonPromoProduct?.getQuantity() ?? 0;
    const totalAvailableQuantity = promoQuantity + nonPromoQuantity;

    return Number(item.getQuantity()) <= totalAvailableQuantity;
  });
}

// 장바구니 처리 및 결제
async function processShoppingCart(shoppingCart, parsedProducts) {
  const bills = [];
  for (const item of shoppingCart) {
    const foundProduct = findProduct(parsedProducts, item.getName());
    const [promoProduct] = foundProduct.filter((product) =>
      product.isPromoProduct(),
    );
    let bill;

    if (promoProduct && !promoProduct.isExpired(DateTimes.now())) {
      bill = await sellExpiredProduct(foundProduct, item.getQuantity());
    } else {
      bill = await sellProduct(foundProduct, item.getQuantity());
    }
    bills.push(bill);
  }
  return bills;
}

export {
  promptUserInput,
  parseShoppingCart,
  validateItemsExist,
  validateStockQuantity,
  processShoppingCart,
};

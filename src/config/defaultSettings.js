const ERROR_PREFIX = '[ERROR]';

export const ERROR_MESSAGES = Object.freeze({
  ITEM_NOT_FOUND: `${ERROR_PREFIX} 존재하지 않는 상품입니다. 다시 입력해 주세요.\n`,
  EXCEEDS_STOCK_QUANTITY: `${ERROR_PREFIX} 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.\n`,
  INVALID_FORMAT: `${ERROR_PREFIX} 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.\n`,
  INVALID_QUANTITY: `${ERROR_PREFIX} 수량은 1 이상의 정수여야 합니다.\n`,
  INVALID_YN_INPUT: `${ERROR_PREFIX} 잘못된 입력입니다. 다시 입력해 주세요.\n`,
  FILE_NOT_FOUND: `${ERROR_PREFIX} 파일이 존재하지 않습니다:`,
  FILE_READ_ERROR: `${ERROR_PREFIX} 파일 내용을 읽을 수 없습니다.`,
  INVALID_PROMOTION_DATA: `${ERROR_PREFIX} 잘못된 프로모션 데이터:`,
  INVALID_DATE_RANGE: `${ERROR_PREFIX} 유효하지 않은 날짜 범위:`,
  CRITICAL_QUANTITY_SELL_ERROR: `${ERROR_PREFIX} 재고가 없습니다. 관리자에게 문의하세요.`,
});
export const USER_MESSAGES = Object.freeze({
  ASK_USER_MORE_SALE: '감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n',
  ASK_MEMBERSHIP_SALE: '멤버십 할인을 받으시겠습니까? (Y/N)\n',
  ASK_PRODUCT_NAME_AND_QUANTITY:
    '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n',
  WELCOME_MESSAGE: '안녕하세요. W편의점입니다.\n',
  SHOW_PRODUCT: '현재 보유하고 있는 상품입니다.\n',
  ALL_PRODUCTS_SOLD_OUT: '재고가 다 팔렸습니다. 금일 판매를 종료합니다.\n',
});
export const FILE_PATH = Object.freeze({
  PRODUCT_FILE_PATH: 'public/products.md',
  PROMOTION_FILE_PATH: 'public/promotions.md',
});
export const NO_PROMO = 'noPromo';

export const MAX_MEMBERSHIP_DISCOUNT = 8000;

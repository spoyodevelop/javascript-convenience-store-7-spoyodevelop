const ERROR_PREFIX = '[ERROR]';

export const ERROR_MESSAGES = Object.freeze({
  ITEM_NOT_FOUND: `${ERROR_PREFIX} 존재하지 않는 상품이 있습니다. 다시 입력해 주세요.\n`,
  EXCEEDS_STOCK_QUANTITY: `${ERROR_PREFIX} 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.\n`,
  INVALID_FORMAT: `${ERROR_PREFIX} 잘못된 입력 형식입니다. [상품명-수량] 형식으로 입력해 주세요.\n`,
  INVALID_QUANTITY: `${ERROR_PREFIX} 수량은 1 이상의 정수여야 합니다.\n`,
  INVALID_YN_INPUT: `${ERROR_PREFIX} Y/N 이외에 입력은 할 수 없습니다.\n`,
  FILE_NOT_FOUND: `${ERROR_PREFIX} 파일이 존재하지 않습니다:`,
  FILE_READ_ERROR: `${ERROR_PREFIX} 파일 내용을 읽을 수 없습니다.`,
  INVALID_PROMOTION_DATA: `${ERROR_PREFIX} 잘못된 프로모션 데이터:`,
  INVALID_DATE_RANGE: `${ERROR_PREFIX} 유효하지 않은 날짜 범위:`,
});
export const USER_MESSAGES = Object.freeze({
  ASK_MEMBERSHIP_SALE: '멤버십 할인을 받으시겠습니까? (Y/N)\n',
  ASK_PRODUCT_NAME_AND_QUANTITY:
    '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n',
});
export const FILE_PATH = Object.freeze({
  PRODUCT_FILE_PATH: 'public/products.md',
  PROMOTION_FILE_PATH: 'public/promotions.md',
});
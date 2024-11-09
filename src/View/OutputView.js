import { Console } from '@woowacourse/mission-utils';
import {
  USER_MESSAGES,
  MAX_MEMBERSHIP_DISCOUNT,
} from '../config/defaultSettings.js';
import {
  formatCurrency,
  padString,
  calculateFinalTotal,
} from '../util/util.js'; // 경로는 프로젝트 구조에 맞게 조정하세요

const OutputView = {
  /**
   * 콘솔에 메시지를 출력합니다.
   *
   * @param {string} message - 출력할 메시지입니다.
   */
  printMessage(message) {
    Console.print(message);
  },

  /**
   * 환영 메시지를 출력합니다.
   *
   * @param {Array} products - 현재 보유하고 있는 상품 리스트입니다.
   */
  displayWelcomeMessage(products) {
    this.printMessage(USER_MESSAGES.WELCOME_MESSAGE);
    this.printMessage(USER_MESSAGES.SHOW_PRODUCT);
    products.forEach((product) => {
      this.printMessage(`${product.toString()}`);
    });
  },

  /**
   * 상품 헤더를 출력합니다.
   */
  printGoodsHeader() {
    this.printMessage('==============W 편의점================');
    this.printMessage('상품명\t 수량\t금액');
  },

  /**
   * 증정품 헤더를 출력합니다.
   */
  printFreebieHeader() {
    this.printMessage('=============증\t정===============');
  },

  /**
   * 상품 아이템을 출력합니다.
   *
   * @param {Array} item - 상품 정보 배열입니다.
   */
  printGoodsItem(item) {
    const [name, quantity, price] = item;
    const {
      name: nameWidth,
      quantity: qtyWidth,
      price: priceWidth,
    } = this.columnWidths;
    const paddedName = padString(name, nameWidth);
    const paddedQuantity = padString(quantity.toString(), qtyWidth);
    const paddedPrice = padString(formatCurrency(price * quantity), priceWidth);
    this.printMessage(`${paddedName}${paddedQuantity}${paddedPrice}`);
  },

  /**
   * 증정품 아이템을 출력합니다.
   *
   * @param {Array} item - 증정품 정보 배열입니다.
   */
  printFreebieItem(item) {
    const [name, , , freebie] = item;
    const paddedName = padString(name, this.columnWidths.name);
    const paddedFreebie = padString(
      freebie.toString(),
      this.columnWidths.freebie,
    );
    this.printMessage(`${paddedName}${paddedFreebie}`);
  },

  /**
   * 총액 정보를 출력합니다.
   *
   * @param {string} label - 라벨입니다.
   * @param {string} quantity - 수량입니다.
   * @param {string} value - 값입니다.
   */
  printTotalItem(label, quantity, value) {
    const paddedLabel = padString(label, this.columnWidths.name);
    const paddedQuantity = padString(
      quantity.toString(),
      this.columnWidths.quantity,
    );
    const paddedValue = padString(value, this.columnWidths.price);
    this.printMessage(`${paddedLabel}${paddedQuantity}${paddedValue}`);
  },

  /**
   * 상품 리스트를 출력합니다.
   *
   * @param {Array} filteredGoods - 구매한 상품 목록입니다.
   */
  printGoods(filteredGoods) {
    filteredGoods.forEach((item) => this.printGoodsItem(item));
  },

  /**
   * 증정품 리스트를 출력합니다.
   *
   * @param {Array} filteredGoods - 구매한 상품 목록입니다.
   */
  printFreebies(filteredGoods) {
    filteredGoods
      .filter(([, , , freebie]) => freebie)
      .forEach((item) => this.printFreebieItem(item));
  },

  /**
   * 총계 정보를 출력합니다.
   *
   * @param {boolean} isMembershipSale - 멤버십 할인 적용 여부입니다.
   * @param {Object} totals - 총액 정보입니다.
   * @param {number} finalMembershipDiscount - 최종 멤버십 할인액입니다.
   * @param {number} finalTotal - 최종 결제 금액입니다.
   */
  printTotals(isMembershipSale, totals, finalMembershipDiscount, finalTotal) {
    const { totalPurchased, totalPromoSale, totalQuantity } = totals;
    const effectiveMembershipDiscount = isMembershipSale
      ? finalMembershipDiscount
      : 0;

    this.printTotalItem(
      '총구매액',
      totalQuantity,
      formatCurrency(totalPurchased),
    );
    this.printTotalItem('행사할인', '', `-${formatCurrency(totalPromoSale)}`);
    this.printTotalItem(
      '멤버십할인',
      '',
      `-${formatCurrency(effectiveMembershipDiscount)}`,
    );
    this.printTotalItem('내실돈', '', formatCurrency(finalTotal));
  },

  /**
   * 영수증을 출력합니다.
   *
   * @param {boolean} isMembershipSale - 멤버십 할인 적용 여부입니다.
   * @param {Array} filteredGoods - 구매한 상품 목록입니다.
   * @param {Object} totals - 총액 정보입니다.
   */
  displayBill(isMembershipSale, filteredGoods, totals) {
    if (!filteredGoods || filteredGoods.length === 0) return;

    const { totalPurchased, totalPromoSale, totalMembershipSale } = totals;

    // 총 수량 계산 추가
    const totalQuantity = filteredGoods.reduce((acc, item) => acc + item[1], 0);
    totals.totalQuantity = totalQuantity;

    const finalMembershipDiscount = Math.min(
      MAX_MEMBERSHIP_DISCOUNT,
      totalMembershipSale,
    );

    this.columnWidths = {
      name: 12,
      quantity: 8,
      price: 12,
      freebie: 12,
    };

    const finalTotal = calculateFinalTotal(
      isMembershipSale,
      totalPurchased,
      totalPromoSale,
      finalMembershipDiscount,
    );

    // 출력 로직 실행
    this.printGoodsHeader();
    this.printGoods(filteredGoods);
    this.printFreebieHeader();
    this.printFreebies(filteredGoods);
    this.printMessage('====================================');
    this.printTotals(
      isMembershipSale,
      totals,
      finalMembershipDiscount,
      finalTotal,
    );
  },
};

export default OutputView;

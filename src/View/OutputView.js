import { Console } from '@woowacourse/mission-utils';
import {
  formatCurrency,
  padString,
  calculateFinalTotal,
} from '../Utility/util.js';
import {
  MAX_MEMBERSHIP_DISCOUNT,
  USER_MESSAGES,
} from '../config/defaultSettings.js';

const OutputView = {
  printMessage(message) {
    Console.print(message);
  },

  displayWelcomeMessage(products) {
    this.printMessage(USER_MESSAGES.WELCOME_MESSAGE);
    this.printMessage(USER_MESSAGES.SHOW_PRODUCT);
    products.forEach((product) => this.printMessage(product.toString()));
  },

  printHeader(title) {
    this.printMessage(title);
  },

  formatItem(name, quantity, price) {
    return (
      padString(name, this.columnWidths.name, 'left') +
      padString(quantity.toString(), this.columnWidths.quantity, 'right') +
      padString(
        formatCurrency(price * quantity),
        this.columnWidths.price,
        'right',
      )
    );
  },

  printGoodsItem([name, quantity, price]) {
    this.printMessage(this.formatItem(name, quantity, price));
  },

  printFreebieItem([name, , , freebie]) {
    this.printMessage(
      padString(name, this.columnWidths.name, 'left') +
        padString(freebie.toString(), this.columnWidths.freebie, 'right'),
    );
  },

  printTotalItem(label, quantity, value) {
    const formattedItem =
      padString(label, this.columnWidths.name, 'left') +
      padString(quantity.toString(), this.columnWidths.quantity, 'right') +
      padString(value, this.columnWidths.price, 'right');
    this.printMessage(formattedItem);
  },

  printGoods(filteredGoods) {
    filteredGoods.forEach((item) => this.printGoodsItem(item));
  },

  printFreebies(filteredGoods) {
    filteredGoods
      .filter(([, , , freebie]) => freebie)
      .forEach((item) => this.printFreebieItem(item));
  },

  calculateDiscount(isMembershipSale, totals) {
    let discount = 0;
    if (isMembershipSale) {
      discount = totals.totalMembershipSale;
    }
    return Math.min(MAX_MEMBERSHIP_DISCOUNT, discount);
  },

  printTotals(isMembershipSale, totals, finalTotal) {
    const { totalPurchased, totalPromoSale, totalQuantity } = totals;
    const membershipDiscount = this.calculateDiscount(isMembershipSale, totals);

    this.printTotalItem(
      '총구매액',
      totalQuantity,
      formatCurrency(totalPurchased),
    );
    this.printTotalItem('행사할인', '', `-${formatCurrency(totalPromoSale)}`);
    this.printTotalItem(
      '멤버십할인',
      '',
      `-${formatCurrency(membershipDiscount)}`,
    );
    this.printTotalItem('내실돈', '', formatCurrency(finalTotal));
  },

  calculateFinalValues(isMembershipSale, totals) {
    totals.totalQuantity = totals.filteredGoods.reduce(
      (acc, item) => acc + item[1],
      0,
    );
    const membershipDiscount = this.calculateDiscount(isMembershipSale, totals);
    return calculateFinalTotal(
      isMembershipSale,
      totals.totalPurchased,
      totals.totalPromoSale,
      membershipDiscount,
    );
  },
  printGoodsHeader() {
    const header =
      padString('상품명', this.columnWidths.name, 'left') +
      padString('수량', this.columnWidths.quantity + 3, 'right') +
      padString('금액', this.columnWidths.price - 4, 'right');
    this.printMessage(header);
  },
  displayBill(isMembershipSale, filteredGoods, totals) {
    if (!filteredGoods || filteredGoods.length === 0) return;

    this.columnWidths = { name: 10, quantity: 8, price: 12, freebie: 8 };
    totals.filteredGoods = filteredGoods;
    const finalTotal = this.calculateFinalValues(isMembershipSale, totals);

    this.printHeader('==============W 편의점==============');
    this.printGoodsHeader();
    this.printGoods(filteredGoods);
    this.printHeader('=============증   정=================');
    this.printFreebies(filteredGoods);
    this.printHeader('===================================');
    this.printTotals(isMembershipSale, totals, finalTotal);
  },
};

export default OutputView;

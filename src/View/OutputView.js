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
    products.forEach((product) => {
      this.printMessage(`${product.toString()}`);
    });
  },

  printGoodsHeader() {
    this.printMessage('==============W 편의점==============');
    const header = [
      padString('상품명', this.columnWidths.name, 'left'),
      padString('수량', this.columnWidths.quantity + 3, 'right'),
      padString('금액', this.columnWidths.price - 4, 'right'),
    ].join('');
    this.printMessage(header);
  },

  printFreebieHeader() {
    this.printMessage('=============증정품=================');
  },

  printGoodsItem(item) {
    const [name, quantity, price] = item;
    const paddedName = padString(name, this.columnWidths.name, 'left');
    const paddedQuantity = padString(
      quantity.toString(),
      this.columnWidths.quantity,
      'right',
    );
    const paddedPrice = padString(
      formatCurrency(price * quantity),
      this.columnWidths.price,
      'right',
    );
    this.printMessage(`${paddedName}${paddedQuantity}${paddedPrice}`);
  },

  printFreebieItem(item) {
    const [name, , , freebie] = item;
    const paddedName = padString(name, this.columnWidths.name, 'left');
    const paddedFreebie = padString(
      freebie.toString(),
      this.columnWidths.freebie,
      'right',
    );
    this.printMessage(`${paddedName}${paddedFreebie}`);
  },

  printTotalItem(label, quantity, value) {
    const paddedLabel = padString(label, this.columnWidths.name, 'left');
    const paddedQuantity = padString(
      quantity.toString(),
      this.columnWidths.quantity,
      'right',
    );
    const paddedValue = padString(value, this.columnWidths.price, 'right');
    this.printMessage(`${paddedLabel}${paddedQuantity}${paddedValue}`);
  },

  printGoods(filteredGoods) {
    filteredGoods.forEach((item) => this.printGoodsItem(item));
  },

  printFreebies(filteredGoods) {
    filteredGoods
      .filter(([, , , freebie]) => freebie)
      .forEach((item) => this.printFreebieItem(item));
  },

  printTotals(isMembershipSale, totals, finalMembershipDiscount, finalTotal) {
    const { totalPurchased, totalPromoSale, totalQuantity } = totals;
    let effectiveMembershipDiscount = 0;
    if (isMembershipSale) {
      effectiveMembershipDiscount = finalMembershipDiscount;
    }

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

  displayBill(isMembershipSale, filteredGoods, totals) {
    if (!filteredGoods || filteredGoods.length === 0) return;

    const { totalPurchased, totalPromoSale, totalMembershipSale } = totals;
    const totalQuantity = filteredGoods.reduce((acc, item) => acc + item[1], 0);
    totals.totalQuantity = totalQuantity;

    const finalMembershipDiscount = Math.min(
      MAX_MEMBERSHIP_DISCOUNT,
      totalMembershipSale,
    );

    this.columnWidths = {
      name: 10,
      quantity: 8,
      price: 12,
      freebie: 8,
    };

    const finalTotal = calculateFinalTotal(
      isMembershipSale,
      totalPurchased,
      totalPromoSale,
      finalMembershipDiscount,
    );

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

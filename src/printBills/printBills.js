import { Console } from '@woowacourse/mission-utils';

export default function printBills(isMembershipSale, filteredGoods, totals) {
  if (!filteredGoods || filteredGoods.length === 0) return;

  const { totalPurchased, totalPromoSale, totalMembershipSale, totalQuantity } =
    totals;

  const MAX_MEMBERSHIP_DISCOUNT = 8000; // 상수 정의
  const finalMembershipDiscount = Math.min(
    MAX_MEMBERSHIP_DISCOUNT,
    totalMembershipSale,
  );

  const calculateFinalTotal = (isMembership, purchased, promo, membership) => {
    let finalTotal = purchased - promo;
    if (isMembership) {
      finalTotal -= membership;
    }
    return finalTotal;
  };

  const formatCurrency = (num) => num.toLocaleString('ko-KR');

  const padString = (str, totalLength) => {
    const spaceCount = totalLength - str.length;
    return str + ' '.repeat(spaceCount > 0 ? spaceCount : 0);
  };

  const columnWidths = {
    name: 12, // 상품명
    quantity: 8, // 수량
    price: 12, // 금액
    freebie: 12, // 증정품
  };

  const printGoods = () => {
    filteredGoods.forEach(([name, quantity, price]) => {
      const paddedName = padString(name, columnWidths.name);
      const paddedQuantity = padString(
        quantity.toString(),
        columnWidths.quantity,
      );
      const paddedPrice = padString(
        formatCurrency(price * quantity),
        columnWidths.price,
      );
      Console.print(`${paddedName}${paddedQuantity}${paddedPrice}`);
    });
  };

  const printFreebies = () => {
    filteredGoods
      .filter(([_, __, ___, freebie]) => freebie) // 증정품이 있는 상품만 필터링
      .forEach(([name, _, __, freebie]) => {
        const paddedName = padString(name, columnWidths.name);
        const paddedFreebie = padString(
          freebie.toString(),
          columnWidths.freebie,
        );
        Console.print(`${paddedName}${paddedFreebie}`);
      });
  };

  const printTotals = (purchased, promo, membership, finalTotal, totalQty) => {
    let effectiveMembershipDiscount = 0;
    if (isMembershipSale) {
      effectiveMembershipDiscount = membership;
    }

    const paddedTotalQuantity = padString(
      totalQty.toString(),
      columnWidths.quantity,
    );
    const paddedTotalPurchased = padString(
      formatCurrency(purchased),
      columnWidths.price,
    );
    const paddedTotalPromo = padString(
      `-${formatCurrency(promo)}`,
      columnWidths.price,
    );
    const paddedMembershipDiscount = padString(
      `-${formatCurrency(effectiveMembershipDiscount)}`,
      columnWidths.price,
    );
    const paddedFinalTotal = padString(
      formatCurrency(finalTotal),
      columnWidths.price,
    );

    // 명확한 공백을 추가
    const paddedLabel = padString('총구매액', columnWidths.name);

    Console.print(
      `${paddedLabel}${paddedTotalQuantity}${paddedTotalPurchased}`,
    );
    Console.print(`행사할인\t\t${paddedTotalPromo}`);
    Console.print(`멤버십할인\t\t${paddedMembershipDiscount}`);
    Console.print(`내실돈\t\t\t ${paddedFinalTotal}`);
  };

  // 계산
  const finalTotal = calculateFinalTotal(
    isMembershipSale,
    totalPurchased,
    totalPromoSale,
    finalMembershipDiscount,
  );

  // 출력
  Console.print('==============W 편의점================');
  Console.print('상품명\t\t\t수량\t금액');
  printGoods();
  Console.print('=============증	정===============');
  printFreebies();
  Console.print('====================================');
  printTotals(
    totalPurchased,
    totalPromoSale,
    finalMembershipDiscount,
    finalTotal,
    totalQuantity,
  );
}

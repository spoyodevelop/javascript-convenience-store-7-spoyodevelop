export default function processBills(bills) {
  const goods = [];
  let totalPurchased = 0;
  let totalPromoSale = 0;
  let totalMembershipSale = 0;
  let totalQuantity = 0;

  bills.forEach((bill) => {
    goods.push([bill.name, bill.totalQuantity, bill.price, bill.freebie]);

    totalQuantity += bill.totalQuantity;
    totalPurchased += bill.totalQuantity * bill.price;
    if (bill.freebie) {
      totalPromoSale += bill.freebie * bill.price;
    }

    totalMembershipSale += bill.membershipSaleTotal;
  });

  const filteredGoods = goods.filter((good) => good[1] !== 0);

  return {
    filteredGoods,
    totals: {
      totalPurchased,
      totalPromoSale,
      totalMembershipSale,
      totalQuantity,
    },
  };
}

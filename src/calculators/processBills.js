export default function processBills(bills) {
  const goods = [];
  let totalPurchased = 0;
  let totalPromoSale = 0;
  let totalMembershipSale = 0;
  let totalQuantity = 0;

  bills.forEach((bill) => {
    const {
      name,
      totalQuantity: quantity,
      price,
      freebie,
      membershipSaleTotal,
    } = bill;

    if (quantity !== 0) {
      goods.push([name, quantity, price, freebie]);
    }

    totalQuantity += quantity;
    totalPurchased += quantity * price;

    if (freebie > 0) {
      totalPromoSale += freebie * price;
    }

    totalMembershipSale += membershipSaleTotal;
  });

  return {
    filteredGoods: goods,
    totals: {
      totalPurchased,
      totalPromoSale,
      totalMembershipSale,
      totalQuantity,
    },
  };
}

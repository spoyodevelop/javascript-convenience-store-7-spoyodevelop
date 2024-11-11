export function formatCurrency(value) {
  return value.toLocaleString('ko-KR');
}

export function calculateFinalTotal(
  isMembershipSale,
  totalPurchased,
  totalPromoSale,
  finalMembershipDiscount,
) {
  let finalTotal = totalPurchased - totalPromoSale;
  if (isMembershipSale) {
    finalTotal -= finalMembershipDiscount;
  }
  return finalTotal;
}

export function padString(str, width, alignment = 'left') {
  const isNumber = /^[\d,.\-]+$/.test(str); // 숫자인 경우
  const strLength = isNumber ? str.length : str.length * 2; // 숫자는 그대로, 한글은 길이 2로 간주
  const paddingWidth = width - strLength;
  const padding = ' '.repeat(Math.max(0, paddingWidth));

  if (alignment === 'left') {
    return str + padding;
  }
  if (alignment === 'right') {
    return padding + str;
  }
  return str;
}

export function areAllProductsSoldOut(products) {
  if (!Array.isArray(products)) return false;
  return products.every((product) => product.quantity === 0);
}

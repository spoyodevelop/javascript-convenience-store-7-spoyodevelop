/**
 * 통화 형식으로 숫자를 변환합니다.
 *
 * @param {number} num - 변환할 숫자입니다.
 * @returns {string} - 변환된 문자열입니다.
 */
export function formatCurrency(num) {
  return num.toLocaleString('ko-KR');
}

/**
 * 문자열을 지정된 길이로 패딩합니다.
 *
 * @param {string} str - 패딩할 문자열입니다.
 * @param {number} totalLength - 총 길이입니다.
 * @returns {string} - 패딩된 문자열입니다.
 */
export function padString(str, totalLength) {
  const spaceCount = totalLength - str.length;
  return str + ' '.repeat(spaceCount > 0 ? spaceCount : 0);
}

/**
 * 최종 결제 금액을 계산합니다.
 *
 * @param {boolean} isMembership - 멤버십 할인 여부입니다.
 * @param {number} purchased - 총 구매액입니다.
 * @param {number} promo - 행사 할인액입니다.
 * @param {number} membership - 멤버십 할인액입니다.
 * @returns {number} - 최종 결제 금액입니다.
 */
export function calculateFinalTotal(
  isMembership,
  purchased,
  promo,
  membership,
) {
  if (isMembership) {
    return purchased - promo - membership;
  }
  return purchased - promo;
}

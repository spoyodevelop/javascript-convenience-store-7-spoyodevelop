import fs from 'fs';
// 상품 데이터 파싱 함수
function convertProductValue(header, value) {
  if (value === 'null') return null;
  if (['price', 'quantity'].includes(header)) return Number(value);
  return value;
}

function parseProductLine(line, headers) {
  const values = line.split(',');
  const product = {};

  headers.forEach((header, index) => {
    product[header] = convertProductValue(header, values[index]);
  });

  return product;
}

export function parseProductCSV(csvData) {
  console.log(csvData);
  const [headerLine, ...dataLines] = csvData.trim().split('\n');
  const headers = headerLine.split(',');

  return dataLines.map((line) => parseProductLine(line, headers));
}

// 프로모션 데이터 파싱 함수
function convertPromotionValue(header, value) {
  if (value === 'null') return null;
  if (['buy', 'get'].includes(header)) return Number(value);
  if (['start_date', 'end_date'].includes(header)) {
    const date = new Date(value);
    return Number.isNaN(date) ? null : date;
  }
  return value;
}

function parsePromotionLine(line, headers) {
  const values = line.split(',');
  const promotion = {};

  headers.forEach((header, index) => {
    promotion[header] = convertPromotionValue(header, values[index]);
  });

  return promotion;
}

function isValidPromotion(promotion) {
  const { name, buy, get, start_date, end_date } = promotion;

  if (!name || buy < 0 || get < 0) {
    console.error(
      `[ERROR] 잘못된 프로모션 데이터: ${JSON.stringify(promotion)}`,
    );
    return false;
  }

  if (!start_date || !end_date || start_date > end_date) {
    console.error(
      `[ERROR] 유효하지 않은 날짜 범위: ${JSON.stringify(promotion)}`,
    );
    return false;
  }

  return true;
}

export function parsePromotionCSV(csvData) {
  const [headerLine, ...dataLines] = csvData.trim().split('\n');
  const headers = headerLine.split(',');
  const promotions = [];

  dataLines.forEach((line) => {
    const promotion = parsePromotionLine(line, headers);
    if (isValidPromotion(promotion)) {
      promotions.push(promotion);
    }
  });

  return promotions;
}

export function loadCSVFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data;
  } catch (error) {
    console.error(
      `[ERROR] 파일을 읽는 중 문제가 발생했습니다: ${error.message}`,
    );
    return null;
  }
}

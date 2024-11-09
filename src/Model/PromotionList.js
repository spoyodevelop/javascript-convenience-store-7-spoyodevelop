import { parsePromotionCSV, loadCSVFile } from '../ProductFactory/parseCSV.js';

const promotionFilePath = 'public/promotions.md';

const promotionCSV = loadCSVFile(promotionFilePath);

const PROMOTION_LIST = parsePromotionCSV(promotionCSV);

export default PROMOTION_LIST;

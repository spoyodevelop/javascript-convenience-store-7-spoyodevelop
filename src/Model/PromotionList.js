import { parsePromotionCSV, loadCSVFile } from '../ProductParser/parseCSV.js';
import { FILE_PATH } from '../config/defaultSettings.js';

const promotionFilePath = FILE_PATH.PROMOTION_FILE_PATH;

const promotionCSV = loadCSVFile(promotionFilePath);

const PROMOTION_LIST = parsePromotionCSV(promotionCSV);

export default PROMOTION_LIST;

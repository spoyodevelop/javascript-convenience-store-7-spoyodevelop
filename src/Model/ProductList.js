import { parseProductCSV, loadCSVFile } from '../ProductFactory/parseCSV.js';
import { FILE_PATH } from '../config/defaultSettings.js';

const productFilePath = FILE_PATH.PRODUCT_FILE_PATH;

const productCSV = loadCSVFile(productFilePath);

const PRODUCT_LIST = parseProductCSV(productCSV);

export default PRODUCT_LIST;

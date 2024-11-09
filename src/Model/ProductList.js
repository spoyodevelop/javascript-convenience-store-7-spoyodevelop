import { parseProductCSV, loadCSVFile } from '../ProductFactory/parseCSV.js';

const productFilePath = 'public/products.md';

const productCSV = loadCSVFile(productFilePath);

const PRODUCT_LIST = parseProductCSV(productCSV);

export default PRODUCT_LIST;

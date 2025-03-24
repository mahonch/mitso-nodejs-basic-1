import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, './files/fileToRead.txt'); 

const readFile = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    console.log(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('File not found. Please check the path or add the file.');
    } else {
      throw error;
    }
  }
};

readFile();

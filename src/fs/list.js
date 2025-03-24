import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const listFiles = async () => {
    const dirPath = path.join(__dirname, 'files');

    try {
        await fs.access(dirPath);
        const files = await fs.readdir(dirPath);
        console.log('Files in the directory:');
        files.forEach((file) => console.log(file));
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed: Directory does not exist');
        } else {
            throw error;
        }
    }
};

(async () => {
    try {
        await listFiles();
    } catch (error) {
        console.error(error.message);
    }
})();
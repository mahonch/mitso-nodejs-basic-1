import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
    const filePath = path.join(__dirname, 'files', 'fresh.txt');
    const content = 'Im fresh and young'; 

    try {
        await fs.access(filePath);
        throw new Error('FS operation failed: File already exists');
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(filePath, content);
            console.log('File created successfully!');
        } else {
            throw error;
        }
    }
};

(async () => {
    try {
        await create();
    } catch (error) {
        console.error(error.message);
    }
})();
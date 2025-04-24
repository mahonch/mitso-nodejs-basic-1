import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
    const oldFilePath = path.join(__dirname, 'files', 'wrongFilename.txt');
    const newFilePath = path.join(__dirname, 'files', 'properFilename.md'); 

    try {
        await fs.access(oldFilePath);

        try {
            await fs.access(newFilePath);
            throw new Error('FS operation failed: Target file already exists');
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.rename(oldFilePath, newFilePath);
                console.log('File renamed successfully!');
            } else {
                throw error;
            }
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed: Source file does not exist');
        } else {
            throw error;
        }
    }
};

(async () => {
    try {
        await rename();
    } catch (error) {
        console.error(error.message);
    }
})();
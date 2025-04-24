import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    const sourceDir = path.join(__dirname, 'files'); 
    const targetDir = path.join(__dirname, 'files_copy'); 

    try {
        await fs.access(sourceDir);

        try {
            await fs.access(targetDir);
            throw new Error('FS operation failed: Target directory already exists');
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.mkdir(targetDir);

                const files = await fs.readdir(sourceDir);
                for (const file of files) {
                    const sourceFilePath = path.join(sourceDir, file);
                    const targetFilePath = path.join(targetDir, file);
                    await fs.copyFile(sourceFilePath, targetFilePath);
                }

                console.log('Files copied successfully!');
            } else {
                throw error;
            }
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed: Source directory does not exist');
        } else {
            throw error;
        }
    }
};


(async () => {
    try {
        await copy();
    } catch (error) {
        console.error(error.message);
    }
})();
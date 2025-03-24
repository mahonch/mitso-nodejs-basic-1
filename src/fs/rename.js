import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
    const oldFilePath = path.join(__dirname, 'files', 'wrongFilename.txt'); // Путь к старому файлу
    const newFilePath = path.join(__dirname, 'files', 'properFilename.md'); // Путь к новому файлу

    try {
        // Проверяем, существует ли старый файл
        await fs.access(oldFilePath);

        // Проверяем, не существует ли новый файл
        try {
            await fs.access(newFilePath);
            throw new Error('FS operation failed: Target file already exists');
        } catch (error) {
            if (error.code === 'ENOENT') {
                // Если новый файл не существует, переименовываем старый файл
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

// Вызов функции
(async () => {
    try {
        await rename();
    } catch (error) {
        console.error(error.message);
    }
})();
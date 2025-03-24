import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    const sourceDir = path.join(__dirname, 'files'); // Путь к исходной папке
    const targetDir = path.join(__dirname, 'files_copy'); // Путь к целевой папке

    try {
        // Проверяем, существует ли исходная папка
        await fs.access(sourceDir);

        // Проверяем, не существует ли целевая папка
        try {
            await fs.access(targetDir);
            throw new Error('FS operation failed: Target directory already exists');
        } catch (error) {
            if (error.code === 'ENOENT') {
                // Если целевая папка не существует, создаем ее
                await fs.mkdir(targetDir);

                // Копируем содержимое исходной папки в целевую
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

// Вызов функции
(async () => {
    try {
        await copy();
    } catch (error) {
        console.error(error.message);
    }
})();
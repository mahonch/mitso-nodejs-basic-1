const fs = require('fs');
const zlib = require('zlib');

const decompress = async () => {
    const readStream = fs.createReadStream('archive.gz');

    const writeStream = fs.createWriteStream('fileToCompress.txt');

    const gunzip = zlib.createGunzip();

    readStream.pipe(gunzip).pipe(writeStream);

    await new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });
};

await decompress();

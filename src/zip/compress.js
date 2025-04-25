const compress = async () => {
    const fs = require('fs');
    const zlib = require('zlib');
    const { pipeline } = require('stream');
    
    const fileToCompress = 'files/fileToCompress.txt';
    const outputArchive = 'archive.gz';

    const gzip = zlib.createGzip();
    const source = fs.createReadStream(fileToCompress);
    const destination = fs.createWriteStream(outputArchive);

    pipeline(source, gzip, destination, (err) => {
        if (err) {
            console.error('An error occurred:', err);
        } else {
            console.log('File successfully compressed');
        }
    });
};

await compress();


const { createHash } = require('crypto');
const { createReadStream } = require('fs');
const path = require('path');

const calculateHash = async () => {
    const hash = createHash('sha256');
    const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
    const stream = createReadStream(filePath);
    
    stream.on('data', (chunk) => {
        hash.update(chunk);
    });
    
    await new Promise((resolve, reject) => {
        stream.on('end', () => {
            const result = hash.digest('hex');
            console.log(result);
            resolve();
        });
        stream.on('error', reject);
    });
};

await calculateHash();

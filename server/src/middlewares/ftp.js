const ftp = require("basic-ftp");
require("dotenv").config();

async function uploadToFTP(localFilePath, remoteFileName, remoteDir = "", maxRetries = 3) {
    const client = new ftp.Client();
    client.ftp.verbose = process.env.NODE_ENV !== 'production';

    let attempts = 0;
    let lastError = null;

    while (attempts < maxRetries) {
        try {
            attempts++;
            console.log(`Upload attempt ${attempts}/${maxRetries}`);

            await client.access({
                host: process.env.ASURA_HOST,
                user: process.env.ASURA_USER,
                password: process.env.ASURA_PASS,
                secure: false,
                port: parseInt(process.env.ASURA_PORT) || 21,
                connectionTimeout: 10000
            });

            // Base directory from .env (e.g. /domains/flowerpng.com/public_html/cdn)
            await client.cd(process.env.ASURA_DIR);

            // Navigate into target folder (cdn OR private)
            if (remoteDir) {
                await client.ensureDir(remoteDir);
            }

            await client.uploadFrom(localFilePath, remoteFileName);

            // return `/${remoteFileName}`;
            return `/${remoteDir}/${remoteFileName}`.replace("//", "/");

        } catch (err) {
            lastError = err;
            console.error(`Attempt ${attempts} failed:`, err.message);

            if (attempts < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 2000)); // 2s delay
            }
        } finally {
            try {
                client.close();
            } catch (closeErr) {
                console.error('Error closing FTP connection:', closeErr.message);
            }
        }
    }

    throw new Error(`FTP upload failed after ${maxRetries} attempts: ${lastError.message}`);
}

module.exports = uploadToFTP;
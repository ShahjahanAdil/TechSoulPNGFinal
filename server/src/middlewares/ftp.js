const ftp = require("basic-ftp");
require("dotenv").config();

async function uploadToFTP(localFilePath, remoteFileName) {
    const client = new ftp.Client();
    client.ftp.verbose = false;

    try {
        await client.access({
            host: process.env.ASURA_HOST,
            user: process.env.ASURA_USER,
            password: process.env.ASURA_PASS,
            secure: false,
        });

        await client.cd(process.env.ASURA_DIR);
        await client.uploadFrom(localFilePath, `${remoteFileName}`);

        return `/${remoteFileName}`;
    } catch (err) {
        throw new Error("FTP upload failed: " + err.message);
    } finally {
        client.close();
    }
}

module.exports = uploadToFTP;
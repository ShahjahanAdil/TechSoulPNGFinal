const ftp = require("basic-ftp");
require("dotenv").config();

async function delFromFtp(remoteFileName) {
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
        await client.remove(remoteFileName);

        return true;
    } catch (err) {
        console.error("FTP delete failed:", err.message);
        throw new Error("FTP delete failed: " + err.message);
    } finally {
        client.close();
    }
}

module.exports = delFromFtp;
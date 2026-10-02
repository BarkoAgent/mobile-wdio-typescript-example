const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const VERSION = 'v2.2.0';
const FILE_NAME = `android.wdio.native.app.${VERSION}.apk`;
const URL = `https://github.com/webdriverio/native-demo-app/releases/download/${VERSION}/${FILE_NAME}`;
const SHA256 = 'fe1d605ce099c73d93f33e5cbcb0df0bea437ce57aaaaf156b3b0fa1ca54931d';
const target = path.join(__dirname, '..', 'app', 'android', FILE_NAME);

const sha256Of = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

const download = (url, dest, redirects = 5) =>
  new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects > 0) {
          res.resume();
          return resolve(download(res.headers.location, dest, redirects - 1));
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`Download failed with HTTP ${res.statusCode}`));
        }
        const out = fs.createWriteStream(dest);
        res.pipe(out);
        out.on('finish', () => out.close(resolve));
        out.on('error', reject);
      })
      .on('error', reject);
  });

(async () => {
  if (fs.existsSync(target) && sha256Of(target) === SHA256) {
    console.log(`${FILE_NAME} already present`);
    return;
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  console.log(`Downloading ${URL}`);
  await download(URL, target);
  if (sha256Of(target) !== SHA256) {
    fs.unlinkSync(target);
    throw new Error('Checksum mismatch, file removed');
  }
  console.log(`Saved ${target}`);
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

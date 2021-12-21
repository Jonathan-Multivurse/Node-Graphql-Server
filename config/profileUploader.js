const s3 = require('./s3');
const { S3Uploader } = require('./uploader');

const profileUploader = new S3Uploader(s3, {
  baseKey: 'profiles',
  uploadParams: {
    CacheControl: 'max-age:31536000',
    ContentDisposition: 'inline',
  },
  filenameTransform: filename => filename,
});

module.exports = { profileUploader };
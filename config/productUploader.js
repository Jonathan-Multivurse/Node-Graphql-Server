const s3 = require("./s3");
const { S3Uploader } = require("./uploader");

const productUploader = new S3Uploader(s3, {
  baseKey: "products",
  uploadParams: {
    CacheControl: "max-age:31536000",
    ContentDisposition: "inline",
  },
  filenameTransform: (filename) => filename,
});

module.exports = { productUploader };

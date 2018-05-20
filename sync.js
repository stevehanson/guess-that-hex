// requires following dependencies:  yarn add s3 dotenv
var s3 = require('s3');
require('dotenv').config()

var client = s3.createClient({
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

var params = {
  localDir: "build",
  deleteRemoved: true,
  s3Params: {
    Bucket: "hex.shanson.co",
    Prefix: "",
    ACL: 'public-read'
    // other options supported by putObject, except Body and ContentLength.
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
  },
};

console.log('Uploading to S3....')

var uploader = client.uploadDir(params);
uploader.on('error', function(err) {
  console.error("unable to sync:", err.stack);
});

uploader.on('progress', function() {
  if(uploader.progressAmount && uploader.progressTotal) {
    console.log("Uploaded", Math.round(uploader.progressAmount/uploader.progressTotal * 100) + '%' );
  }
});

uploader.on('end', function() {
  console.log("done uploading");
});

const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const keys = require('../../config/keys');
const S3_BUCKET = keys.s3_bucket;
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid3 = require('uuid/v3');
aws.config.region = 'us-west-1';

const s3 = new aws.S3({
  accessKeyId: keys.aws_access_key_id,
  secretAccessKey: keys.aws_secret_access_key
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    }
  })
});

router.post('/', upload.array('', 1), (req, res) => {
  const fileName = req.query['file-name'] + uuid3.URL;
  const fileType = req.query['file-type'];

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    } else {
      const uniqueURL = `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`;
      const returnData = {
        signedRequest: data,
        url: uniqueURL
      };
      res.write(JSON.stringify(returnData));
      res.end();
    }
  });
});

module.exports = router;

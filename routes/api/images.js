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

router.post('/', upload.single('photo'), (req, res) => {
  let key = req.file.key;
  res.send(`/api/images/${key}`);
});
router.get('/:id', (req, res) => {
  s3.getObject({ Bucket: S3_BUCKET, Key: req.params.id }, function(err, data) {
    if (err) {
      return res.status(500).send(err);
    }

    // Headers
    res.set('Content-Length', data.ContentLength).set('Content-Type', data.ContentType);

    res.send(data.Body);
  });
});

module.exports = router;


const express = require('express');
const router = express.Router();
const Panel = require('../../models/Panel');
// const AWS = require('aws-sdk');
// const { aws } = require('../../config/keys');
const validatePanel = require('../../validation/panel');

// const { aws_access_key_id, aws_secret_access_key, sw3_bucket } = aws;

// configure aws
// aws.config.region = 'us-west-2';

router
    .get('/:id', (req, res) => {
        const panel = Panel.findById(req.params.id);
        const {errors, isValid} = validatePanel(panel);

        if (!isValid) res.status(422).json(errors);

        const { authorId, title, panelText, photoURL, parentId, rootId } = req.body;

        res.json(panel);
    })
    .post('/', (req, res) => {
        const { errors, isValid } = validatePanel(req.body);

    const panel = Panel.findById(req.params.id);

    res.json(panel);
  })
  .post('/', (req, res) => {
    const { errors, isValid } = validatePanel(req.body);

            newPanel.save()
                .then(panel => {
                    const { _id, authorId, title, panelText, parentId, rootId } = panel;
                    const payload = {
                        id: _id,
                        authorId,
                        title,
                        panelText,
                        parentId,
                        rootId
                    };
                    res.json(payload);
                })
                .catch(err => console.log(err));

      const newPanel = new Panel({
        authorId,
        title,
        panelText,
        parentId,
        rootId
      });

      newPanel.save()
        .then(panel => {
          res.json(panel);
        })
        .catch(err => console.log(err));


    // const fileName = req.query['file-name'];
    // const fileType = req.query['file-type'];
    // const s3Params = {
    //     Bucket: sw3_bucket,
    //     Key: fileName,
    //     Expires: 60,
    //     ContenType: fileType,
    //     ACL: 'pubic-read'
    // };

    // s3Params.getSignedUrl('putObject', s3Params, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         return res.end();
    //     }
    //     const returnData = {
    //         signedRequest: data,
    //         url: `https://${sw3_bucket}.s3.amazonaws.com/${fileName}`
    //     };
    //     res.write(JSON.stringify(returnData));
    //     res.end();
    // });
  });

module.exports = router;

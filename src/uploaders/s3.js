const debug = require('debug')('obito:s3')
const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')
const mime = require('mime')
const config = require('../config')

let client = null

exports.upload = async (objectName, filePath) => {
  if (!client) {
    client = new AWS.S3({
      accessKeyId: config.s3.accessKeyId,
      secretAccessKey: config.s3.secretAccessKey,
      Bucket: config.s3.bucket
    })
    debug(`instantiate s3 instance: ${config.s3}`)
  }

  await client.putObject({
    Bucket: config.s3.bucket,
    Key: objectName,
    Body: fs.createReadStream(filePath),
    ContentType: mime.getType(path.extname(filePath))
  }).promise()
}

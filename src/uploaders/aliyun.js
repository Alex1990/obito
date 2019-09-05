const OSS = require('ali-oss')
const config = require('../config')

let client = new OSS(config.aliyun)

exports.upload = async (objectName, filePath) => {
  if (!client) {
    client = new OSS(config.aliyun)
  }
  return client.put(objectName, filePath)
}

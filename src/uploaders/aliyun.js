const debug = require('debug')('obito:aliyun')
const OSS = require('ali-oss')
const config = require('../config')

let client = null

exports.upload = async (objectName, filePath) => {
  if (!client) {
    client = new OSS(config.aliyun)
    debug(`instantiate aliyun oss instance: ${config.aliyun}`)
  }
  return client.put(objectName, filePath)
}

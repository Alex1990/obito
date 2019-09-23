/* global describe, test, expect */
const path = require('path')
const shell = require('shelljs')
const rp = require('request-promise')
const OSS = require('ali-oss')
const S3 = require('aws-sdk/clients/s3')
const config = require('./config')

const obitoBin = path.join(process.cwd(), 'bin/obito')

describe('sync', () => {
  test('should sync an npm package to aliyun oss', async (done) => {
    const client = new OSS(config.aliyun)
    const pkg = 'debug@4.1.1'
    const pkgMain = `${pkg}/dist/debug.js`
    const objectName = `${config.prefix}/${pkgMain}`

    const ret = shell.exec(`${obitoBin} sync ${pkg}`)
    if (ret.code !== 0) {
      console.error(ret.stderr)
    } else {
      console.log(ret.stdout)
    }
    expect(ret.code).toBe(0)

    const url = await client.signatureUrl(objectName)
    const res = await rp({
      url,
      resolveWithFullResponse: true
    })
    expect(res.headers['content-type']).toBe('application/javascript')
    expect(res.body).toMatch('debug')
    done()
  }, 30000)

  test('should sync an npm private package to aliyun oss', async (done) => {
    const client = new OSS(config.aliyun)
    const pkg = '@babel/standalone@7.6.0'
    const pkgMain = `${pkg}/babel.min.js`
    const objectName = `${config.prefix}/${pkgMain}`

    const ret = shell.exec(`${obitoBin} sync ${pkg}`)
    if (ret.code !== 0) {
      console.error(ret.stderr)
    } else {
      console.log(ret.stdout)
    }
    expect(ret.code).toBe(0)

    const url = await client.signatureUrl(objectName)
    const res = await rp({
      url,
      resolveWithFullResponse: true
    })
    expect(res.headers['content-type']).toBe('application/javascript')
    expect(res.body).toMatch('babel')
    done()
  }, 30000)

  test('should sync an npm package to aws s3', async (done) => {
    const client = new S3({
      accessKeyId: config.s3.accessKeyId,
      secretAccessKey: config.s3.secretAccessKey
    })
    const pkg = 'debug@4.1.1'
    const pkgMain = `${pkg}/dist/debug.js`
    const objectName = `${config.prefix}/${pkgMain}`

    const ret = shell.exec(`${obitoBin} sync --uploader s3 ${pkg}`)
    if (ret.code !== 0) {
      console.error(ret.stderr)
    } else {
      console.log(ret.stdout)
    }
    expect(ret.code).toBe(0)

    const url = client.getSignedUrl('getObject', {
      Bucket: config.s3.bucket,
      Key: objectName
    })
    const res = await rp({
      url,
      resolveWithFullResponse: true
    })
    expect(res.headers['content-type']).toBe('application/javascript')
    expect(res.body).toMatch('debug')
    done()
  }, 30000)
})

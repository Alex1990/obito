/* global describe, test, expect */
const path = require('path')
const shell = require('shelljs')
const rp = require('request-promise')
const OSS = require('ali-oss')
const config = require('./config')

const obitoBin = path.join(process.cwd(), 'bin/obito')
const client = new OSS(config.aliyun)

describe('sync', () => {
  test('should sync an npm package to aliyun oss', async (done) => {
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
  })
})

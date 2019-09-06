const fs = require('fs')
const path = require('path')
const Async = require('async')
const klaw = require('klaw')
const chalk = require('chalk')
const prettyBytes = require('pretty-bytes')
const config = require('./config')
const uploaders = require('./uploaders')

function getPackageFiles (pkgDir) {
  return new Promise((resolve, reject) => {
    const files = []
    klaw(pkgDir)
      .on('data', file => {
        const stats = fs.statSync(file.path)
        const relativeFileName = path.relative(pkgDir, file.path)
        if (stats.isFile() && relativeFileName.indexOf('node_modules') !== 0) {
          file.size = stats.size
          files.push(file)
        }
      })
      .on('end', () => resolve(files))
      .on('error', reject)
  })
}

async function uploadPackage ({ uploader, pkgDir }) {
  const files = await getPackageFiles(pkgDir)
  const pkg = require(path.join(pkgDir, 'package.json'))
  const objectNamePrefix = `${config.prefix || ''}/${pkg.name}@${pkg.version}/`

  return new Promise((resolve, reject) => {
    Async.mapLimit(files, 10, async (file) => {
      const relativeFileName = path.relative(pkgDir, file.path)
      const objectName = `${objectNamePrefix}${relativeFileName}`
      await uploaders[uploader].upload(objectName, file.path)
      return {
        objectName,
        size: file.size
      }
    }, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = async function upload ({ uploader, pkgDirs }) {
  const uploads = pkgDirs.map(pkgDir => uploadPackage({ uploader, pkgDir }))
  const results = await Promise.all(uploads)
  const files = results.reduce((a, b) => a.concat(b), [])
  const line = Array(80).fill('=').join('')
  let totalSize = 0
  console.log('')
  console.log(line)
  console.log('')
  for (const file of files) {
    totalSize += file.size
    console.log(file.objectName)
  }
  console.log('')
  console.log(line)
  console.log(chalk.green(`done! ${files.length} files, ${prettyBytes(totalSize)}`))
}

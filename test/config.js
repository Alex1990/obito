const fs = require('fs')
const path = require('path')
const ini = require('ini')

const cwd = process.cwd()
const configFileName = '.obitorc'

const localConfigFile = path.join(cwd, configFileName)
const localConfig = ini.parse(fs.readFileSync(localConfigFile, 'utf-8'))

module.exports = localConfig

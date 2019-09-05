const fs = require('fs')
const path = require('path')
const os = require('os')
const ini = require('ini')

const homeDir = os.homedir()
const cwd = process.cwd()
const configFileName = '.obitorc'

const userConfigFile = path.join(homeDir, configFileName)
const localConfigFile = path.join(cwd, configFileName)

let userConfig = {}

try {
  userConfig = ini.parse(fs.readFileSync(userConfigFile, 'utf-8'))
} catch (err) {}

let localConfig = {}

try {
  localConfig = ini.parse(fs.readFileSync(localConfigFile, 'utf-8'))
} catch (err) {}

const config = { ...userConfig, ...localConfig }

module.exports = config

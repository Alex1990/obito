const debug = require('debug')('obito:config')
const fs = require('fs')
const path = require('path')
const os = require('os')
const ini = require('ini')

const homeDir = os.homedir()
const cwd = process.cwd()
const configFileName = '.obitorc'

const userConfigFile = path.join(homeDir, configFileName)
const localConfigFile = path.join(cwd, configFileName)

let userConfigContent = ''

try {
  userConfigContent = fs.readFileSync(userConfigFile, 'utf-8')
} catch (err) {
  debug(`user config is not exist: ${userConfigFile}`)
}

let userConfig = {}

try {
  userConfig = ini.parse(userConfigContent)
} catch (err) {
  debug(`ini parse error for ${userConfigFile}`)
}

let localConfigContent = ''

try {
  localConfigContent = fs.readFileSync(localConfigFile, 'utf-8')
} catch (err) {
  debug(`local config is not exist: ${localConfigFile}`)
}

let localConfig = {}

try {
  localConfig = ini.parse(localConfigContent)
} catch (err) {
  debug(`ini parse error for ${localConfigFile}`)
}

const config = { ...userConfig, ...localConfig }

module.exports = config

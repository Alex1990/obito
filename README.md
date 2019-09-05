# obito

A cli to sync npm package(s) to cloud storage, such as Aliyun OSS.

## Installation

```
npm install --global obito
```

## Usage

Firstly, create a file named `.obitorc` in your HOME directory.

**.obitorc**

```ini
# The path prefix
prefix = npm

# ali-oss sdk configuration: https://www.alibabacloud.com/help/zh/doc-detail/32068.htm
[aliyun]
accessKeyId = <oss accessKeyId>
accessKeySecret = <oss accessKeySecret>
bucket = <oss bucket>
region = <oss region>
```

Then, run the below command to sync the npm package(s) to cloud storage.

```sh
# sync lodash
obito sync lodash

# sync the latest lodash
obito sync lodash@latest

# sync lodash with the specified version
obito sync lodash@4.17.15

# sync multiple packages
obito sync react react-dom
```

## Docs

```
Usage: obito [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      output usage information

Commands:
  sync <package>  sync the package(s) to cloud storage
  help [cmd]      display help for [cmd]
```

## LICENSE

MIT

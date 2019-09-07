# obito

obito (`/ˈɔːbitəu/`): A cli to sync npm package(s) to cloud storage, such as Aliyun OSS.

## Installation

```
npm install --global obito
```

## Usage

Firstly, create a file named `.obitorc` in your $HOME directory or any other directory.
The obito will merged the `.obitorc`s of current working directory (**preferred**) and $HOME direcotry.

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

# or aws s3
[s3]
accessKeyId = <s3 accessKeyId>
secretAccessKey = <s3 secretAccessKey>
bucket = <s3 bucket>
region = <s3 region>
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

# By default, it will be uploaded to aliyun.
# You can specify the `--uploader` argument
# Currently, the uploader argument can be one of aliyun, s3
obito sync lodash --uploader s3
```

Then, the path uploaded to cloud storage is

```
/npm/lodash@4.17.15/lodash.js
```

## Docs

```
$ obito help
Usage: obito [options] [command]

Options:
  -V, --version                      output the version number
  -h, --help                         output usage information

Commands:
  sync <package> [otherPackages...]  sync the package(s) to cloud storage
  help [cmd]                         display help for [cmd]
```

```
$ obito help sync
Usage: obito-sync [options]

Options:
  -u, --uploader <uploader>  the uploader of cloud storage, one of aliyun, s3 (default: "aliyun")
  -h, --help                 output usage information
```

## LICENSE

MIT

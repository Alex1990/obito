exports.parsePkgName = (pkg) => {
  let name = pkg
  let version = 'latest'

  const firstAtIndex = pkg.indexOf('@')
  const secondAtIndex = pkg.indexOf('@', firstAtIndex + 1)

  if (firstAtIndex > 0) {
    name = pkg.slice(0, firstAtIndex)
    version = pkg.slice(firstAtIndex + 1)
  } else if (secondAtIndex > -1) {
    name = pkg.slice(0, secondAtIndex)
    version = pkg.slice(secondAtIndex + 1)
  }

  return {
    name,
    version
  }
}

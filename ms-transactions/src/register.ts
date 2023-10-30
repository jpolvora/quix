import moduleAlias from 'module-alias'
const rootPath = __dirname
console.log('rootPath is %s', rootPath)

moduleAlias.addAliases({
  '@': rootPath,
})

moduleAlias()

import moduleAlias from 'module-alias'
import path from 'path'

console.log(process.env.APP_PATH)
console.log(typeof process.env.APP_PATH)

//const rootPath = typeof process.env.APP_PATH === 'string' ? path.join(__dirname, process.env.APP_PATH) : __dirname
const rootPath = __dirname

console.log('rootPath is %s', rootPath)

moduleAlias.addAliases({
  '@': rootPath,
})

moduleAlias()

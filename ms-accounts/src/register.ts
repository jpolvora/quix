import moduleAlias from 'module-alias'
import path from 'path'

const rootPath = typeof process.env.APP_PATH === "string"
    ? path.join(__dirname, process.env.APP_PATH)
    : path.join(__dirname, '../', 'src')

console.log('rootPath is %s', rootPath)

moduleAlias.addAliases({
    '@': rootPath
})

moduleAlias()
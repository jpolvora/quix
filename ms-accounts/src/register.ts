import moduleAlias from 'module-alias'
import path from 'path'

const rootPath = process.env.NODE_ENV === "production" ? path.join(__dirname) : path.join(__dirname, '../', 'src')
console.log('rootPath is %s', rootPath)

moduleAlias.addAliases({
    '@': rootPath
})

moduleAlias()
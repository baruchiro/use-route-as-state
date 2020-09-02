const fs = require('fs')

const pkg = JSON.parse(fs.readFileSync('./package.json'))

pkg.name = `@baruchiro/${pkg.name}`

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 4))

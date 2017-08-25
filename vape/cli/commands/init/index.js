const writeConfig      = require('./writeConfig')
const generateSql      = require('./generateSql')
const checkForVapeRepo = require('./checkForVapeRepo')
const fwf              = require('fun_with_flags')

module.exports = {
  description: 'init this vape project',

  exec(target) {
    // clear
    return fwf.shell('clear')

    // check for repo link
    .then(() => {
      return checkForVapeRepo(target)
    })

    // write config
    .then(() => {
      return writeConfig(target)
    })

    // generate sql files
    .then(props => {
      return generateSql(props)
    })
    .then(() => {
      return `
Your config and default sql have been generated. Please run \`npm run vape migrate run\` to setup your db.
If you need to overwrite a previous setup, run \`npm run vape migrate run -- --drop\`
Once that runs, run \`npm run dev\` to startup your app.
    `})
  }
}

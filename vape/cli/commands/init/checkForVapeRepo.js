const fwf  = require('fun_with_flags')
const fs   = require('fs')
const path = require('path')

module.exports = function (target) {
  console.log('Checking for Vape repo...')

  return new Promise((resolve, reject) => {
    fs.readdir(path.resolve('./'), (err, data) => {
      if (err)
        return reject(err)
      return resolve(data)
    })
  })
  .then(data => {
    // not found, prompt for path
    if (data.indexOf('vape') === -1) {
      console.log(`
Vape repo not found.
If you have not forked and/or cloned the Vape repo, please do so now: 
Repo can be found at https://github.com/skyClutch/vape.git
Do not put it in this directory. That would get weird.
      `)

      // prompt for repo path
      return fwf.prompt([{
        name: 'repoPath',
        message: 'Please provide path to Vape repo'
      }])

      // read path
      .then(({ repoPath }) => {
        return new Promise((resolve, reject) => {
          fs.readdir(path.resolve(repoPath), (err, data) => {
            if (err)
              return reject(err)
            return resolve({ data, repoPath })
          })
        })
      })

      // symlink if it appears to be a vape repo
      .then(({ data, repoPath }) => {
        if (data.indexOf('vape') > -1 && data.indexOf('config') > -1)
          return fwf.shell(`ln -s ${path.resolve(repoPath)} ${path.resolve('./vape')}`)
        throw 'Path does not appear to be a Vape repo'
      })
    }

    // otherwise just move along
    return null
  })
}

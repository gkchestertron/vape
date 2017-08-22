const path = require('path')
const fs   = require('fs')

function ModuleBuilder({ hook, folders }) {
  this.folders = folders
  this.hook = hook || 'run' // lets us set the hook to watch-run for dev mode
}

ModuleBuilder.prototype.apply = function (compiler) {
  compiler.plugin(this.hook, (compilationParams, callback) => {
    return Promise.all(this.folders.map(folder => build(folder)))
    .then(() => {
      callback()
    })
    .catch(err => {
      console.error(err)
      callback()
    })
  })
}

function build(folder) {
  // add ./ to naked folder names
  if (/^\w/.test(folder))
    folder = `./${folder}`


  // check for existing index file
  return new Promise((res, rej) => {
    fs.readFile(`${folder}/index.js`, (err, data) => {
      if (!err && !/^\/\* ModuleBuilder/.test(data))
        return rej(folder + ' Index File Exists')
      res()
    })
  })

  // read through dir
  .then(() => {
    return new Promise((res, rej) => {
      fs.readdir(folder, (err, data) => {
        if (err)
          return rej(err)
        return res(data)
      })
    })
  })

  // recur on folders
  .then(files => {
    let folders = files.filter(file => {
      return !/\.\w+$/.test(file)
    })

    return Promise.all(folders, folder => build(folder))
    .then(() => files)
  })

  // build index file
  .then(files => {
    let index = '/* ModuleBuilder\n  Index file autogenerated by ModuleBuilder\n  Remove these lines or add custom file to override builder\n*/\n\n'
    let imports = ''
    let exports = `\nexport default {\n`

    // import/export each file
    files.forEach(file => {
      // skip hidden files
      if (/^\.|index\.js/.test(file))
        return

      // add file import and export
      imports += `import ${file.split('.').slice(0, -1).join('.') || file} from './${file}'\n`
      exports += `  ${file.split('.').slice(0, -1).join('.') || file},\n`
    })

    // end export object
    exports += `}`

    index += imports + exports

    return index
  })

  // clear file if it is there
  // ignore error
  .then(index => {
    return new Promise((res, rej) => {
      fs.unlink(`${folder}/index.js`, err => {
        if (err)
          return res(index)
        return res(index)
      })
    })
  })

  // write file
  .then(index => {
    return new Promise((res, rej) => {
      fs.writeFile(`${folder}/index.js`, index, err => {
        if (err)
          return rej(err)

        // hack that backdates files to block infinite watch/build loop
        let f    = path.resolve(`${folder}/index.js`)
        let now  = Date.now() / 1000
        let then = now - 100000
        fs.utimes(f, then, then, err => { 
          if (err)
            return rej(err)
          // return success message
          return res(`${folder}/index.js written`)
        })
      })
    })
  })

  // print success
  .then(result => console.log(result))

  // print out error if we already have an index file
  // or if some other error occurs
  .catch(err => console.log(err))
}

module.exports = ModuleBuilder

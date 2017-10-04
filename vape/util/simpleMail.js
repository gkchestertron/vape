const path = require('path')
const config = require(path.resolve('./config/server'))

const nodemailer = require('nodemailer')

// create reuseable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.INSECURE_GMAIL_USERNAME,
    pass: config.INSECURE_GMAIL_PASSWORD
  }
})

/**
 * sends an email to the registered email with the verification token
 */
module.exports = function (options) {
  // default from
  const mailOptions = Object.assign({}, {
    from: config.INSECURE_GMAIL_USERNAME
  }, options)

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(error, info){
      if (error)
        return reject(error)
      return resolve(info)
    })
  })
}

const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const login = async (req, res) => {
  const { username, password } = req.body
  // mongoose validation
  if (!username || !password) {
    throw new CustomAPIError('Please provide email and password', 400)
  }
  console.log(username, password)

  const id = new Date().getDate()
  //just for example
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
  // res.send('Fake Login/Register/Signup Route')
  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 401)
  }

  console.log(req.headers)
  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({
    msg: `Hello, John Doe`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}

module.exports = { login, dashboard }

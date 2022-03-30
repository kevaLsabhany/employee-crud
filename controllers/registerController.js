const bcrypt = require('bcrypt')
const User = require('../model/User')

const register = async (req, res) => {
    const { username, pwd } = req.body
    if (!username || !pwd)
        res.status(401).json({ 'message': 'username and password are required' })
    const user = await User.findOne({ username }).exec()
    if (user)
        res.json({ 'message': "User already exists" })
    else {
        const hashPwd = await bcrypt.hash(pwd, 10)
        const result = await User.create({
            username,
            password: hashPwd
        })
        res.status(201).json(result)
    }
}

module.exports = { register }
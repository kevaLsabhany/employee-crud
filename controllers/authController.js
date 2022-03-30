const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/User')

const login = async (req, res) => {
    const { username, pwd } = req.body
    const user = await User.findOne({ username }).exec()
    if (user) {
        const match = await bcrypt.compare(pwd, user.password)
        if (match) {
            const accessToken = jwt.sign(
                {
                    username,
                    roles: user.roles
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '300s' }
            )
            const refreshToken = jwt.sign(
                { username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            )
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
            user.refreshToken = refreshToken
            const result = await user.save()
            console.log(result)
            res.json({ accessToken })
        }
        else
            return res.json({ 'message': 'username or password are incorrect' })
    } else {
        return res.json({ 'message': 'user not found' })
    }
}

module.exports = { login }
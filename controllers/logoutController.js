const User = require('../model/User')

const handleLogout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)
    const refreshToken = cookies.jwt

    const user = await User.findOne({ refreshToken }).exec()
    if (!user) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204);
    }

    user.refreshToken = ''
    const result = await user.save()
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true })
    res.json({ 'message': 'logged out' })
}

module.exports = { handleLogout }
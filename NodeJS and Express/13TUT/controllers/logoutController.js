const User = require('../model/User');

const handleLogout = async (req, res) => {
    // on client, also delete the accessToken

    const cookies = req.cookies;
    // if we have cookies and if they're jwt property
    if (!cookies?.jwt) return res.sendStatus(204); // no content to send back
    const refreshToken = cookies.jwt;
    
    // is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204);
    }
    // delete the refresh token in db
    foundUser.refreshToken = '';
    // will save in mongoDB
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true}); // secure: true only serves on https
    res.sendStatus(204);
}

module.exports = { handleLogout }
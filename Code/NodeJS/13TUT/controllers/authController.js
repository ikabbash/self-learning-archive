const User = require('../model/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // see if username exists
  const foundUser = await User.findOne({ username: user}).exec();
  if (!foundUser) return res.sendStatus(401); // unauthorized

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: { 
            username: foundUser.username, 
            roles: roles 
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "120s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // save refresh token in database to create a
    // logout route so when user logs out for validation
    // changes were made since we don't write to file we write in mongoDB
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    // would be preferred to be stored in memory not in local storage
    // research the better secure way for frontend and backend for accessToken
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); // one day
    // frontend developer can grab
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };

//Import depencences for Create and decote tokens that after we use to login in user.js controller
// const jwt = require("jwt-simple")
const jwt = require ("jsonwebtoken");
// const moment = require("moment")

//Create a secret key is for encode 

// const secret = "sN1234567890abcdefghijklmnopqrstuvwxyz"

//Create a token and decode token

const createToken = (user) => {
    const payload = {
        id: user._id,
        name:user.name,
        surname:user.surname,
        nick:user.nick,
        email:user.email,
        role:user.role,
        // image:user.image,
        // iat:moment().unix(),
        // exp:moment().add(1,"days").unix() //expiration token, 30 is the quantity of the right param "days"
    }

    // return jwt.encode(payload, process.env.JWT_SECRET)
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
}

module.exports = {
    createToken,
    // secret
}
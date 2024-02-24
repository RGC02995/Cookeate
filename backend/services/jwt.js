//Import depencences for Create and decote tokens that after we use to login in user.js controller
const jwt = require("jwt-simple")
const moment = require("moment")

//Create a secret key is for encode 

const secret = "This_iS_tHe_SeCREtKeyfor_ThePROyect/***/(CooKeAtE)_15486"

//Create a token and decode token

const createToken = (user) => {
    const payload = {
        id: user._id,
        name:user.name,
        surname:user.surname,
        nick:user.nick,
        email:user.email,
        role:user.role,
        image:user.image,
        iat:moment().unix(),
        exp:moment().add(30,"days").unix() //expiration token, 30 is the quantity of the right param "days"
        
    }

    return jwt.encode(payload, secret) 
}

module.exports = {
    createToken,
    secret
}
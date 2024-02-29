const {Schema, model} = require("mongoose")

const UserModel = Schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String
    },
    nick:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String
    },
    role: {
        type:String,
        default:"user_role"
    },
    img:{
        type:String,
        default:"Image.png"
    },
    created_at:{
        type:Date,
        default:Date.now
    }

})

module.exports = model("User", UserModel, "users")
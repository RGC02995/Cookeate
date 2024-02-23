//Import Dependences
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

//Import Multer for update images:
const multer = require("multer")

//CONF UPDATE MULTER
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./uploads/avatars")
    },
    filename: (req,file,cb) => {
        cb(null,"avatar " + Date.now + "-" + file.originalname)
    }
})

const uploads = multer({storage})


//ROUTES

router.post("/register", UserController.register)
router.post("/login", UserController.login)


module.exports = router
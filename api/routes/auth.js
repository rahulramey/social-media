const router = require("express").Router();
const bycrpt = require("bcrypt")
const User = require("../models/User")


//Register
router.post("/register", async(req,res)=>{
try {
    //generate new password
    const salt = await bycrpt.genSalt(10)
    const hashedPassword = await bycrpt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    //save user and response
    const user = await newUser.save();
    return res.status(200).json(user);
} catch (error){
    return res.status(500).json(error)
}
});

//Login
router.post("/login", async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(404).json("user not found");
        }

        const validPassword = await bycrpt.compare(req.body.password, user.password)
        if(!validPassword) {
            return res.status(400).json("wrong password!");
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
});

module.exports = router;
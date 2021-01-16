const router = require('express').Router();
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validation')




router.get('/register', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }
    catch(err){
        res.json({message:"blad"});
    }
});

router.post('/register', async (req, res) => {

    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already in database!');

    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        date: req.body.date,
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }

});

module.exports = router;
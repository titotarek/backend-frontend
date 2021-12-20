const User = require('../model/userModel')
const emailValidator = require('email-validator')
const bcrypt = require('bcrypt');
const { createToken } = require('../middleware/createToken');
const userRouter = require('express').Router();

userRouter.post('/signup', async (req, res) => {
    //put req.body(input of signup page) inside 
    const { username, email, password, password2 } = req.body;

    let errors = [];
    // checked required fields
    if (!username || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' })
    }
    //email validation
    if (email && !emailValidator.validate(email)) {
        errors.push({ msg: 'Please write a valid email' })
    }
    //check username length 
    if (username && username.length < 4) {
        errors.push({ msg: 'Username should be more than 4 character' })
    }
    //check pass length 
    if (password && password.length < 6) {
        errors.push({ msg: 'Password should be more than 6 character' })
    }
    //check password match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' })
    }
    //if we have at least one error
    if (errors.length > 0) {
        res.json({
            errors,
        })
    } else { //every things okay with validation input then ...
        user = await User.findOne({ email: email })
        if (user) { //if email before registered  
            errors.push({ msg: 'Email is already registered' })
            res.json({
                errors,
            })
            //if every thing okay (we don't have any input validation error and no
            // user register as same as email input in our DB before )
        } else {
            const newUser = new User({
                username,
                email,
                password
            });

            //hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, async (err, hash) => {
                    if (err) console.log(err);
                    //set password to hash
                    newUser.password = hash;
                    //save user
                    await newUser.save()
                    res.json({
                        user: newUser
                    })
                })
            });
        }
    }
})

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let errors = [];

    // checked required field
    if (!email || !password) {
        errors.push({ msg: 'Please fill in all fields' })
    }
    //email validation
    if (email && !emailValidator.validate(email)) {
        errors.push({ msg: 'Please write a valid email' })
    }
    //check pass length 
    if (password && password.length < 6) {
        errors.push({ msg: 'Password should be more than 6 character' })
    }
    //if we have at least one error
    if (errors.length > 0) {
        res.json({
            errors,
        })
        //if every thing okay (we don't have any input validation error and no
        // user register as same as email input in our DB before )
    } else {
        user = await User.findOne({ email: email })
        if (!user) {
            errors.push({ msg: 'Email is not exist' })
            res.json({
                errors,
            })
        } else {
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                errors.push({ msg: 'Password is not correct' })
                res.json({
                    errors,
                })
            } else {
                const token = createToken(user._id)
                res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
                res.json({
                    token,
                    user
                });
            }
        }

    }
})

userRouter.get('/logout', async (res, req) => {

})


module.exports = userRouter;

const router = require('express').Router();

const { User } = require("../../models");

const { handleRouteError } = require('../helpers')

// create a user
router.post("/users", async (req, res) => {
    try {
        // this is when you use the create method
        const user = await User.create(req.body);

        // this is when you create a new obj
        // cosst user = new User(req.body);
        // user.save();

        res.json(user);
    } catch (err) {
        handleRouteError(err, res);
    }
});

// get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (err) {
        handleRouteError(err, res);
    }
})


// get user by id
router.get('/users/:user_id', async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id) // think about dry code, if we had to use req.params.id in other places
        // then youd put into a variable and use it in multiple places

        res.json(user);
    } catch (err) {
        handleRouteError(err, res);

    }
})

// update single user
router.put('/users/:user_id', async (req, res) => {

    console.log('request', req.body)
    const { email, password, newPassword } = req.body;
    try {
        if (email) {
            const user = await User.findByIdAndUpdate(req.params.user_id, {
                $set: {
                    email
                }
            }, {
                new: true // gives new obj for user not the old obj u r changing
            });
            res.json(user);
        }

        if (password) {
            const user = await User.findById(req.params.user_id); // getting user by id
            console.log('user', user)

            // using method we made in User.js to check if the password of the user is the same as the password
            // that was sent through req.body 
            const pass_valid = await user.validatePass(password); 

            console.log('pass_valid', pass_valid)
            // if the password in the form is not the correct password of the user
            // then return 401 w/msg
            if (!pass_valid) return res.status(401).json({
                message: 'The old password is incorrect'
            })
            // password for user sent through form is correct, now update the password of the user
            user.password = newPassword;
            console.log('set password')
            // save the updated user to the mongodb database, there is a method on the user model 
            //              method --> `userSchema.pre('save', async function(next)`
            // in the mthd it checks if password is changed if so hash the new password

            user.save();

            // send user back to client
            res.json(user);
        }

    } catch (err) {
        handleRouteError(err, res);
    }
})

module.exports = router;
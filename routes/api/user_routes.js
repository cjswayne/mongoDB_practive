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
router.get('/users', async(req, res) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (err) {
      handleRouteError(err, res);
    }
})


// get user by id
router.get('/users/:user_id', async(req, res) => {
    try {
        const user = await User.findById(req.params.user_id) // think about dry code, if we had to use req.params.id in other places
        // then youd put into a variable and use it in multiple places

        res.json(user);
    } catch (err) {
      handleRouteError(err, res);
        
    }
})

// update single user
router.put('/users/:user_id', async(req, res) => {

    console.log('request', req.body)
    const {email, password} = req.body;
    try{
        const user = await User.findById(req.params.user_id);
        console.log(user)
        
        if(email){
            user.email = email;

            user.save();

            res.json(user);
        }

        
    } catch(err){
        handleRouteError(err, res);
    }
})

module.exports = router;
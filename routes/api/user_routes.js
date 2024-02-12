const router = require('express').Router();

const { User } = require("../../models");

const { handleRouteError } = require('../helpers')


// create a user
router.post("/users", async (req, res) => {
    try {
      console.log("request", req.body);
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
        console.log('request', req.body);

        const users = await User.find();

        res.json(users);
    } catch (err) {
      handleRouteError(err, res);
        
    }

})


module.exports = router;
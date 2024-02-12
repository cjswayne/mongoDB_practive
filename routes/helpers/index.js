function handleRouteError(err, res) {

    console.log(err.errors);

    if (err.code === 11000) {
        return res.json({
          error: 403,
          message: "User with that email address already exists",
        });
      }
  
      console.log(err.errors);

      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          message:'User with that ID could not be found.'
      })
      }

      if(!err.errors){
        return res.status(500).json({
            message:'Server encountered error.'
        })
      }
  
      let messages = [];
  
      for(let prop in err.errors){
        messages.push(err.errors[prop].message);
      }
  
      return res.json({
        error: 403,
        messages: Object.values(err.errors).map((val) => val.message),
      });
}


module.exports = {
    handleRouteError
}
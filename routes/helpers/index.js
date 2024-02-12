function handleRouteError(err, res) {

    console.log(err.errors);

    if (err.code === 11000) {
        return res.json({
          error: 403,
          message: "User with that email addy already exists",
        });
      }
  
      console.log(err.errors);
  
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
//validation function
const validateFn = (schema) => {
  return function(req,res,next){
    try {
      const {error} = schema.validate(req.body);
      if(error){
        res.status(400).json({error:error.details[0].message})
        return;
      }
      next();
    } catch (err) {
      res.status(400).json({error:err});
      console.log(err);
    }
  }
};

module.exports = validateFn;
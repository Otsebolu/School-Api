//validation function
const validateFn = (schema) => {
  return function(req,res,next){
    try {
      schema.validate(req.body);
      next();
    } catch (err) {
      res.status(400).json({error:err});
      console.log(err);
    }
  }
};

module.exports = validateFn;
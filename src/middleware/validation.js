const {validationResult} = require('express-validator');

const handleValidation = (req,res,next)=>{
    return (req,res,next)=>{
        const validationRes = validationResult(req);
        if(!validationRes.isEmpty()){
            return res.status(400).json({
                success:false,
                message:"validationRes.errors",
                data: validationRes 
           });
        }else{
            next();
        } 
    }
};

module.exports = handleValidation;
const jwt = require('jsonwebtoken');
const userModel = require('../../DB/models/user');

const auth = () => {
    return async (req,res,next) => {
        let headerToken = req.headers.authorization;
        if(!headerToken || !headerToken.startsWith('Bearer')){
            return res.status(401).json({message: 'Unauthorized access'});
        }else{
            let token = headerToken.split(' ')[1];
            let {id} = jwt.verify(token, process.env.JWTKEY);
            let user = await userModel.findById(id);
            if(user){
                req.user = user;
                next();
            }else{
                return res.status(401).json({message: 'Unauthorized access'});
            }
           
        }
    }
};


module.exports = auth;
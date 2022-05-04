const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next)=>{
    // const bearerToken = req.headers.token;
    const cookies = req.headers.cookie
    // console.log(cookies);
const bearerToken = cookies.slice(4);

           if(bearerToken){
            jwt.verify(bearerToken,"serge", (err, decodedToken) =>{
                if(err){
            // res.redirect('/login');
            res.status(401).send({Error_message:'The action require to login'});
                }
                else {
                    next();
                }
            })
        }
        else {
            res.status(401).send({Error_message:'The action require to login'});
        }
    }

module.exports = requireAuth;



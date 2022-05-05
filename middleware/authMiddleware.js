const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next)=>{
    // const bearerToken = req.headers.token;

    // we are accessing token from swagger doc,we are splitting it to access token
    // const bearerHeader = req.headers['authorization'];
    // console.log(bearerHeader);
    // let bearerArr = bearerHeader.split(" ");
    //     const bearerToken = bearerArr[1];
        

    const cookies = req.headers.cookie
    console.log(cookies);
const bearerToken = cookies.slice(4);

           if(bearerToken){
            jwt.verify(bearerToken,process.env.SECRET_KEY_DB, (err, decodedToken) =>{
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



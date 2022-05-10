const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next)=>{
    var bearerHeader;
    // use npm run dev to run in production
    if (process.env.NODE_ENV == "production") {
      bearerHeader = req.body.token;
      
    //   npm run test
    } else if (process.env.NODE_ENV == "test") {
      bearerHeader = req.headers['authorization'];

    //   use npm run start
    } else {
      // bearerHeader = req.headers.cookie;
      //    console.log(cookies);
      //   bearerToken = cookies.slice(4);
      bearerHeader = req.headers['authorization'];
    }

    if (typeof bearerHeader !== "undefined" && typeof bearerHeader !== "null") {
      if (process.env.NODE_ENV == "production") {
          bearerToken = bearerHeader;
      }

      else if (process.env.NODE_ENV == 'test' ) {
                let bearerArr = bearerHeader.split(" ");
                bearerToken = bearerArr[1];
      }

      else {
                 const cookies = req.headers.cookie;
                 console.log(cookies);
                bearerToken = cookies.slice(4);
      }

      //get the token from the array
      if (bearerToken) {
        jwt.verify(
          bearerToken,
          process.env.SECRET_KEY_DB,
          (err, decodedToken) => {
            if (err) {
              // res.redirect('/login');
              res
                .status(401)
                .send({ Error_message: "The action require to login" });
            } else {
              next();
            }
          }
        );
      } else {
        res.status(401).send({ Error_message: "The action require to login" });
      }
    } else {
      res.status(401).send({ Error_message: "The action require to login" });
    }

}
module.exports = requireAuth;



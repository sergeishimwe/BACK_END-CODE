const router = require("express").Router();
const jwt = require('jsonwebtoken');
const userDb = require('../models/User');
const requireAuth = require("../middleware/authMiddleware")

//REGISTER
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, "serge", {
        expiresIn: maxAge
    })
}
router.post("/register", async (req, res) => {
    try {
        const user = await userDb.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true, maxAge: maxAge * 1000
        })
        res.status(201).json({
            userCred: {
                email: user.email,
            }, token: token
        })

    } catch (err) {
        res.status(500).json(err);
    }
})
// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userDb.login(email, password);
        console.log(user)
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true, maxAge: maxAge * 1000
        })
        res.status(200).send({
            userCred: {
                email: user.email,
                message: "Welcome again, it is pleasure to have you back!"
            }, token: token
        })
    }
    catch (err) {
        res.status(401).send({ response: err.message });
    }

}

)

router.post('/logout',(req, res) => {
    res.cookie('jwt'," ", {maxAge:1000*1000 });
    res.status(202).send({ msg: 'You have been Logged Out' });

    // const authHeader = req.headers["authorization"];
    // res.status(200)
    // jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
    //     if (logout) {
    //         res.status(202).send({ msg: 'You have been Logged Out' });
    //     }
    //     else {
    //         res.status(503).send({ msg: 'Error' });
    //     }
    // }
    // );
})



module.exports = router
const router = require("express").Router();
const User = require("../models/User");
const bcrypt= require("bcrypt");
const { status } = require("express/lib/response");

//all users
router.get("/", (req,res) => {
    User.find()
    .then((users)=>{
        res.status(202).send(users);
    })
    .catch((error)=>{
        // res.status(500).send({message:error.message || 'Error Occured while retrieving blog information'})
        res.status(500).json({message:error.message || 'Error Occured while retrieving blog information'})
    })
})


// update user

// router.put("/:id", async(req,res)=>{

//     if ( req.body. === req.params.id){

//         if (req.body.password){
//             try{
//                 const salt = await bcrypt.genSalt(10);
//                 req.body.password = await bcrypt.hash(req.body.password,salt)

//             }catch(err){
//                 return res.status(500).json(err)

//             }
//         }
//         try{
//             const user = await User.findByIdAndUpdate(req.params.id,{
//                 $set:req.body,
//             });
//             res.status(200).json("Account has been updated")
//         }catch(err){
//             return res.status(500).json(err)
//         }

//     }else{
//         return res.status(403).json("you can only update your account!!")
//     }
// })
//delete user

// router.delete("/:id", async(req,res)=>{

//     if ( req.body.userId === req.params.id||req.body.isAdmin){

    
//         try{
//             const user = await User.findByIdAndDelete(req.params.id,{
//                 $set:req.body,
//             });
//             res.status(200).json("Account has been deleted")
//         }catch(err){
//             return res.status(500).json(err)
//         }

//     }else{
//         return res.status(403).json("you can only delete your account!!")
//     }
// })
// get user

// router.get("/:id", async(req,res)=>{
//     try{

//         const user = await User.findById(req.params.id);
//         const{password,updatedAt, ...other} =user._doc
//         res.status(200).json(other);

//     }catch{
//         res.status(500).json(err)
//     }
// })
//follow user

// router.put("/:id/follow", async(req,res)=>{

//     if (req.body.userId !== req.params.id){
//         try{
//             const user = await User.findById(req.params.id);
//             const currentUser =await User.findById(req.body.userId);
//             if(!user.followers.includes(req.body.userId)){
//                 await user.updateOne ({$push: {followers: req.body.userId}});
//                 await currentUser.updateOne({$push: {followings: req.body.id}});
//                 res.status(200).json("User has been followed")
//             }else{
//                 res.status(403).json("you already follow this user")
//             }
            
//         }catch(err){
//             res.status(500).json(err);
//         }
// }else
// res.status(403).json("you can not follow yourself!")
// })

module.exports =router
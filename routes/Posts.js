const router = require("express").Router();
const { application } = require("express");
// const Post = require ("../models/Post");

const requireAuth = require("../middleware/authMiddleware");

const blogDb = require("../models/Post");

//create a post
router. post("/",  async(req,res)=>{
      const newpost = new blogDb ({

            title:req.body.title,
            body:req.body.body,
            author:req.body.author

      })
      try{
            const savepost = await newpost.save( );

            res.status(200).json(savepost)

      }catch(err){
          res.status(500).json(err)
      }
})
//  to retrieve all post from the Database
router.get("/",(req,res) => {
      blogDb.find()
      .then((blogs)=>{
          res.status(202).send(blogs);
      })
      .catch((error)=>{
          // res.status(500).send({message:error.message || 'Error Occured while retrieving blog information'})
          res.status(500).json({message:error.message || 'Error Occured while retrieving blog information'})
      })
  })

  //get specific blog by providing id.
router.get("/:id", async(req,res)=>{
      try{
            const post =await blogDb.findById(req.params.id)
            res.status(201).json(post)

      }catch(err){
            res.status(500).json(err)

      }
})

//update a post by providing id
router.put("/:id", async(req,res)=>{
      if (!req.body){
            return res
            .status(400)
            .send({message: "No content to update, point the correct blog"})
        }
        const id = req.params.id;
        blogDb.findByIdAndUpdate(id, req.body, {userFindAndModify:false})
        .then((data)=>{
            blogDb.findById(id)
                .then((data)=>{
                    if (!data){
                        res.status(404).send({message: "No content to update"});
                    }
                    else {
                        res.status(202).send({
                            title:data.title,
                            body:data.body,
                            author:data.author
                        })
                    }
        })
        .catch((error)=>{
            res.status(404).send({message: "No content to update"});
        })
        })
        .catch((err)=>{
            res.status(400).send({message: "Not blog found with the provided ID"})
        })
})


// comment on post

router.put("/:id/comment",async(req,res)=>{
      var newComment = req.body.newCom;
    console.log(req.params.id);
    // console.log(newComment);
blogDb.findOneAndUpdate(
   { _id: req.params.id }, 
   { $push: { Comment: newComment  } },
  function (error, success) {
        if (error) {
        } else {
            // console.log(success);
            res.status(201).send({message: `comment has been committed to the blog!!`})
        }
    });
})


//delete specific posts

router.delete("/:id", async(req,res)=>{

      const id = req.params.id;
    blogDb.findByIdAndDelete(id)
    .then((data)=>{
        if(!data){
            res.status(403).send({mesage: `Content to delete already doesn't exist`})
        }
        else {
            res.status(202).send({
                message: 'Post deleted Successfuly!!'
            })
        }
    })
    .catch((error) =>{
        res.status(500).send({
            message: `Error occured while deleting the blog`
        });
    });


})      



module.exports = router;
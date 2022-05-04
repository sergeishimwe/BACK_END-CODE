const router = require("express").Router();
const res = require("express/lib/response");
const Messagedb = require("../models/message");
// const message = require ("../models/message");

//create and save message
router. post("/",  async(req,res)=>{
      const newMessage = new Messagedb ({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            message:req.body.message,
            })
      try{
            const savemessage = await newMessage.save( );
             console.log(savemessage)

            res.status(200).json(savemessage)

      }catch(err){
          res.status(500).json(err)
      }
})

//Get all messages

router.get("/",(req,res) => {
      Messagedb.find()
      .then((messages)=>{
          res.status(202).send(messages);
      })
      .catch((error)=>{
          // res.status(500).send({message:error.message || 'Error Occured while retrieving blog information'})
          res.status(500).json({message:error.message || 'Error Occured while retrieving blog information'})
      })
  })

  //get specific messsage by providing id.
router.get("/:id",async(req,res)=>{
      try{
            const Message =await Messagedb.findById(req.params.id)
            res.status(201).json(Message)

      }catch(err){
            res.status(500).json(err)

      }
})

/
//delete a message
router.delete("/:id", async(req,res)=>{

      const id = req.params.id;
    Messagedb.findByIdAndDelete(id)
    .then((data)=>{
        if(!data){
            res.status(403).send({mesage: `Content to delete already doesn't exist`})
        }
        else {
            res.status(202).send({
                message: 'Messages deleted Successfuly!!'
            })
        }
    })
    .catch((error) =>{
        res.status(500).send({
            message: `Error occured while deleting the message`
        });
    });

})

module.exports = router;
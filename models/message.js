const mongoose = require("mongoose");


const msgSchema = new mongoose.Schema({

      name:{
            type:String,
            
      },
      email:{
            type:String,
            
      },
      phone:{
            type:String,
      
      },
      message:{
            type:String,
            
      },
      
},
{timestamps:true}
)




const Messagedb = mongoose.model("message", msgSchema);

module.exports = Messagedb;
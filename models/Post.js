const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({

      title:{
            type:String,
            required:true
      },
      img:{
            type:String,
            default:""
      },
      likes:{
            type:Array,
            default:[]
      },
      body:{
            type:String,
            
      },
      author: String,

      Comment:{

            type:Array,
            default:[],
             
      },

},
{timestamps:true}
)


const blogDb = mongoose.model("Post",postSchema);

module.exports = blogDb;
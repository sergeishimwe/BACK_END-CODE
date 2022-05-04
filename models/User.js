const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
      username:{
            type:String,
            required:true,
            min:3,
            max:20,
            unique:true
      },
      email:{
            type:String,
            required:true,
            max:50,
            unique:true
      },
      password:{
            type:String,
            required:true,
            min:6,
      },
     profilepicture:{
            type:String,
            default:""
      },
      coverpicture:{
            type:String,
            default:""
      },
//      followers:{
//             type:Array,
//             default:[]
//       },
//       followings:{
//             type:Array,
//             default:[]
//       },
      isAdmin:{
            type:Boolean,
            default:false
      },
      // descr:{
      //       type:String,
      //       max:50
      // },
      // city:{
      //       type:String,
      //       max:50
      // },
      // form:{
      //       type:String,
      //       max:50
      // },
      // relationship:{
      //       type:Number,
      //       enum:[1,2,3]
      // },
},
{timestamps:true}
)

userSchema.pre('save', async function ( next){
      // console.log(`new useer about to be created and saved ${this}`); 
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
      next();
  })

  userSchema.statics.login = async function (email, password){
      const user = await this.findOne({email:email});
      if (user){
          // auth will hold truthy or falsy
          const auth = await bcrypt.compare(password, user.password);
          if (auth) {
              return user
          } throw Error("Incorrect password");
      }
      throw Error ("Incorrect Email");
  }

const userDb = mongoose.model("User",userSchema)
module.exports = userDb;
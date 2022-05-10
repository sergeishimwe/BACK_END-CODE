const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();

// mongoose.connect(
//   process.env.MONGO_URL,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   () => {
//     console.log("Connected to mongoDB");
//   }
// );

// dotenv.config({ path: path.resolve("./config.env") });

var DB_URL;

if (process.env.NODE_ENV == "production") {
  DB_URL = process.env.MONGO_URL;
  console.log(DB_URL);
} else if (process.env.NODE_ENV == "test") {
  DB_URL = process.env.MONGO_URL_TEST;
  console.log(DB_URL);
} else {
  DB_URL = process.env.MONGO_URL_DEFAULT;
  console.log(DB_URL);
}
    const url = process.env.MONGO_URL;
        
const connectDataBase = async () => {
  try {
    // console.log(url)
    const con = await mongoose.connect(
     url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    if (process.env.NODE_ENV == "production") {
    console.log(`mongoDB connected:${con.connection.host} and is running in
            the ${process.env.NODE_ENV.toLocaleUpperCase()} MODE`);
    } else if (process.env.NODE_ENV == "test") {
      console.log(`mongoDB connected:${con.connection.host} and is running in
         the ${process.env.NODE_ENV.toLocaleUpperCase()} MODE`);
    } else {
      console.log(`mongoDB connected:${con.connection.host} and is running in
            the DEFAULT MODE`);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDataBase;

var PORT = process.env.PORT || 8800;
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/Posts");
const msgRoute = require("./routes/messages");
var cors = require('cors');



// swagger deps
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");




//setup-swagger

const swaggerDefinition = yaml.load("./swagger.yaml");
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition))


app.use(cors());

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
   },()=>{
       console.log("Connected to mongoDB")
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"))

app.use("/api/users",userRoute );
app.use("/api/auth",authRoute );
app.use("/api/posts", postRoute );
app.use("/api/messages", msgRoute );

module.exports = app;

app.listen(8800,()=>{
     console.log("Server is running smothly!!") 
})
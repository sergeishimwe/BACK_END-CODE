

const express = require("express");

const app = express();
const helmet = require("helmet");
const path = require("path");

const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/Posts");
const msgRoute = require("./routes/messages");
const connectDataBase = require("./database/connection")
var cors = require('cors');
require("dotenv").config();

// swagger deps
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");

connectDataBase();
//setup-swagger

const swaggerDefinition = yaml.load("./swagger.yaml");
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition))

app.use(cors());
const PORT = process.env.PORT || 8800;

app.use(express.json());
app.use(helmet());
app.use(morgan("common"))

app.use("/api/users",userRoute );
app.use("/api/auth",authRoute );
app.use("/api/posts", postRoute );
app.use("/api/messages", msgRoute );

module.exports = app;

app.listen(PORT,()=>{
     console.log(`Server is running on http://localhost:${PORT}`)
})
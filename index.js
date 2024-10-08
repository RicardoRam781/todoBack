const express = require("express");
const dotenv = require("dotenv");
const router = require("./src/router/router");
const logger = require('morgan');
const cors = require("cors")
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(cors())
app.use(express.json())
app.use("",router);

app.listen(port, () => {
    console.log(`Listeting in http://localhost:${port}`)
   console.log("PROD URL",process?.env?.DEPLOYMENT_UR)
})
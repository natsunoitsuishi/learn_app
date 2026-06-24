require('module-alias/register');
require('dotenv').config();


const express = require("express");
const cors = require('cors');

const router = require("./routes/router");

const app = express();

app.use(cors());
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
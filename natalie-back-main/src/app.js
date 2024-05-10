const express = require("express")
const mongoose = require ("mongoose")
const app = express()
const indexRoutes = require("./routes/index")
const cors = require("cors")
const morgan = require("morgan")

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use("/", indexRoutes)

module.exports = app
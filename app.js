require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/auth')

const app = express()
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

app.use(express.json())

app.use("/", auth)

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.au3upgi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    app.listen(3000)
    console.log("Conectou ao banco")
}).catch((err)=>{console.log("Não subiu o servidor" + err)})
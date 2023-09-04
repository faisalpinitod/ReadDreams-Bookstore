const express = require("express");
const { connection } = require('./config/db')
require('dotenv').config()

const port = process.env.port
const app = express()


app.get("/",(req,res)=>{
    res.send("Welcome to the ReadDreams!")
})


app.listen(port,async()=>{
    try{
        await connection
        console.log({Message:"The DB is connected"})
    }catch(err){
        console.log({message:"Something went wrong with the DB connection!"})
        console.log(err)
    }
    console.log({Message:`The server is listning to port ${port}.`})
})

const express = require('express')
const app = express()
const port = 4200
require("dotenv").config()
const initConnection=require("./DB/Connection/connection")
const {userRouter}=require("./Routes/index")

app.use(express.json())
app.use(userRouter)

initConnection()

app.get('/', (req, res) => res.send('Hello World!'))
const server= app.listen(port, () => console.log(`Example app listening on port ${port}!`))


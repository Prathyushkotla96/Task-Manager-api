const express=require('express')
require('./db/mongoose')
const User=require('./models/user')
const Task=require('./models/tasks')
const UserRouter=require('./routers/user')
const TaskRouter=require('./routers/task')
const app= express()
const port=process.env.PORT || 3000



app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)

app.listen(port,()=>{
    console.log('server is up on '+ port)
})
const mongoose=require('mongoose')


const tasks=mongoose.model('Tasks',{
    description:{
        type:String,
        trim:true,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})

module.exports=tasks
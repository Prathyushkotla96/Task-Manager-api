const express=require('express')
const User=require('../models/user')
const auth=require('../middleware/auth')
const router=new express.Router()


router.post('/users',async (req,res)=>{
    const user =new User(req.body)

    try {
        const token=await user.generateAuthToken()
        await user.save()
        res.send({user,token})
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
        
    }
})

router.get('/users/me',auth,async (req,res)=>{
    // try {
    //     const users=await User.find({})
    //     res.send(users)
    // } catch (error) {
    //     res.status(400).send(error)
        
    // }
    res.send(req.user)
})

router.patch('/users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {


        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        // if (!user) {
        //     return res.status(404).send()
        // }

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth,async (req,res)=>{
    try {
        // const user=await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)   
    }
})

router.post('/users/login',async (req,res)=>{
    try {
        const user=await User.findByCrendentials(req.body.email, req.body.password)
        const token=await user.generateAuthToken()
        res.send({user,token})
        res.send(user)
    } catch (error) {
        res.status(400).send()
        
    }


})

router.post('/users/logout',auth,async(req,res)=>{
    try {
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token !== req.token

        })
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
        
    }
})

router.post('/users/logoutall',auth,async(req,res)=>{
    try {
        req.user.tokens=[]
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
        
    }
})

module.exports=router


const User = require('../models/User')
const Note = require('../models/note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')



const getAllusers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if(!users?.length){
        return res.status(400).json({message: 'No users found'})
    }
    res.json(users)
})


const createNewUser = asyncHandler(async (req, res) => {
    const {name, phone, email, password, roles} = req.body
    
    //Confirm data
    if(!name || !email || !phone || !password || Array.isArray(roles) || !roles.length){
       return res.status(400) .json({message: 'All fields are required'})
    }

    //check for duplicate
    const duplicate = await User.findOne({email}).lean().exec()

    if(duplicate){
        return res.status(409).json({message: 'Duplicate email'})
    }

    //Hash password
    const hashedPwd = await bcrypt.hash(password, 10) //salt rounds

    const userObject = {name, phone, email, "password": hashedPwd, roles}

    //create and store new user
    const user = await User.create(userObject)

    if(user){
        res.status(201).json({message: `New user ${email} created`})
    } else{
        res.status(400).json({message: 'Invalid email data received'})
    }
})


const updateUser = asyncHandler(async (req, res) => {
    const {id, name, email, phone, password, roles, active} = req.body
    
    //Confirm data
    if(!id || !name || !email || !phone || !password || Array.isArray(roles) || !roles.length || typeof active !== 'boolean'){
       return res.status(400) .json({message: 'All fields are required'})
    }    

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({message: 'User not found'})
    }

    //check for duplicate
    const duplicate = await User.findOne({email}).lean().exec()
    //Allow updates to the original user
    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({message: 'Duplicate email'})
    }

    user.name = name
    user.roles = roles
    user.active = active

    if(Password){
        //hash password
        user.password = await bcrypt.hash(password, 10) //salt rounds
    }

    const updatedUser = await user.save()

    res.json({message: `User ${updatedUser.email} updated`})
})





const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.body  

    if(!id){
        return res.status(400).json({message: 'User ID required'})
    }

    const note = await Note.findOne({user: id}).lean().exec()
    if(note) {
        return res.status(400).json({message: 'User has assigned notes'})
    }


    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({message: 'User not found'})
    }

    const result = await user.deleteOne()

    const reply = `User name ${result.name} with ID ${result._id} deleted`

    res.json(reply)
    
})

module.exports = {
    getAllusers,
    createNewUser,
    updateUser,
    deleteUser
}
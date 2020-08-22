const UsersController = {}
const User = require('../models/User');

UsersController.getUsers = async (req,res) => {
    const users = await User.find();
    res.json(users)
}

UsersController.createUser = (req,res) => { 
    res.json({message: 'POST Request'})
}

UsersController.getUser = (req,res) => res.json({message: 'GET Request'})

UsersController.updateUser = (req,res) => res.json({message: 'PUT Request'})

UsersController.deleteUser = (req,res) => res.json({message: 'DELETE Request'})

module.exports = UsersController
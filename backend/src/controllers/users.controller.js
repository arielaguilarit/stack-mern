const UsersController = {}
const User = require('../models/User');

UsersController.getUsers = async (req,res) => {
    const users = await User.find();
    res.json(users)
}

UsersController.createUser = async (req,res) => { 
    const { username } = req.body;
    const newUser = new User ({
        username: username
    });
    await newUser.save();
    res.json({message: 'User Saved'})
}

UsersController.getUser = async (req,res) => {
    const user = await User.findById(req.params.id);
    res.json(user)
}

UsersController.updateUser = async (req,res) => {
    const { username } = req.body;
    await User.findOneAndUpdate(req.params.id, {
       username: username
    });
    res.json({message: 'User Edit'})
}

UsersController.deleteUser = async (req,res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({message: 'User Delete'})
}

module.exports = UsersController
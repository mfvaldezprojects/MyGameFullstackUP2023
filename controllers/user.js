require('mongoose');
const User = require ('../models/user');

const addUser = async (username, password, mail, preferred_name, name, lastname, isActive, role) => {
    let isUser = await User.findOne({ mail: mail });
    console.log(isUser);
    if(!isUser) {
        const encryptedPass = require('crypto')
            .createHash('sha256')
            .update(password)
            .digest('hex');

        const user = new User(
            {
                username: username,
                password: encryptedPass,
                mail: mail,
                preferred_name: preferred_name, 
                name: name, 
                lastname: lastname, 
                isActive: isActive,
                role: role,
            }
        );
        try {
            let res = await user.save();
            console.log("Nuevo usuario creado:");
            console.log(res);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } 
    }
    else{
        return false;
    }
}

 
const getAllUsers = async (limit, offset) => {
    console.log("getallusers")
    console.log(limit)
    console.log(User)
    const users = await User.find({}).limit(limit).skip(offset);
    console.log(users)
    return users;
}

const getUser = async (id) => {
    const user = await User.findById(id);
    //await User.findOne({ _id:id });
    return user;
}

const editUser = async (user) => {
    const result = await User.findbyIdAndUpdate(user._id, user, {new:true});
    return result;
}


const editRoles = async (roles, id) => {
    const result = await User.findbyIdAndUpdate(id, {$set:{ roles:roles }}, {new:true});
    return result;
}


const deleteUser = async(id) => {
    const result = await User.findByIdAndDelete(id);
    return result;
}

module.exports = { addUser, getAllUsers, getUser, editUser, editRoles, deleteUser };
require('mongoose');
const CustomCharacter = require('../models/customCharacter');

const addCustomCharacter = async (name, type, gender, age, image, item1, item2, item3, username) => {    
    let isCustomCharacter = await CustomCharacter.findOne({
        name: name
    });
    if (!isCustomCharacter) {
        const customCharacter = await new CustomCharacter({            
            name: name,
            username: username,
            type: type,
            gender: gender,
            age: age,
            image: image,            
            item1: item1,
            item2: item2,
            item3: item3,                      
        });
        try {
            let res = await customCharacter.save();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } else {
        return false;
    }
}

const getAllCustomCharacters = async (limit, offset) => {
    const customCharacters = await CustomCharacter.find({}).limit(limit).skip(offset);
    return customCharacters;
}

const getAllCustomCharactersByUser = async (limit, offset, user) => {
    const customCharacters = await CustomCharacter.find({username: user}).limit(limit).skip(offset);
    return customCharacters;
}

const getCustomCharacter = async (id) => {
    const customCharacter = await CustomCharacter.findById(id);
    //await character.findOne({ _id:id });
    return customCharacter;
}

module.exports = {
    addCustomCharacter,
    getAllCustomCharacters,
    getAllCustomCharactersByUser,
    getCustomCharacter
};
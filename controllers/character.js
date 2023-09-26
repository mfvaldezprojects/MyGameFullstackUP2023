require('mongoose');
const Character = require ('../models/character');

const addCharacter = async (name, type, gender, age, image) => {
    let isCharacter = await Character.findOne({ name: name });
    console.log(isCharacter);
    if(!isCharacter) {
        const character = new Character(
            {
                name: name, 
                type: type, 
                gender: gender,
                age: age,
                image:image
            }
        );
        try {
            let res = await character.save();
            console.log("Nuevo personaje creado:");
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

 
const getAllCharacters = async (limit, offset) => {
    const characters = await Character.find({});
    return characters;
}

const getCharacter = async (id) => {
    const character = await Character.findById(id);
    //await character.findOne({ _id:id });
    return character;
}

module.exports = { addCharacter, getAllCharacters, getCharacter };
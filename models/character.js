const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema ({
    name:{
        type: String,
        required: true,
        index: { unique: true, dropDups: true}
    },
    type: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, 
//Manejo el objeto respecto del documento de la coleccion
{ timestamps: true } ).set('toJSON', {
    transform : (document, object) => {
        object.id = document.id;
        delete object._id;
    }
});

const Character = mongoose.model('character', characterSchema, 'characters');
module.exports = Character;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentSchema = new Schema ({

    item:{
        type: String,
        required: true,
        index: { unique: true, dropDups: true}
    },
    category: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
        index: { unique: true, dropDups: true }
    },
    accesories: {
        type: String,
        required: false
    },
    traits: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    }
}, 
//Manejo el objeto respecto del documento de la coleccion
{ timestamps: true } ).set('toJSON', {
    transform : (document, object) => {
        object.id = document.id;
        delete object._id;
    }
});

const Equipment = mongoose.model('equipment', equipmentSchema, 'equipments');
module.exports = Equipment;
const mongoose = require('mongoose');
//const dbConection = require('../config');
const Schema = mongoose.Schema;

const userSchema = new Schema ({

    username:{
        type: String,
        required: true,
        index: { unique: true, dropDups: true}
    },
    password: {
        type: Number,
        required: true,
    },
    mail: {
        type: String,
        required: true,
        index: { unique: true, dropDups: true }
    },
    preferred_name: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    role: {
        type: Array,
        required: true,
        default: ['user']
    }
}, 
//Manejo el objeto respecto del documento de la coleccion
{ timestamps: true } ).set('toJSON', {
    transform : (document, object) => {
        object.id = document.id;
        delete object._id;
        delete object.password;
    }
});

const User = mongoose.model('user', userSchema, 'users');
module.exports = User;
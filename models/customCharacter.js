const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const item1Schema = new Schema({
            item: {
                type: String,
                required: true,
                index: {
                    unique: true,
                    dropDups: true
                }
            },
            category: {
                type: String,
                required: true,
            },
            color: {
                type: String,
                required: true,
                index: {
                    unique: true,
                    dropDups: true
                }
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
);

const Item1 = mongoose.model('Item1', item1Schema);

const item2Schema = new Schema({
        item: {
            type: String,
            required: true,
            index: {
                unique: true,
                dropDups: true
            }
        },
        category: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
            index: {
                unique: true,
                dropDups: true
            }
        },        
        image: {
            type: String,
            required: false
        }
    },
);

const Item2 = mongoose.model('Item2', item2Schema);

const item3Schema = new Schema({
        item: {
            type: String,
            required: true,
            index: {
                unique: true,
                dropDups: true
            }
        },
        category: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
            index: {
                unique: true,
                dropDups: true
            }
        },
        image: {
            type: String,
            required: false
        }
    },
);

const Item3 = mongoose.model('Item3', item3Schema); 

const customcharacterSchema = new Schema({
        name: {
            type: String,
            required: true,
            index: {
                unique: true,
                dropDups: true
            }
        },
        username: {
            type: String,
            required: true
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
        },
        item1: {
               type: item1Schema,
               required: true
        },
        item2: {
            type: item2Schema,
            required: true
        },
        item3: {
            type: item3Schema,
            required: true
        },               
    },
    //Manejo el objeto respecto del documento de la coleccion
    {
        timestamps: true
    }).set('toJSON', {
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
    }
});

const CustomCharacter = mongoose.model('customCharacter', customcharacterSchema, 'customCharacters');
module.exports = CustomCharacter;
require('mongoose');
const Equipment = require ('../models/equipment');

const addEquipment = async (item, category, color, accesories, traits, image) => {
    let isEquipment = await Equipment.findOne({ item: item });
    console.log(isEquipment);
    if(!isEquipment) {
        const equipment = new Equipment(
            {
                item: item, 
                category: category, 
                color: color,
                accesories: accesories,
                traits: traits,
                image: image
            }
        );
        
        let res = await equipment.save();
        console.log("Nueva vestimenta creada:");
        console.log(res);
        return { res };
    }
    else {
        return false;
    }
}

 
const getAllEquipments = async (limit, offset) => {
    const equipments = await Equipment.find({}).limit(limit).skip(offset);
    return equipments;
}

const getEquipment = async (id) => {
    const equipment = await Equipment.findById(id);
    //await equipment.findOne({ _id:id });
    return equipment;
}

module.exports = { addEquipment, getAllEquipments, getEquipment };
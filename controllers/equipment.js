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
        try {
            let res = await equipment.save();
            console.log("Nueva vestimenta creada:");
            console.log(res);
            return true;
        } catch (error) {
            console.log(errpr);
            return false;
        }
    }
    else {
        return false;
    }
}

 
const getAllEquipments = async () => {
    const equipments = await Equipment.find({});
    return equipments;
}

const getEquipment = async (id) => {
    const equipment = await Equipment.findById(id);
    //await equipment.findOne({ _id:id });
    return equipment;
}

module.exports = { addEquipment, getAllEquipments, getEquipment };
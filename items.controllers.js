const mongoose = require('mongoose');
const uuid = require('uuid');
const Items = mongoose.model('Items', {userId: String, nombre:String, itemId:String, cantitdad:number, precio:number});


function registerItem (userId,nombre,cantitdad, precio){
    return new Promise(async(resolve,reject) =>{
        if((nombre=='')||(/\s/.test(nombre))){
            reject(new Error('el nombre esta vacio o contiene espacios'));
        }
        let exist = await Items.findOne({userId:userId, nombre: nombre}).exec();
        if(exist){
            reject(new Error('el item a registrar ya existe'));
        }
        let itemId = uuid.v4();
        const item = new Items({userId: userId, nombre: nombre, itemId: itemId, cantitdad: cantitdad, precio: precio});
        let response = await item.save();
        resolve(response);
    });
};

function updateItem (itemId,precio)

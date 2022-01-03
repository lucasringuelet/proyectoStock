const mongoose = require('mongoose');

const Items = mongoose.model('Items', { userId: String, itemId: String, nombre: String, cantitdad: String, precio: String });


function registerItem(userId, itemId, nombre, cantitdad, precio) {
    return new Promise(async(resolve, reject) => {
        if ((nombre == '') || (/\s/.test(nombre))) {
            reject(new Error('el nombre esta vacio o contiene espacios'));
        }
        let exist = await Items.findOne({ userId: userId, nombre: nombre }).exec();
        if (exist) {
            reject(new Error('el item a registrar ya existe'));
        }

        const item = new Items({ userId: userId, nombre: nombre, itemId: itemId, cantitdad: cantitdad, precio: precio });
        let response = await item.save();
        resolve(response);
    });
};

exports.registerItem = registerItem;
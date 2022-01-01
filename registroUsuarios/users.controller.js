const uuid = require('uuid');
const mongoose = require('mongoose');
const crypto = require('crypto-js');

const UserModel = mongoose.model('UserModel', {userName: String,mail: String, password: String, userId: String});

function registerUser (userName,mail,password){
    return new Promise(async (resolve,reject) => {
        if((userName=='')||(password=='')||(mail == '')||(/\s/.test(mail))||(/\s/.test(userName))||(/\s/.test(password))){
            reject(new Error ('el nombre o contraseña no pueden estar vacios o tener espacios en blanco'))
        }
        let result = await UserModel.findOne({userName: userName}).exec();
        if(result){
            reject(new Error ('el nombre ya existe'));
        }else{
            let passwordCrypto = crypto.PBKDF2(password,'salt',100000,64,'sha256',(err,passwordEncrypted) =>{
            return passwordEncrypted;
        });
        let userId = uuid.v4();
        const user = new UserModel({ userName: userName, mail: mail, password: passwordCrypto, userId: userId });
        let response = await user.save();
        resolve(response);
    }
    });
    
    
};

function authenticateUser (userName,password){
    return new Promise(async (resolve,reject) =>{
        let result = await UserModel.findOne({userName : userName}).exec();
        
        if(!result){
            reject(new Error('incorrect username'));
        }else{
            let passwordCrypto = crypto.PBKDF2(password, 'salt', 100000, 64, 'sha256', (err, passwordEncrypted) => {
                return passwordEncrypted;
            });
            console.log(result.password);
            console.log(passwordCrypto.toString());
            if(passwordCrypto.toString() === result.password){
                
                resolve(result);
            }else{
                reject(new Error('incorrect password'));
            }
        }
    });
};

exports.registerUser=registerUser;
exports.authenticateUser=authenticateUser;
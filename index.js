const express = require('express');
const app = express();
const port = 3000;
require('./database');
const user = require('./users.controller');
const item = require('./public/items.controllers');
const bodyparser = require('body-parser');
const path = require('path');


app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});



app.post('/register', (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;
    let mail = req.body.mail;
    const ok = async(userName, mail, password) => {
        var result = await user.registerUser(userName, mail, password)
        res.send(result);
        return;
    };
    ok(userName, mail, password);

});

app.post('/login', (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;
    const ok = async(userName, password) => {
        var result = await user.authenticateUser(userName, password)
        res.status(200).json({ userId: result.userId })
        return;
    };
    ok(userName, password);
});

app.put('/modif', (req, res) => {
    //modificacion de productos
});

app.delete('/delete/:userId', (req, res) => {

});


//itemssss
app.get('/scanItem', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/scann-register.html'));
});

app.post('/item/register', (req, res) => {
    var respuesta = async() => {
        var response = await item.registerItem(req.body.userId, req.body.itemId, req.body.nombre, req.body.cantidad, req.body.precio);
        res.send(response);
    };
    respuesta();

});




app.listen(port, () => {
    console.log('Server started on port 3000');
});
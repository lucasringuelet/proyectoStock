const mongoose = require('mongoose');

const password = 'Lucas156611703';
const databaseName = 'db';

mongoose.connect(`mongodb+srv://lucas:${password}@cluster0.ow3ox.mongodb.net/${databaseName}?retryWrites=true&w=majority`);


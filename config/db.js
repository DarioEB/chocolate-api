const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const connection = async () => {
    try {
        await mongoose.connect( process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base datos conectada');
    } catch (error) {
        console.log('Error al conectar la base de datos');
        console.log(error);
        process.exit(1);
    }
}

module.exports = connection;
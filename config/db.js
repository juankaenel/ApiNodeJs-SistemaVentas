const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Conexión a bd
dotenv.config()
const dbUrl = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.uy4r0.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`; // url de conexion

mongoose.connect(dbUrl, { useNewUrlParser:true, useUnifiedTopology: true })
    .then(()=> console.log('Base de datos conectada'))
    .catch(e => console.log(e))

module.exports = mongoose;
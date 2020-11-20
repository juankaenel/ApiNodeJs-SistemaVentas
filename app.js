const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('./config/db'); //Importando la configuracion de conexion a la BD

//rutas
const users = require('../Api/routes/users.js')

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(logger('dev'));
app.use(express.urlencoded({extended:true})); // Agregar body parser   
app.use(express.json());
app.use(methodOverride());
/* Con bodyParser permitimos que pueda parsear JSON, methodOverride() nos permite implementar y personalizar métodos HTTP. */

// registramos las rutas
app.get('/', (req, res) => {
    res.json({"tutorial" : "Construyendo una API REST con NodeJS"});
});
// publicas
app.use('/users', users)




app.listen(app.get('port'), () => {
    console.log(`Server corriendo en el puerto ${app.get('port')}`);
});
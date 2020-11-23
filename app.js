import express  from 'express';
import morgan from 'morgan';
import methodOverride from 'method-override';
import mongoose from './config/db'; //Importando la configuracion de conexion a la BD
import cors from 'cors';
import path from 'path';
//rutas
import users from '../Api/routes/users.js';

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true})); // Agregar body parser   
app.use(express.static(path.join(__dirname,'public')));
app.use(methodOverride());
app.use(cors());
/* Con bodyParser permitimos que pueda parsear JSON, methodOverride() nos permite implementar y personalizar métodos HTTP. */

// registramos las rutas
app.get('/', (req, res) => {
    res.json({"tutorial" : "importruyendo una API REST con NodeJS"});
});
// publicas
app.use('/users', users)

app.listen(app.get('port'), () => {
    console.log(`Server corriendo en el puerto ${app.get('port')}`);
});
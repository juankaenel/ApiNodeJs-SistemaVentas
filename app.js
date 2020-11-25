import express  from 'express';
import morgan from 'morgan';
import mongoose from './config/db'; //Importando la configuracion de conexion a la BD
import cors from 'cors';
import path from 'path';
//rutas
import router from './routes'; // routes/index.js

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true})); // Agregar body parser   
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
/* Con bodyParser permitimos que pueda parsear JSON, methodOverride() nos permite implementar y personalizar métodos HTTP. */

// registramos las rutas
app.use('/api',router);

app.listen(app.get('port'), () => {
    console.log(`Server corriendo en el puerto ${app.get('port')}`);
});
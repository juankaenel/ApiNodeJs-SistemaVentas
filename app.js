// para trabajar solo con importaciones en el package.json debemos agregar "type" : "module"
import express from 'express';
import router from './routes/index.js'
import morgan from 'morgan';
import methodOverride from 'method-override';
import mongoose from 'mongoose';

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true})); // Agregar body parser   
app.use(express.json());
app.use(methodOverride());
/* Con bodyParser permitimos que pueda parsear JSON, methodOverride() nos permite implementar y personalizar métodos HTTP. */

// routes
app.use('/', router);

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
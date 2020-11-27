/* Modelo ingreso */
import mongoose, {Schema} from 'mongoose';

const revenueSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'user', // referencia al modelo user -> quien registro el ingreso
        required: true,
    },
    person:{
        type: Schema.ObjectId,
        ref: 'person', // referencia al modelo persona -> si fue un cliente o proveedor
        required: true,
    },
    comprobantType: {
        type: String,
        maxlength:20,
        required:true,
    },
    comprobantNumber: {
        type: String,
        maxlength: 10,
        required: true,
    },
    tax:{ // impuesto
        type: Number,
        required: true,
    },
    total:{
        type: Number,
        required: true
    }, // relación uno a pocos con detalles , una venta tiene pocos detalles
    details:[{ // una compra tiene varios articulos -> esto es un una propiedad que contiene un modelo embebido. Se utiliza en una relación 1 a pocas 
        _id:{ // id article
            type:String,
            required: true
        },
        name:{ // name article
            type: String,
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
        },
        price: {
            type:Number,
            required: true,
        }
    }]
    ,
    state:{
        type: Number,
        default:1,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Revenue = mongoose.model('revenue',revenueSchema);

export default Revenue;
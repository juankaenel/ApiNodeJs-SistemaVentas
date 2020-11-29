/* Modelo ingreso */
import mongoose, {Schema} from 'mongoose';

const saleSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'user', // referencia al modelo user -> quien registra la venta
        required: true,
    },
    person:{
        type: Schema.ObjectId,
        ref: 'person', // referencia al modelo persona
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
    voucherSeries:{ // serie de comprobante
        type:String,
        maxlength: 7,
    }
    ,
    tax:{ // impuesto
        type: Number,
        required: true,
    },
    total:{
        type: Number,
        required: true
    }, // dentro de una venta puedo tener varios articulos, eso los guardaré en detalles como un array, dentro del mismo irán los objetos de articulos
    details:[{ // una compra tiene varios articulos -> esto es un una propiedad que contiene un modelo embebido. Se utiliza en una relación 1 a pocas 
        _id:{ // id article
            type:String,
            required: true
        },
        article:{ // name article
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
        },
        discount:{
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

const Sale = mongoose.model('sale',saleSchema);

export default Sale;
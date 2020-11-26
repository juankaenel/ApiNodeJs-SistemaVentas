import mongoose, {Schema} from 'mongoose';

/* En esta collection almacenaré tanto a clientes como a proveedores donde se diferenciaran por el campo personType */
const personSchema = new Schema({
    personType: { // lo utilizo para diferenciar si es un cliente o un proveedor
        type: String, 
        maxlength: 20,
        required: true,
    },
    name: {
        type: String,
        maxlength: 30,
        required: true,
    },
    docType:{ // tipo de documento
        type: String,
        maxlength: 20,
    },
    docNumber:{ // número de documento
        type:String,
        maxlength: 20,
    },
    direction:{
        type:String,
        maxlength: 40,
    },
    phone:{
        type:String,
        maxlength: 30,
    },
    email:{
        type: String,
        maxlength: 30,
        unique:true,
    },
    state:{
        type: Number,
        default: 1,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Person = mongoose.model('person', personSchema, 'people') // people -> nombre de collection

export default Person;
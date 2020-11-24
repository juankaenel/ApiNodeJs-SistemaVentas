import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    role:{
        type: String,
        maxlength: 30,
        required: true
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
        required: true,
    },
    password:{
        type: String,
        maxlength: 64,
        required: true
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
// Antes de almacenar la contraseña en la base de datos la encriptamos con Bcrypt, esto es posible gracias al middleware de mongoose
/* userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password,saltRounds);
    next();
});
 */

const User = mongoose.model('user', userSchema, 'users') // users -> nombre de collection

export default User;

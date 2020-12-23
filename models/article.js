import mongoose, { Schema } from 'mongoose';

const articlesSchema = new Schema({
    category: {
        type: Schema.ObjectId,
        ref: 'category' // Referencia con el modelo category
    },
    code: {
        type: String,
        maxlength:64
    },
    name:{
        type: String,
        maxlength:50,
        unique:true,
        required:true
    },
    description:{
        type: String,
        maxlength: 255,
    },
    salePrice: {
        type:Number,
        required:true
    },
    stock:{
        type: Number,
        required:true
    },
    state:{
        type: Boolean,
        default: 1,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Article = mongoose.model('article',articlesSchema, 'articles');

export default Article;

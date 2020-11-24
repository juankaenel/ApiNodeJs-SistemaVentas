import mongoose, { Schema } from 'mongoose';

const articlesSchema = new Schema({
    category: {
        type: Schema.ObjectId,
        ref: 'category'
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
    descriptionn:{
        type: String,
        maxlength: 255,
    },
    salePrince: {
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

const Article = mongoose.model('articicles',articlesSchema);

export default Article;

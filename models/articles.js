const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articlesSchema = new Schema({
    codigo: {
        type: Number,
        trim: true,
        required: true,
    },
    nombre:{
        type: String,
        required: true,
    },
    stock:{
        type: Number,
        trim: true,
        required: true
    },
    descripción:{
        type: String,
        required: false,
    },
    estado:{
        type: Boolean,
        required: true,
    },
    /* imagen:{
        type: String,
        required: true,
    }, */
});


module.exports = mongoose.model('Articicles',articlesSchema,'articles')

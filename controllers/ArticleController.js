import models from '../models/index';
export default {
    add: async (req,res,next) => {
        try {
            const reg = await models.Article.create( req.body );
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    } ,
    query: async (req,res,next) => {
        try {
            const reg = await models.Article.findOne( {_id : req.query._id} )
            // poblamos con las categorias del articulo
            .populate('category',{nombre:1}) // en este caso llamo al nombre de la categoria que hace referencia a ese articulo;
            if (!reg) { // si no existe el arituclo
                res.status(404).send({
                    message: 'El artículo no existe!',
                }); 
            }
            else{ // si existe
                res.status(200).json(reg )
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    },
    queryCode: async (req,res,next) => { // cuando consutas un articulo por su código de barras desde el formulario 
        try {
            const reg = await models.Article.findOne( {code : req.query.code} )
            // poblamos con las categorias del articulo
            .populate('category',{nombre:1}) // en este caso llamo al nombre de la categoria que hace referencia a ese articulo;
            if (!reg) { // si no existe el arituclo
                res.status(404).send({
                    message: 'El artículo no existe!',
                }); 
            }
            else{ // si existe
                res.status(200).json(reg )
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    },
    list: async (req,res,next) => {
        try {
            let valor = req.query.valor; 
            const reg = await models.Article.find({ $or:[ {'name': new RegExp(valor, 'i')}, {'description': new RegExp(valor,'i')}] }, {createdAt:0})
            .populate('category',{nombre:1}) // llamo al nombre de la categoria que hace referencia a ese articulo
            .sort({'createdAt':-1}) 
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    },
    update: async (req,res,next) => {
        try {
            const reg = await models.Article.findByIdAndUpdate({_id:req.body._id}, {category: req.body.category, code: req.body.code,  name: req.body.name, description: req.body.description, salePrice: req.body.salePrice, stock: req.body.stock }); // primer parámetro la búsqueda, segundo los valores a cambiar en ese registro
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    },
    remove: async (req,res,next) => {
        try {
            const reg = await models.Article.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    },
    activate: async (req,res,next) => {
        try {
            const reg = await models.Article.findByIdAndUpdate({_id:req.body._id},{state:1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    },
    deactivate: async (req,res,next) => {
        try {
            const reg = await models.Article.findByIdAndUpdate({_id:req.body._id},{state:0});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    },
}

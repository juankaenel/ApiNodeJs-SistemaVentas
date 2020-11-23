import models from '../models/index';
export default {
    add: async (req,res,next) => {
        try {
            const reg = await models.Category.create( req.body );
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
            const reg = await models.Category.findOne( {_id : req.query._id} );
            if (!reg) { // si no existe la categoria
                res.status(404).send({
                    message: 'El registro no existe!',
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
            const reg = await models.Category.find({});
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
            const reg = await models.Category.findByIdAndUpdate({_id:req.body._id},{name: req.body.name, description: req.body.description }); // primer parámetro la búsqueda, segundo los valores a cambiar en ese registro
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
            const reg = await models.Category.findByIdAndDelete({_id:req.body._id});
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
            const reg = await models.Category.findByIdAndUpdate( {_id:req.body.id}, { state:1 });
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
            const reg = await models.Category.findByIdAndUpdate( {_id:req.body.id}, { state:0 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    },
}

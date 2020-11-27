import models from '../models/index';

export default {
    add: async (req,res,next) => {
        try {
            const reg = await models.Person.create( req.body );
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
            const reg = await models.Person.findOne( {_id : req.query._id} )
            if (!reg) { 
                res.status(404).send({
                    message: 'La persona que solicita no existe!',
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
    list: async (req,res,next) => { // lista tanto a clientes y proveedores
        try {
            let valor = req.query.valor; 
            const reg = await models.Person.find({ $or:[ {'name': new RegExp(valor, 'i')}, {'email': new RegExp(valor,'i')}] }, {createdAt:0})
            .sort({'createdAt':-1}) 
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    },
    listClient: async (req,res,next) => { // lista los clientes en base al tipo de persona
        try {
            let valor = req.query.valor; 
            const reg = await models.Person.find({ $or:[ {'name': new RegExp(valor, 'i')}, {'email': new RegExp(valor,'i')}], 'personType': 'Cliente' }, {createdAt:0})
            .sort({'createdAt':-1}) 
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    },
    listSuppliers: async (req,res,next) => { // lista los proveedores en base al tipo de persona
        try {
            let valor = req.query.valor; 
            const reg = await models.Person.find({ $or:[ {'name': new RegExp(valor, 'i')}, {'email': new RegExp(valor,'i')}], 'personType': 'Proveedor' }, {createdAt:0})
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
            const reg = await models.Person.findByIdAndUpdate({_id:req.body._id}, {personType: req.body.personType, name: req.body.name,  docType: req.body.docType, docNumber: req.body.docNumber, direction: req.body.direction, phone: req.body.phone, email: req.body.email}); // primer parámetro la búsqueda, segundo los valores a cambiar en ese registro
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
            const reg = await models.Person.findByIdAndDelete({_id:req.body._id});
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
            const reg = await models.Person.findByIdAndUpdate({_id:req.body._id},{state:1});
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
            const reg = await models.Person.findByIdAndUpdate({_id:req.body._id},{state:0});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    }
}

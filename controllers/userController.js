import models from '../models/index';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken'
import token from '../services/token'

export default {
    add: async (req,res,next) => {
        try {
            req.body.password = await bcryptjs.hash(req.body.password,10) // recibimos el password y lo encriptamos con un salt de 10 
            const reg = await models.User.create( req.body );
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
            const reg = await models.User.findOne( {_id : req.query._id} )
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
            const reg = await models.User.find({ $or:[ {'name': new RegExp(valor, 'i')}, {'email': new RegExp(valor,'i')}] }, {createdAt:0})
            .populate('category',{name:1}) // llamo al nombre de la categoria que hace referencia a ese articulo
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
            let pass = req.body.password;
            const reg0 = await models.User.findOne({_id : req.body._id});
            if (pass != reg0.password ){
                req.body.password = bcryptjs.hash(req.body.password ) // encripto solamente cuando el password no está encriptado, sino no hay necesidad de encriptarlo
            }
            const reg = await models.User.findByIdAndUpdate({_id:req.body._id}, {role: req.body.role, name: req.body.name,  docType: req.body.docType, docNumber: req.body.docNumber, direction: req.body.direction, phone: req.body.phone, email: req.body.email, password: req.body.password }); // primer parámetro la búsqueda, segundo los valores a cambiar en ese registro
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
            const reg = await models.User.findByIdAndDelete({_id:req.body._id});
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
            const reg = await models.User.findByIdAndUpdate({_id:req.body._id},{state:1});
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
            const reg = await models.User.findByIdAndUpdate({_id:req.body._id},{state:0});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    },
    login: async (req,res,next) => {
        try {
            let user = await models.User.findOne({email: req.body.email, state: 1}); // traigo al usuario que coincida con el email que viene del body y cuyo estado esté activado
            if (user){ // si existe un usuario
                let match = await bcryptjs.compare(req.body.password, user.password); // comparo que el password ingresado coincida con el encriptado
                if(match){
                    let tokenReturn = await token.encode(user._id); // llamo al services/token -> metodo encode y le paso el id del objeto user
                    res.status(200).json({user,tokenReturn}) // retorna el token y el usuario en la petición post /api/user/login
                }else{
                    res.status(404).send({
                        message: 'Credenciales inválidas' // en este caso no coincide el password, no hay match, pero como seguiridad decimos que puede que sea el usuario tambien que no exista
                    })
                }
            }
            else{
                res.status(404).send({
                    message: 'Credenciales inválidas' // no existe el usuario ingresado
                })
            }    
        }
        catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    }
}

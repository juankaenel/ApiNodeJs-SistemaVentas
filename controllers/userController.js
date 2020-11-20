const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create : (req,res,next) => {
        userModel.create({
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password,
            function(error, result){
                if(error){
                    next(error);
                }
                else{
                    res.json({ status: "Ok", message: "Usuario agregado con éxito", data: null });
                }
            }
        })
    },
    authenticate : (req, res, next) => {
        userModel.findOne( { email : req.body.email }, function(error,userInfo){ // userInfo viene de la bd
            if(error){
                next(error);
            }else{
                if(bcrypt.compareSync(req.body.password, userInfo.password)){
                    const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.json({status: 'Ok', message: "El usuario ha sido autenticado!", data:{user: userInfo, token : token}})
                }else{
                    res.json({status: 'error', message: "Password o Email inválido", data: null});
                }
            }
        }  )
    }
}
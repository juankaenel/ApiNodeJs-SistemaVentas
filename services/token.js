import jwt from 'jsonwebtoken';
import models from '../models/';

// esta función se encarga de generar un nuevo token a pesar que ya haya expirado el token, esto se debe a que las apps de hoy en día dejan las sesiones abiertas
async function checkToken(token){
    let __id = null;
    try {
        const {_id} = await jwt.decode(token); // obtengo el id de usuario a través del token
        __id = _id
    }catch (e){
        return false; // token no valido
    }
    const user = await models.User.findOne({_id:__id, state:1}); // traigo el usuario cuyo id coincide y que tenga el state activado
    if(user){
        const token = jwt.sign({_id: __id},'clavesecretaparagenerartoken',{expiresIn:'1d'});
        return {token, role: user.role} // el role lo vamos a usar para ver a que opciones tiene acceso ese usuario especifico 
    }else{
        // si no existe el user
        return false;
    }
}



export default {
    // genera el token en base al id, role, email
    encode: async (_id,role,email) => {
        const token = jwt.sign({_id : _id, role: role, email: email}, 'clavesecretaparagenerartoken', {expiresIn: '1d'});
        return token;
    },
    // recibe el token y verifica si es correcto, esto es más que nada para obtener el id en base al token y retornarlo a la funcion checkToken
    decode: async (token) => {
        try {
            // destructuring de id
            const {_id } = await jwt.verify(token,'clavesecreataparagenerartoken');
            const user = await models.User.findOne({_id, state:1}) // mientras tenga id y estado en 1 puede continuar
            if (user){
                return user;
            }else{
                return false;
            }
        } catch (error) { // en caso de error, verifico si puedo generar un nuevo token si es que existe ese usuario y si ha expirado su tiempo de token
            const newToken = await checkToken(token); 
            return newToken;
        }
    }
}
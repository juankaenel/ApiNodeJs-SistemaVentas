import tokenService from '../services/token';
export default {
    verifyUser : async (req, res, next) => { // Función para verificar que el usuario esté autenticado
        if (!req.headers.token){ // si no existe el token
            return res.status(404).send({
                message: 'No token'
            });
        } else { // si envio el token
            const response = await tokenService.decode(req.headers.token);
            if ( response.role == 'Administrador' || response.role == 'Vendedor' || response.role == 'Almacenero'){
                next(); // si fuera cualquiera de los 3 lo dejo trabajando
            }else{
                return res.status(403).send({
                    message: 'Usuario no autorizado!'
                })
            }
        }
    },
    verifyAdmin : async (req,res,next) => {
    if (!req.headers.token){ // si no existe el token
        return res.status(404).send({
            message: 'No token'
        });
    } else { // si envio el token
        const response = await tokenService.decode(req.headers.token);
        if ( response.role == 'Administrador'){
            next(); // si es admin lo dejo trabajando
        }else{
            return res.status(403).send({
                message: 'Usuario no autorizado!'
            })
        }
    }
    },
    verifyGrocer : async (req, res, next) => { // verificar si es almacenero
        if (!req.headers.token){ // si no existe el token
            return res.status(404).send({
                message: 'No token'
            });
        } else { // si envio el token
            const response = await tokenService.decode(req.headers.token);
            if (response.role == 'Administrador' || response.role == 'Almacenero'){
                next(); // si es administrador o almacenero lo dejo trabajando
            }else{
                return res.status(403).send({
                    message: 'Usuario no autorizado!'
                })
            }
        }
    },
    verifySeller : async (req, res, next) => { // verificar si es vendedor
        if (!req.headers.token){ // si no existe el token
            return res.status(404).send({
                message: 'No token'
            });
        } else { // si envio el token
            const response = await tokenService.decode(req.headers.token);
            if (response.role == 'Administrador' || response.role == 'Vendedor'){
                next(); 
            }else{
                return res.status(403).send({
                    message: 'Usuario no autorizado!'
                })
            }
        }
    },
} 
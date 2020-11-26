import routerx from 'express-promise-router';
import userController from '../controllers/UserController';
import auth from '../middlewares/auth';
const router = routerx(); // routerx usamos para que las rutas nos devuelvan un promise

// todos las rutas deben tener la autenticación con el rol de administrador
router.post('/add',auth.verifyAdmin, userController.add);
router.get('/query',auth.verifyAdmin, userController.query);
router.get('/list',auth.verifyAdmin, userController.list);
router.put('/update',auth.verifyAdmin, userController.update);
router.put('/activate',auth.verifyAdmin, userController.activate);
router.put('/deactivate',auth.verifyAdmin, userController.deactivate);
router.delete('/remove',auth.verifyAdmin ,userController.remove);
router.post('/login', userController.login); // no debe estar autenticado para poder acceder a loguearse

export default router;
import routerx from 'express-promise-router';
import categoryController from '../controllers/CategoryController';
import auth from '../middlewares/auth';
const router = routerx(); // routerx usamos para que las rutas nos devuelvan un promise

// solo los administradores y almaceneros pueden usar estas rutas
router.post('/add',auth.verifyGrocer ,categoryController.add);
router.get('/list',auth.verifyGrocer ,categoryController.list);
router.put('/update',auth.verifyGrocer ,categoryController.update);
router.put('/activate',auth.verifyGrocer ,categoryController.activate); 
router.put('/deactivate',auth.verifyGrocer ,categoryController.deactivate); 
router.delete('/remove',auth.verifyGrocer ,categoryController.remove); 

export default router;
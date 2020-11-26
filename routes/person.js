import routerx from 'express-promise-router';
import personController from '../controllers/PersonController';
import auth from '../middlewares/auth';
const router = routerx(); // routerx usamos para que las rutas nos devuelvan un promise



// todos las rutas deben tener la autenticación con el rol de usuario ( adm, almacenero, vendedor ) 
router.post('/add',auth.verifyUser, personController.add);
router.get('/query',auth.verifyUser, personController.query);
router.get('/list',auth.verifyUser, personController.list);
router.get('/list-clients',auth.verifyUser, personController.listClient);
router.get('/list-suppliers',auth.verifyUser, personController.listSuppliers);
router.put('/update',auth.verifyUser, personController.update);
router.put('/activate',auth.verifyUser, personController.activate);
router.put('/deactivate',auth.verifyUser, personController.deactivate);
router.delete('/remove',auth.verifyUser ,personController.remove);

export default router;
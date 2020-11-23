import routerx from 'express-promise-router';
import categoryController from '../controllers/CategoryController';

const router = routerx(); // routerx usamos para que las rutas nos devuelvan un promise

router.post('/add', categoryController.add);
router.get('/query', categoryController.query);
router.get('/list', categoryController.list);
router.put('/update', categoryController.update);
router.put('/activate', categoryController.activate);
router.put('/deactivate', categoryController.deactivate);
router.delete('/remove', categoryController.remove);

export default router;
import routerx from 'express-promise-router';
import categoryRouter from './category';

const router = routerx();
/* /api/ruta */
router.use('/category', categoryRouter); 
export default router;
import routerx from 'express-promise-router';
import categoryRouter from './category';

const router = routerx();

router.use('/category', categoryRouter);
export default router;
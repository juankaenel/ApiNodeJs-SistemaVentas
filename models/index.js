import Category from './category';
import Article from './article';
import User from './user';
import Person from './person';
import Revenue from './revenue';
import Sale from './sale';

export default {
    Category,
    Article,
    User,
    Person,
    Revenue, // ingreso o compra -> se agrega articulos a nuestro stock
    Sale // venta, egreso -> se descuenta de nuestro stock los articulos
}
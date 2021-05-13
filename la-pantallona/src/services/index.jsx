import { getMovies, getMovie, createMovie, updateMovie, deleteMovie } from './movies';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from './products';
import { Login, getUser, userLogout } from './auth';
import { ticketSale, productSale, getProductSales, getTicketSales } from './sales';

export{
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie,
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    Login,
    getUser,
    userLogout,
    ticketSale,
    productSale,
    getProductSales,
    getTicketSales
};
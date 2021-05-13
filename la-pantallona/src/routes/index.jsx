import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MovieList, MovieDetail, MovieForm } from '../components/movies';
import { ProductList, ProductForm } from '../components/products';
import { TicketSales, ProductSales } from '../components/sales';
import LoginComponent from '../components/login';
import { Home } from '../components/common'
import { TicketReport, ProductReport } from '../components/reports'


const Routes = () => {    
    return (
        
        <Switch>
            <Route exact path="/" component={LoginComponent} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/boletos" component={TicketSales} />
            <Route exact path="/dulceria" component={ProductSales} />
            <Route exact path="/productos/nuevoproducto" component={ProductForm} />
            <Route exact path="/productos/editarproducto/:productId" component={ProductForm} /> 
            <Route exact path="/productos" component={ProductList} />
            <Route exact path="/peliculas/nuevapelicula" component={MovieForm} />
            <Route exact path="/peliculas/editarpelicula/:movieId" component={MovieForm} />
            <Route exact path="/peliculas/:movieId" component={MovieDetail} />
            <Route exact path="/peliculas" component={MovieList} />
            <Route exact path="/reportes" component={TicketReport} />
            <Route exact path="/reportesProductos" component={ProductReport} />
        </Switch>

    )
}
export default Routes;
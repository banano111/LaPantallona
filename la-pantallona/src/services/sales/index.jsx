import axios from 'axios';

export const ticketSale = async (data) => {
    try {
        const response = await axios.post('https://lapantallona-api.herokuapp.com/ventas/boletos', data);
        if (response.data){
            return response.data;
        }
    } catch (error) {
        return {
            hasError: true,
            error
        }
    }
    
}

export const productSale = async (data) => {
    try {
        const response = await axios.post('https://lapantallona-api.herokuapp.com/ventas/productos', data);
        if (response.data){
            return response.data;
        }
    } catch (error) {
        return {
            hasError: true,
            error
        }
    }
    
}
import axios from 'axios';

export const getProducts = async () => {
    try {
        const response = await axios.get('https://lapantallona-api.herokuapp.com/productos');
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

export const getProduct = async (productId) => {
    try {
        const response = await axios.get(`https://lapantallona-api.herokuapp.com/productos/${productId}`);
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

export const createProduct = async (data) => {
    try {
        const response = await axios.post(`https://lapantallona-api.herokuapp.com/productos/add`, data);
        if (response.data) {
            return response.data
        }
    } catch (error) {
        return{
            hasError: true,
            error
        }
    }
}

export const updateProduct = async (data) => {
    try {
        const response = await axios.post(`https://lapantallona-api.herokuapp.com/productos/add`, data);
        if (response.data) {
            return response.data
        }
    } catch (error) {
        return{
            hasError: true,
            error
        }
    }
}

export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`https://lapantallona-api.herokuapp.com/productos/delete/${productId}`)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        return{
            hasError: true,
            error
        }
    }
}
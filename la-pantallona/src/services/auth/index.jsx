import axios from 'axios';

export const Login = async (data) => {
    try {
        const response = await axios.post('https://lapantallona-api.herokuapp.com/login', data);
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

export const getUser = async () => {
    try {
        const response = await axios.get('https://lapantallona-api.herokuapp.com/user');
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

export const userLogout = async () => {
    try {
        const response = await axios.delete('https://lapantallona-api.herokuapp.com/logout');
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
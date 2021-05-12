import axios from 'axios';

export const getMovies = async () => {
    try {
        const response = await axios.get('https://lapantallona-api.herokuapp.com/peliculas');
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

export const getMovie = async (movieId) => {
    try {
        const response = await axios.get(`https://lapantallona-api.herokuapp.com/peliculas/${movieId}`);
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

export const createMovie = async (data) => {
    try {
        const response = await axios.post(`https://lapantallona-api.herokuapp.com/peliculas`, data);
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

export const updateMovie = async (data) => {
    try {
        const response = await axios.post(`https://lapantallona-api.herokuapp.com/peliculas`, data);
        console.log(response)
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

export const deleteMovie = async (movieId) => {
    try {
        const response = await axios.delete(`https://lapantallona-api.herokuapp.com/peliculas/${movieId}`)
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
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
    },
}

const BASE_URL = 'https://api.themoviedb.org/3'
const defaultParams = {
    api_key: '6e8f7266ce430dc2736429b9fba8379f',
    language: 'en-US',
}

export const fetchMovies = (url, actionType, params) => async dispatch => {
    try {
        const data = await request(url, params)
        dispatch({
            type: actionType,
            payload: {
                data: data,
                errors: null,
            },
        })
    } catch (error) {
        dispatch({
            type: actionType,
            payload: {
                data: null,
                errors: error,
            },
        })
    }
}

export const fetchMovieDetails = async (movieId, params) => {
    try {
        return await request(`movie/${movieId}`, params)
    } catch (error) {
        throw error
    }
}

export const fetchCastDetails = async castId => {
    try {
        return await request(`person/${castId}`, {
            append_to_response: 'movie_credits',
        })
    } catch (error) {
        throw error
    }
}

const request = async (url, params = {}) => {
    const obj = { ...defaultParams, ...params }
    const response = await fetch(`${BASE_URL}/${url}?${queryString(obj)}`)
    const data = await response.json()
    return data
}

function queryString(obj) {
    return Object.entries(obj)
        .map(([index, val]) => `${index}=${val}`)
        .join('&')
}

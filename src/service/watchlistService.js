import { BASE_URL, defaultParams } from './requestService'
import AsyncStorage from '@react-native-async-storage/async-storage'

const API_KEY = defaultParams.api_key

export const getRequestToken = async () => {
    const response = await fetch(
        `${BASE_URL}/authentication/token/new?api_key=${API_KEY}`
    )
    const data = await response.json()
    return data.request_token
}

export const createSession = async requestToken => {
    try {
        const response = await fetch(
            `${BASE_URL}/authentication/session/new?api_key=${API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ request_token: requestToken }),
            }
        )
        const data = await response.json()

        if (data.success && data.session_id) {
            await AsyncStorage.setItem('session_id', data.session_id)
            return data.session_id
        } else {
            throw new Error(data.status_message || 'Failed to create session')
        }
    } catch (error) {
        throw error
    }
}
export const deleteSession = async sessionId => {
    const response = await fetch(
        `${BASE_URL}/authentication/session?api_key=${API_KEY}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ session_id: sessionId }),
        }
    )
    const data = await response.json()
    return data
}

export const addToWatchlist = async (movieId, sessionId) => {
    const url = `${BASE_URL}/account/{account_id}/watchlist?api_key=${defaultParams.api_key}&session_id=${sessionId}`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            media_type: 'movie',
            media_id: movieId,
            watchlist: true,
        }),
    })
    const data = await response.json()

    return data
}

export const getWatchlistMovies = async sessionId => {
    try {
        const watchlistUrl = `${BASE_URL}/account/{account_id}/watchlist/movies?api_key=${defaultParams.api_key}&session_id=${sessionId}`
        const watchlistResponse = await fetch(watchlistUrl)
        const watchlistData = await watchlistResponse.json()
        return watchlistData.results
    } catch (error) {
        console.error('Error fetching watchlist movies:', error)
        throw error
    }
}

export const removeFromWatchlist = async (movieId, sessionId) => {
    const url = `${BASE_URL}/account/{account_id}/watchlist?api_key=${defaultParams.api_key}&session_id=${sessionId}`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            media_type: 'movie',
            media_id: movieId,
            watchlist: false,
        }),
    })
    const data = await response.json()
    return data
}

export const rateMovie = async (movieId, sessionId, rating) => {
    const url = `${BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            value: rating,
        }),
    })
    const data = await response.json()

    return data
}

export const addToFavorites = async (movieId, sessionId) => {
    const url = `${BASE_URL}/account/{account_id}/favorite?api_key=${API_KEY}&session_id=${sessionId}`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            media_type: 'movie',
            media_id: movieId,
            favorite: true,
        }),
    })
    const data = await response.json()

    return data
}

export const removeFromFavorites = async (movieId, sessionId) => {
    const url = `${BASE_URL}/account/{account_id}/favorite?api_key=${API_KEY}&session_id=${sessionId}`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            media_type: 'movie',
            media_id: movieId,
            favorite: false,
        }),
    })
    const data = await response.json()
    return data
}

export const getFavoriteMovies = async sessionId => {
    try {
        const favoritesUrl = `${BASE_URL}/account/{account_id}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}`
        const favoritesResponse = await fetch(favoritesUrl)
        const favoritesData = await favoritesResponse.json()
        return favoritesData.results
    } catch (error) {
        console.error('Error fetching favorite movies:', error)
        throw error
    }
}

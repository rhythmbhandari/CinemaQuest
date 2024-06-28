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
    console.log(data)
    await AsyncStorage.setItem('session_id', data.session_id)

    return data.session_id
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

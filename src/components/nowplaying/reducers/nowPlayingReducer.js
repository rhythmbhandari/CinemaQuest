import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    results: [],
    errors: null,
}

export const nowPlayingMoviesSlice = createSlice({
    name: 'nowPlaying',
    initialState,

    reducers: {
        fetchNowPlaying: (state, action) => {
            const { data, errors } = action.payload
            if (errors) {
                state.errors = errors
                return
            }

            state.results = data.results
        },
    },
})

export const { fetchNowPlaying } = nowPlayingMoviesSlice.actions
export default nowPlayingMoviesSlice.reducer

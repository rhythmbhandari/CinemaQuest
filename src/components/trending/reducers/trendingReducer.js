import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    results: [],
    errors: null,
}

export const trendingMoviesSlice = createSlice({
    name: 'trending',
    initialState,

    reducers: {
        fetchTrending: (state, action) => {
            const { data, errors } = action.payload
            if (errors) {
                state.errors = errors
                return
            }
            state.results = data.results
        },
    },
})

export const { fetchTrending } = trendingMoviesSlice.actions
export default trendingMoviesSlice.reducer

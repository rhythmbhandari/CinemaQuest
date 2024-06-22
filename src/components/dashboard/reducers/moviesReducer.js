import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    results: [],
    nextPage: 0,
    errors: null,
}

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,

    reducers: {
        fetchMovies: (state, action) => {
            const { data, errors } = action.payload
            if (errors) {
                state.errors = errors
                return
            }

            if (data.page == 1) {
                state.results = data.results
            } else {
                state.results = [...state.results, ...data.results]
            }
            if (data.page != data.total_pages) {
                state.nextPage = data.page + 1
            }
        },
    },
})

export const { fetchMovies } = moviesSlice.actions
export default moviesSlice.reducer

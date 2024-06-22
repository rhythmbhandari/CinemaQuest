import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    results: [],
    errors: null,
}

export const upcomingMoviesSlice = createSlice({
    name: 'upcoming',
    initialState,

    reducers: {
        fetchUpcoming: (state, action) => {
            const { data, errors } = action.payload
            if (errors) {
                state.errors = errors
                return
            }
            state.results = data.results
        },
    },
})

export const { fetchUpcoming } = upcomingMoviesSlice.actions
export default upcomingMoviesSlice.reducer

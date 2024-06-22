import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from '../components/dashboard/reducers/moviesReducer'
import nowPlayingReducer from '../components/nowplaying/reducers/nowPlayingReducer'
import upcomingReducer from '../components/upcoming/reducers/upcomingReducer'
import trendingReducer from '../components/trending/reducers/trendingReducer'

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        nowPlaying: nowPlayingReducer,
        trending: trendingReducer,
        upcoming: upcomingReducer,
    },
})

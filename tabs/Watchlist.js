import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import WatchlistMovies from '../src/components/watchlist/WatchlistMovies'
import MovieDetails from '../src/components/dashboard/MovieDetails'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { commonHeaderOptions } from './Home'

const watchlistStack = createNativeStackNavigator()
const Watchlist = ({ navigation }) => {
    return (
        <watchlistStack.Navigator>
            <watchlistStack.Screen
                name="WatchList"
                component={WatchlistMovies}
                options={{ headerShown: false }}
            />
            <watchlistStack.Screen
                name="MovieDetails"
                component={MovieDetails}
                options={commonHeaderOptions}
            />
        </watchlistStack.Navigator>
    )
}

export default Watchlist

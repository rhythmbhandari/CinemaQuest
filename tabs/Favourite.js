import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { commonHeaderOptions } from './Home'
import Favourites from '../src/favourites/Favourites'
import MovieDetails from '../src/components/dashboard/MovieDetails'

const favouriteStack = createNativeStackNavigator()
const Favourite = ({ navigation }) => {
    return (
        <favouriteStack.Navigator>
            <favouriteStack.Screen
                name="Favourites"
                component={Favourites}
                options={{ headerShown: false }}
            />
            <favouriteStack.Screen
                name="MovieDetails"
                component={MovieDetails}
                options={commonHeaderOptions}
            />
        </favouriteStack.Navigator>
    )
}
export default Favourite

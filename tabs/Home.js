import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Dashboard from '../src/components/dashboard/Dashboard'
import AllMovies from '../src/components/dashboard/AllMovies'
import MovieDetails from '../src/components/dashboard/MovieDetails'
import CastDetails from '../src/components/cast/CastDetails'
import Authentication from '../src/components/Authentication'

const HomeStack = createNativeStackNavigator()

export const commonHeaderOptions = {
    headerStyle: {
        backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
}

export default function Home() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen
                name="Movies"
                component={AllMovies}
                options={commonHeaderOptions}
            />
            <HomeStack.Screen
                name="MovieDetails"
                component={MovieDetails}
                options={commonHeaderOptions}
            />
            <HomeStack.Screen
                name="CastDetails"
                component={CastDetails}
                options={commonHeaderOptions}
            />
            <HomeStack.Screen
                name="Authentication"
                component={Authentication}
            />
        </HomeStack.Navigator>
    )
}

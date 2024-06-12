import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Dashboard from '../src/components/dashboard/Dashboard'
import AllMovies from '../src/components/dashboard/AllMovies';
import MovieDetails from '../src/components/dashboard/MovieDetails';


const HomeStack = createNativeStackNavigator();

const commonHeaderOptions = {
    headerStyle: {
        backgroundColor: 'black',
    },
    headerTintColor: '#fff',
};

export default function Home() {
    return (

        <HomeStack.Navigator>
            <HomeStack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
            <HomeStack.Screen name="Movies" component={AllMovies} options={commonHeaderOptions} />
            <HomeStack.Screen name="MovieDetails" component={MovieDetails} options={commonHeaderOptions} />

        </HomeStack.Navigator>


    )
}
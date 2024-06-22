import { useEffect, useState } from 'react'
import { Text, ScrollView } from 'react-native'
import MoviesItem from '../MoviesItem'
import { fetchMovies } from '../../service/requestService'
import { useDispatch, useSelector } from 'react-redux'

const ACTION_TYPE = 'upcoming/fetchUpcoming'
const Upcoming = ({ navigation }) => {
    const dispatch = useDispatch()
    const movies = useSelector(state => state.upcoming.results)

    useEffect(() => {
        dispatch(
            fetchMovies(`movie/upcoming`, ACTION_TYPE, {
                page: 1,
            })
        )
    }, [])

    return (
        <ScrollView
            contentContainerStyle={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            {movies.length > 0 ? (
                movies.map(movie => (
                    <MoviesItem
                        item={movie}
                        key={movie.id}
                        navigation={navigation}
                    />
                ))
            ) : (
                <Text>No movies available</Text>
            )}
        </ScrollView>
    )
}

export default Upcoming

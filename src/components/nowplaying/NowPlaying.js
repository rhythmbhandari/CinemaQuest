
import { useEffect, useState } from 'react';
import { Text, ScrollView, } from 'react-native'
import MoviesItem from '../MoviesItem';
import { fetchMovies } from '../../service/requestService';

const NowPlaying = ({ navigation }) => {
    const [movies, setMovies] = useState([])

    function getMovies() {
        fetchMovies('now_playing')
            .then(response => setMovies(response))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getMovies()
    }, [])

    return (
        <ScrollView
            contentContainerStyle={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <MoviesItem item={movie} key={movie.id} navigation={navigation} />
                ))
            ) : (
                <Text>No movies available</Text>
            )}
        </ScrollView>

    );
}
export default NowPlaying

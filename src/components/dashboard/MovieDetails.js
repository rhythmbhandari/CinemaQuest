import { View, Text, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchMovieDetails } from '../../service/requestService'
import { getImageApi } from '../../../utils/movieImage';


import styles from './styles';

const MovieDetails = ({ route }) => {
    const { movieId } = route.params;
    const [movieDetails, setMovieDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    function getMovieDetails() {
        setLoading(true);
        fetchMovieDetails(movieId)
            .then(response => setMovieDetails(response))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }


    useEffect(() => {
        getMovieDetails()
    }, [])
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="white" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView >
                {movieDetails ? (
                    <View style={styles.detailsContainer}>
                        {movieDetails.poster_path && (
                            <Image
                                style={{ width: '100%', height: 300, }}
                                source={getImageApi(movieDetails.poster_path)}
                            />
                        )}
                        <Text style={styles.title}>{movieDetails.title}</Text>
                        <View style={styles.rowContainer}>
                            <Text style={styles.runtime}>Runtime: {movieDetails.runtime} minutes</Text>
                            <Text style={styles.separator}>|</Text>
                            {Array.isArray(movieDetails.genres) && movieDetails.genres.slice(0, 2).map(genre => (
                                <Text key={genre.id} style={styles.genre}>{genre.name}</Text>
                            ))}
                        </View>

                        <Text style={styles.overview}>Overview: {movieDetails.overview}</Text>

                    </View>
                ) : (
                    <Text>Loading...</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}
export default MovieDetails
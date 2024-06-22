import {
    View,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchMovieDetails } from '../../service/requestService'
import { getImageApi } from '../../../utils/movieImage'

import styles from './styles'

const MovieDetails = ({ route, navigation }) => {
    const { movieId } = route.params
    const [movieDetails, setMovieDetails] = useState([])
    const [loading, setLoading] = useState(true)

    function getMovieDetails() {
        setLoading(true)
        fetchMovieDetails(movieId, {
            append_to_response: 'credits,videos,images',
        })
            .then(response => setMovieDetails(response))
            .catch(error => console.error(error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getMovieDetails()
    }, [])

    const convertToGenres = (genre, messageNotFound = 'Uninformed') =>
        genre.length > 0
            ? genre.length > 1
                ? `${genre[0].name}, ${genre[1].name}`
                : genre[0].name
            : messageNotFound

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="white" />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {movieDetails ? (
                    <View style={styles.detailsContainer}>
                        {movieDetails.poster_path && (
                            <Image
                                style={{ width: '100%', height: 300 }}
                                source={getImageApi(movieDetails.poster_path)}
                            />
                        )}
                        <Text style={styles.title}>{movieDetails.title}</Text>
                        <View style={styles.rowContainer}>
                            <Text style={styles.runtime}>
                                Runtime: {movieDetails.runtime} minutes
                            </Text>
                            <Text style={styles.separator}>|</Text>
                            <Text style={{ color: 'white' }}>
                                {convertToGenres(movieDetails.genres)}
                            </Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.rating}>
                                Rating: {movieDetails.vote_average}/10
                            </Text>
                            <Text style={styles.separator}>|</Text>
                            <Text style={styles.ratingCount}>
                                {movieDetails.vote_count} votes
                            </Text>
                        </View>

                        <Text style={styles.overview}>
                            Overview: {movieDetails.overview}
                        </Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.castScrollView}
                        >
                            {movieDetails.credits.cast.map(castMember => (
                                <TouchableOpacity
                                    key={castMember.credit_id}
                                    onPress={() =>
                                        navigation.navigate('CastDetails', {
                                            castId: castMember.id,
                                        })
                                    }
                                >
                                    <View style={styles.castContainer}>
                                        <Text style={styles.castName}>
                                            {castMember.character}
                                        </Text>
                                        <Image
                                            style={styles.castImage}
                                            source={
                                                castMember.profile_path
                                                    ? getImageApi(
                                                          castMember.profile_path
                                                      )
                                                    : require('../../../assets/CastIcon.jpeg')
                                            }
                                        />
                                        <Text style={styles.castName}>
                                            {castMember.name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                ) : (
                    <Text>Loading...</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default MovieDetails

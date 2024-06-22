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
import { fetchCastDetails } from '../../service/requestService'
import styles from './styles'
import { getImageApi } from '../../../utils/movieImage'

const CastDetails = ({ route, navigation }) => {
    const { castId } = route.params
    const [castDetails, setCastDetails] = useState({})
    const [loading, setLoading] = useState(true)

    function getCastDetails() {
        setLoading(true)
        fetchCastDetails(castId)
            .then(response => setCastDetails(response))
            .catch(error => console.error(error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getCastDetails()
    }, [castId])

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
                {castDetails ? (
                    <View style={styles.detailsContainer}>
                        <Image
                            style={{ width: '100%', height: 400 }}
                            source={
                                castDetails.profile_path
                                    ? getImageApi(castDetails.profile_path)
                                    : require('../../../assets/CastIcon.jpeg')
                            }
                        />

                        <Text style={styles.title}>{castDetails.name}</Text>
                        {castDetails.biography ? (
                            <Text style={styles.overview}>
                                Biography: {castDetails.biography}
                            </Text>
                        ) : null}
                        <Text style={styles.moviesTitle}>Movies Played</Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.moviesContainer}
                        >
                            {castDetails.movie_credits.cast.map(movie => (
                                <TouchableOpacity
                                    key={movie.id}
                                    onPress={() =>
                                        navigation.push('MovieDetails', {
                                            movieId: movie.id,
                                        })
                                    }
                                >
                                    <View style={styles.movieContainer}>
                                        <Image
                                            style={styles.movieImage}
                                            source={getImageApi(
                                                movie.poster_path
                                            )}
                                        />
                                        <Text style={{ color: 'white' }}>
                                            {movie.title}
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

export default CastDetails
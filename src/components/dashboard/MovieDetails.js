import {
    View,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Pressable,
    Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchMovieDetails } from '../../service/requestService'
import { getImageApi } from '../../../utils/movieImage'
import {
    addToWatchlist,
    removeFromWatchlist,
    getWatchlistMovies,
    rateMovie,
    getFavoriteMovies,
    removeFromFavorites,
    addToFavorites,
} from '../../service/watchlistService'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './styles'
import ReviewModal from '../Modals/ReviewModal'
import WatchTrailerModal from '../Modals/WatchTrailerModal'
import RatingModal from '../Modals/RatingModal/RatingModal'
import WatchProvidersModal from '../Modals/WatchProvidersModal'
import MovieRecommendationsModal from '../Modals/MovieRecommendationsModal'

const MovieDetails = ({ route, navigation }) => {
    const { movieId } = route.params
    const [movieDetails, setMovieDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [inWatchlist, setInWatchlist] = useState(false)
    const [inFavorites, setInFavorites] = useState(false)
    const [trailerKey, setTrailerKey] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [trailerModalVisible, setTrailerModalVisible] = useState(false)
    const [ratingModalVisible, setRatingModalVisible] = useState(false)
    const [watchProvidersModalVisible, setWatchProvidersModalVisible] =
        useState(false)
    const [
        movieRecommendationsModalVisible,
        setMovieRecommendationsModalVisible,
    ] = useState(false)
    const [userRating, setUserRating] = useState(0)
    const [hasSessionId, setHasSessionId] = useState(false)
    const [watchProviders, setWatchProviders] = useState([])
    const [movieRecommendations, setMoviewRecommendations] = useState([])
    const [tmdbUrl, setTmdbUrl] = useState('')

    function getMovieDetails() {
        setLoading(true)
        fetchMovieDetails(movieId, {
            append_to_response:
                'credits,videos,images,similar,reviews,watch/providers,recommendations',
        })
            .then(response => {
                setMovieDetails(response)
                const trailer = response.videos.results.find(
                    video =>
                        video.type === 'Trailer' && video.site === 'YouTube'
                )
                if (trailer) {
                    setTrailerKey(trailer.key)
                }
                if (
                    response['watch/providers'] &&
                    response['watch/providers'].results.US &&
                    Object.keys(response['watch/providers'].results).length > 0
                ) {
                    setWatchProviders(
                        response['watch/providers'].results.CA.flatrate ||
                            response['watch/providers'].results.CA.buy ||
                            []
                    )
                } else {
                    setWatchProviders([])
                }
                setTmdbUrl(`https://www.themoviedb.org/movie/${movieId}`)
                setMoviewRecommendations(response.recommendations.results || [])
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false))
    }
    const getSessionId = async () => {
        const sessionId = await AsyncStorage.getItem('session_id')
        if (sessionId) {
            setHasSessionId(true)
        } else {
            setHasSessionId(false)
        }
    }

    const checkWatchlistStatus = async () => {
        const sessionId = await AsyncStorage.getItem('session_id')
        if (sessionId) {
            const watchlistMovies = await getWatchlistMovies(sessionId)
            const isInWatchlist = watchlistMovies.some(
                movie => movie.id === movieId
            )
            setInWatchlist(isInWatchlist)
        }
    }
    const checkFavoritesStatus = async () => {
        const sessionId = await AsyncStorage.getItem('session_id')
        if (sessionId) {
            const favoriteMovies = await getFavoriteMovies(sessionId)
            const isInFavorites = favoriteMovies.some(
                movie => movie.id === movieId
            )
            setInFavorites(isInFavorites)
        }
    }

    useEffect(() => {
        getMovieDetails()
        checkWatchlistStatus()
        checkFavoritesStatus()
        getSessionId()
    }, [])
    const toggleModalVisibility = () => {
        setModalVisible(!modalVisible)
    }
    const toggleTrailerModalVisibility = () => {
        setTrailerModalVisible(!trailerModalVisible)
    }
    const toggleWatchProvidersModalVisibility = () => {
        setWatchProvidersModalVisible(!watchProvidersModalVisible)
    }

    const toggleRecommendationsModalVisibility = () => {
        setMovieRecommendationsModalVisible(!movieRecommendationsModalVisible)
    }
    const convertToGenres = (genre, messageNotFound = 'Uninformed') =>
        genre.length > 0
            ? genre.length > 1
                ? `${genre[0].name}, ${genre[1].name}`
                : genre[0].name
            : messageNotFound

    const handleAddToWatchlist = async () => {
        const sessionId = await AsyncStorage.getItem('session_id')
        // console.log(sessionId)
        if (!sessionId) {
            navigation.navigate('Authentication')
            return
        }
        try {
            if (inWatchlist) {
                const response = await removeFromWatchlist(movieId, sessionId)
                if (response.success) {
                    setInWatchlist(false)
                    Alert.alert('Success', 'Removed from watchlist')
                } else {
                    Alert.alert('Error', response.status_message)
                }
            } else {
                const response = await addToWatchlist(movieId, sessionId)
                if (response.success) {
                    setInWatchlist(true)
                    Alert.alert('Success', 'Added to watchlist')
                } else {
                    Alert.alert('Error', response.status_message)
                }
            }
        } catch (error) {
            console.error(error)
            Alert.alert('Error', 'Failed to update watchlist')
        }
    }
    const handleAddToFavorites = async () => {
        const sessionId = await AsyncStorage.getItem('session_id')
        if (!sessionId) {
            navigation.navigate('Authentication')
            return
        }
        try {
            if (inFavorites) {
                const response = await removeFromFavorites(movieId, sessionId)
                if (response.success) {
                    setInFavorites(false)
                    Alert.alert('Success', 'Removed from favorites')
                } else {
                    Alert.alert('Error', response.status_message)
                }
            } else {
                const response = await addToFavorites(movieId, sessionId)
                if (response.success) {
                    setInFavorites(true)
                    Alert.alert('Success', 'Added to favorites')
                } else {
                    Alert.alert('Error', response.status_message)
                }
            }
        } catch (error) {
            console.error(error)
            Alert.alert('Error', 'Failed to update favorites')
        }
    }

    const handleRateMovie = async rating => {
        const sessionId = await AsyncStorage.getItem('session_id')
        if (!sessionId) {
            navigation.navigate('Authentication')
            return
        }
        try {
            const response = await rateMovie(movieId, sessionId, rating)
            if (response.success) {
                setUserRating(rating)
                Alert.alert('Success', `Rated the movie ${rating} out of 10`)
                setRatingModalVisible(false)
                const updatedWatchlistStatus = await checkWatchlistStatus()
                setInWatchlist(updatedWatchlistStatus)
            } else {
                Alert.alert('Error', response.status_message)
            }
        } catch (error) {
            console.error(error)
            Alert.alert('Error', 'Failed to rate the movie')
        }
    }

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
                                style={{ width: '100%', height: 400 }}
                                source={getImageApi(movieDetails.poster_path)}
                            />
                        )}
                        <View style={styles.iconContainer}>
                            <View style={styles.iconStyle}>
                                <Pressable
                                    onPress={() =>
                                        toggleTrailerModalVisibility()
                                    }
                                >
                                    <Ionicons
                                        name={'play-circle-outline'}
                                        size={34}
                                        color="white"
                                    />
                                </Pressable>
                                <Text style={styles.text}>Watch Trailer</Text>
                            </View>

                            <View style={styles.iconStyle}>
                                <Pressable
                                    onPress={() => handleAddToWatchlist()}
                                >
                                    <Ionicons
                                        name={
                                            inWatchlist
                                                ? 'bookmark'
                                                : 'bookmark-outline'
                                        }
                                        size={34}
                                        color="white"
                                    />
                                </Pressable>
                                <Text style={{ color: 'white' }}>
                                    Watchlist
                                </Text>
                            </View>
                            <View style={styles.iconStyle}>
                                <Pressable
                                    onPress={() =>
                                        hasSessionId
                                            ? setRatingModalVisible(true)
                                            : navigation.navigate(
                                                  'Authentication'
                                              )
                                    }
                                >
                                    <Ionicons
                                        name={'star-outline'}
                                        size={34}
                                        color="white"
                                    />
                                </Pressable>
                                <Text style={{ color: 'white' }}>
                                    Rate Movie
                                </Text>
                            </View>
                            <View style={styles.iconStyle}>
                                <Pressable
                                    onPress={() => handleAddToFavorites()}
                                >
                                    <Ionicons
                                        name={
                                            inFavorites
                                                ? 'heart'
                                                : 'heart-outline'
                                        }
                                        size={34}
                                        color="white"
                                    />
                                </Pressable>
                                <Text style={{ color: 'white' }}>
                                    Favourite
                                </Text>
                            </View>
                        </View>
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
                        <View style={styles.reviewContainer}>
                            <Pressable
                                onPress={toggleModalVisibility}
                                style={styles.detailsBtn}
                            >
                                <Text style={styles.detailsTxt}>
                                    See Reviews
                                </Text>
                            </Pressable>
                            <ReviewModal
                                modalVisible={modalVisible}
                                toggleModalVisibility={toggleModalVisibility}
                                reviews={movieDetails.reviews.results}
                            />
                            <Pressable
                                onPress={toggleWatchProvidersModalVisibility}
                                style={styles.detailsBtn}
                            >
                                <Text style={styles.detailsTxt}>
                                    Watch Providers
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={toggleRecommendationsModalVisibility}
                                style={styles.detailsBtn}
                            >
                                <Text style={styles.detailsTxt}>
                                    Recommendations
                                </Text>
                            </Pressable>
                        </View>

                        <Text
                            style={{ color: 'white', margin: 5, fontSize: 20 }}
                        >
                            Casts
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
                        <Text
                            style={{ color: 'white', margin: 10, fontSize: 20 }}
                        >
                            Similar Movies
                        </Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {movieDetails.similar.results.map(movie => (
                                <TouchableOpacity
                                    key={movie.id}
                                    onPress={() =>
                                        navigation.push('MovieDetails', {
                                            movieId: movie.id,
                                        })
                                    }
                                >
                                    <View style={styles.castContainer}>
                                        <Image
                                            style={styles.similarMovieImage}
                                            source={getImageApi(
                                                movie.poster_path
                                            )}
                                        />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                ) : (
                    <Text>Loading...</Text>
                )}
            </ScrollView>
            <WatchTrailerModal
                modalVisible={trailerModalVisible}
                toggleModalVisibility={toggleTrailerModalVisibility}
                trailerKey={trailerKey}
            />
            <RatingModal
                visible={ratingModalVisible}
                onClose={() => setRatingModalVisible(false)}
                onSubmit={handleRateMovie}
            />
            <WatchProvidersModal
                modalVisible={watchProvidersModalVisible}
                toggleModalVisibility={toggleWatchProvidersModalVisibility}
                providers={watchProviders}
                tmdbUrl={tmdbUrl}
            />
            <MovieRecommendationsModal
                modalVisible={movieRecommendationsModalVisible}
                toggleModalVisibility={toggleRecommendationsModalVisibility}
                recommendations={movieRecommendations}
                navigation={navigation}
            />
        </SafeAreaView>
    )
}

export default MovieDetails

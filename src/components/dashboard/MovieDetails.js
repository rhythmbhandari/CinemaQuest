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
    Modal
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchMovieDetails } from '../../service/requestService'
import { getImageApi } from '../../../utils/movieImage'
import {
    addToWatchlist,
    removeFromWatchlist,
    getWatchlistMovies,
} from '../../service/watchlistService'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import YoutubeIframe from 'react-native-youtube-iframe'
import styles from './styles'

const MovieDetails = ({ route, navigation }) => {
    const { movieId } = route.params
    const [movieDetails, setMovieDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [inWatchlist, setInWatchlist] = useState(false)
    const [trailerKey, setTrailerKey] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    function getMovieDetails() {
        setLoading(true)
        fetchMovieDetails(movieId, {
            append_to_response: 'credits,videos,images,similar',
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
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false))
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

    useEffect(() => {
        getMovieDetails()
        checkWatchlistStatus()
    }, [])

    const handleShowTrailer = () => {
        if (trailerKey) {
            setModalVisible(true)
        }else {
            Alert.alert('Trailer not available')
        }
    }

    const convertToGenres = (genre, messageNotFound = 'Uninformed') =>
        genre.length > 0
            ? genre.length > 1
                ? `${genre[0].name}, ${genre[1].name}`
                : genre[0].name
            : messageNotFound

    const handleAddToWatchlist = async () => {
        const sessionId = await AsyncStorage.getItem('session_id')
        console.log(sessionId)
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
                        {/* <View style={{ alignItems: 'center' }}>
                            <Text style={styles.title}>
                                {movieDetails.title}
                            </Text>
                        </View> */}

                        <View style={styles.iconContainer}>
                            <View style={styles.iconStyle}>
                                <Pressable onPress={() => handleShowTrailer()}>
                                    <Ionicons
                                        name={'play-circle'}
                                        size={34}
                                        color="white"
                                    />
                                </Pressable>
                                <Text style={styles.text}>
                                    Watch Trailer
                                </Text>
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
                                    {inWatchlist
                                        ? 'Remove from Watchlist'
                                        : 'Add to Watchlist'}
                                </Text>
                            </View>
                            <View style={styles.iconStyle}>
                                <Pressable
                                    onPress={() => handleAddToMovieCollection()}
                                >
                                    <Ionicons
                                        name={'list'}
                                        size={34}
                                        color="white"
                                    />
                                </Pressable>
                                <Text style={{ color: 'white' }}>
                                    Add To List
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <YoutubeIframe
                            height={250}
                            width={400}
                            play={true}
                            videoId={trailerKey}
                        />
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text
                                style={[
                                    styles.text,
                                    { fontSize: 25, color: 'grey' },
                                ]}
                            >
                                Close
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default MovieDetails

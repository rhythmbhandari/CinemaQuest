import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Image,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native'
import React, {useState } from 'react'
import styles from './styles'
import { getImageApi } from '../../../utils/movieImage'
import { getWatchlistMovies } from '../../service/watchlistService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

const WatchlistMovies = ({ navigation }) => {
    const [watchlist, setWatchlist] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchWatchlist = async () => {
        try {
            setLoading(true)
            const sessionId = await AsyncStorage.getItem('session_id')
            const watchlistMovies = await getWatchlistMovies(sessionId)
            setWatchlist(watchlistMovies || [])
        } catch (error) {
            console.error('Error fetching watchlist:', error)
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            fetchWatchlist()
        }, [])
    )

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="white" />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text
                    style={{
                        color: 'white',
                        fontStyle: 'italic',
                        fontSize: 20,
                    }}
                >
                    <Text style={{ color: 'green', fontSize: 28 }}>W</Text>
                    atch <Text style={{ color: 'green', fontSize: 28 }}>L</Text>
                    ist
                </Text>
            </View>
            <View style={styles.container}>
                {watchlist.length > 0 ? (
                    <FlatList
                        data={watchlist}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.movieItem}
                                onPress={() =>
                                    navigation.push('MovieDetails', {
                                        movieId: item.id,
                                    })
                                }
                            >
                                {item.poster_path && (
                                    <Image
                                        style={styles.movieImage}
                                        source={getImageApi(item.poster_path)}
                                    />
                                )}
                                <View style={styles.movieDetails}>
                                    <Text style={styles.title}>
                                        {item.title}
                                    </Text>
                                    <Text style={styles.releaseDate}>
                                        Release Date: {item.release_date}
                                    </Text>
                                    <Text
                                        style={styles.overview}
                                        numberOfLines={5}
                                    >
                                        Overview: {item.overview}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    <View style={styles.emptyWatchlist}>
                        <Text
                            style={{
                                color: 'grey',
                                fontSize: 25,
                            }}
                        >
                            Watchlist is empty!!!.
                        </Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

export default WatchlistMovies

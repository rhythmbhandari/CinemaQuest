import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import styles from './styles'
import { getFavoriteMovies } from '../service/watchlistService'
import MoviesItem from '../components/MoviesItem'

const Favourites = ({ navigation }) => {
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchFavorites = async () => {
        try {
            setLoading(true)
            const sessionId = await AsyncStorage.getItem('session_id')
            const favoriteMovies = await getFavoriteMovies(sessionId)
            setFavorites(favoriteMovies || [])
        } catch (error) {
            console.error('Error fetching favorites:', error)
        } finally {
            setLoading(false)
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            fetchFavorites()
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
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text
                    style={{
                        color: 'white',
                        fontStyle: 'italic',
                        fontSize: 20,
                    }}
                >
                    <Text style={{ color: 'green', fontSize: 28 }}>F</Text>
                    avourites
                </Text>
            </View>

            {favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <MoviesItem item={item} navigation={navigation} />
                    )}
                    numColumns={2}
                />
            ) : (
                <View style={styles.emptyWatchlist}>
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 25,
                        }}
                    >
                        No favourites added yet!!!
                    </Text>
                </View>
            )}
        </SafeAreaView>
    )
}

export default Favourites

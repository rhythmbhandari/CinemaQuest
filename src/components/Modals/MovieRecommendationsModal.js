import React from 'react'
import {
    View,
    Text,
    Modal,
    Pressable,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native'
import { getImageApi } from '../../../utils/movieImage'
import styles from './styles'

const MovieRecommendationsModal = ({
    modalVisible,
    toggleModalVisibility,
    recommendations,
    navigation,
}) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            key={item.id}
            onPress={() => {
                toggleModalVisibility()
                navigation.push('MovieDetails', {
                    movieId: item.id,
                })
            }}
        >
            <View style={styles.movieContainer}>
                <Image
                    style={styles.movieImage}
                    source={getImageApi(item.poster_path)}
                />
            </View>
        </TouchableOpacity>
    )

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModalVisibility}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Recommended Movies</Text>
                    <FlatList
                        data={recommendations}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderItem}
                        numColumns={2}
                        contentContainerStyle={styles.listContainer}
                        ListEmptyComponent={
                            <View style={styles.noRecommendationsContainer}>
                                <Text style={styles.noRecommendationsText}>
                                    No recommendations available
                                </Text>
                            </View>
                        }
                    />
                    <Pressable onPress={toggleModalVisibility}>
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
    )
}

export default MovieRecommendationsModal

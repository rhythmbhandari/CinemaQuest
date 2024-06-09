import { View, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { getImageApi } from '../../utils/movieImage';

const MoviesItem = ({ item, navigation }) => {
    const screenWidth = Dimensions.get('window').width;
    const imageWidth = (screenWidth / 2) - 20;

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 10,

                }}>
                <View style={{ width: '100%' }}>
                    <Image
                        style={{ width: imageWidth, height: 300, borderRadius: 10 }}
                        source={getImageApi(item.poster_path)} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MoviesItem
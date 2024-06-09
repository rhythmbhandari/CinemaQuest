import {  SafeAreaView,  TextInput } from 'react-native'
import React from 'react'

import styles from './styles';

const categoryTitles = {
    now_playing: 'Now Showing',
    popular: 'Trending',
    upcoming: 'Upcoming'
};

const AllMovies = ({ route, navigation }) => {
    return (
        <SafeAreaView style={styles.container}>

            <TextInput
                style={styles.searchBox}
                placeholder="Search Movies..."
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />

        </SafeAreaView>
    )
}
export default AllMovies
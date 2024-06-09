import { View, Text, SafeAreaView, ScrollView, Pressable, StatusBar } from 'react-native'
import React from 'react'
import NowPlaying from '../nowplaying/NowPlaying'
import Trending from '../trending/Trending'
import Upcoming from '../upcoming/Upcoming'
import styles from './styles'

const Dashboard = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View>
                <Text style={{ color: "white", fontStyle: "italic", fontSize: 20 }}>
                    <Text style={{ color: "green", fontSize: 28 }}>C</Text>inema <Text style={{ color: "green", fontSize: 28 }}>Q</Text>uest</Text>
            </View>

            <ScrollView>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: '#fff', padding: 10 }}>
                    <Text style={{ color: '#fff' }}>Now Playing</Text>
                    <Pressable onPress={() => navigation.navigate('Movies', { category: 'now_playing' })}>
                        <Text style={{ color: '#fff' }}>See All</Text>
                    </Pressable>

                </View>
                <NowPlaying navigation={navigation} />

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: '#fff', padding: 10 }}>
                    <Text style={{ color: '#fff' }}>Trending</Text>
                    <Pressable onPress={() => navigation.navigate('Movies', { category: 'popular' })}>
                        <Text style={{ color: '#fff' }}>See All</Text>
                    </Pressable>
                </View>
                <Trending navigation={navigation} />

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: '#fff', padding: 10 }}>
                    <Text style={{ color: '#fff' }}>Upcoming</Text>
                    <Pressable onPress={() => navigation.navigate('Movies', { category: 'upcoming' })}>
                        <Text style={{ color: '#fff' }}>See All</Text>
                    </Pressable>
                </View>
                <Upcoming navigation={navigation} />
            </ScrollView>
        </SafeAreaView>
    )

}

export default Dashboard

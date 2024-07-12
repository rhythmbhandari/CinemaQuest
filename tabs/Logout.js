import React, { useCallback, useEffect } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { deleteSession } from '../src/service/watchlistService'
import { useFocusEffect } from '@react-navigation/native'

const Logout = ({ navigation }) => {
    const handleLogout = async () => {
        try {
            const sessionId = await AsyncStorage.getItem('session_id')
            if (!sessionId) {
                Alert.alert('You already deleted the session.')
                navigation.navigate('HomeScreen')
                return
            }

            Alert.alert(
                'Delete Session',
                'Are you sure you want to delete session?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => navigation.navigate('HomeScreen'),
                    },
                    {
                        text: 'Delete',
                        onPress: async () => {
                            try {
                                const deleteResult = await deleteSession(
                                    sessionId
                                )
                                if (deleteResult.success) {
                                    await AsyncStorage.removeItem('session_id')
                                    Alert.alert('Session deleted successfully')
                                    navigation.navigate('HomeScreen') // Navigate to home screen
                                } else {
                                    Alert.alert(
                                        'Error',
                                        'Failed to delete session from TMDB. Please try again.'
                                    )
                                }
                            } catch (error) {
                                console.error(
                                    'Failed to delete session:',
                                    error
                                )
                                Alert.alert(
                                    'Error',
                                    'Failed to delete session. Please try again.'
                                )
                            }
                        },
                    },
                ],
                { cancelable: true }
            )
        } catch (error) {
            console.error('Failed to delete session:', error)
            Alert.alert('Error', 'Failed to delete session. Please try again.')
        }
    }

    useFocusEffect(
        useCallback(() => {
            handleLogout()
        }, [])
    )

    return <View style={{ flex: 1, backgroundColor: 'black' }} />
}

export default Logout

import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator, Alert } from 'react-native'
import { createSession, getRequestToken } from '../service/watchlistService'
import WebView from 'react-native-webview'

const TMDB_AUTH_URL = 'https://www.themoviedb.org/authenticate/'

const Authentication = ({ navigation }) => {
    const [authUrl, setAuthUrl] = useState(null)
    const [isCreatingSession, setIsCreatingSession] = useState(false)

    useEffect(() => {
        const initAuth = async () => {
            try {
                const requestToken = await getRequestToken()
                setAuthUrl(`${TMDB_AUTH_URL}${requestToken}`)
            } catch (error) {
                Alert.alert('Error', 'Failed to get request token')
                console.error(error)
            }
        }
        initAuth()
    }, [])

    const handleNavigationStateChange = async navState => {
        if (navState.url.includes('/allow')) {
            const parts = navState.url.split('/')
            const requestToken = parts[parts.length - 2]

            if (requestToken && !isCreatingSession) {
                setIsCreatingSession(true)
                try {
                    const sessionId = await createSession(requestToken)
                    Alert.alert('Success', 'You are now authenticated!')
                    navigation.goBack()
                } catch (error) {
                } finally {
                    setIsCreatingSession(false)
                }
            }
        }
    }

    if (!authUrl) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    return (
        <WebView
            source={{ uri: authUrl }}
            onNavigationStateChange={handleNavigationStateChange}
            startInLoadingState={true}
            renderLoading={() => (
                <ActivityIndicator size="large" color="#0000ff" />
            )}
        />
    )
}

export default Authentication

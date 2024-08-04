import React from 'react'
import {
    View,
    Text,
    ScrollView,
    Modal,
    Pressable,
    Linking,
    Image,
} from 'react-native'
import styles from './styles'
import { getImageApi } from '../../../utils/movieImage'

const WatchProvidersModal = ({
    modalVisible,
    toggleModalVisibility,
    providers,
    tmdbUrl,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModalVisibility}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Watch Providers</Text>
                    <ScrollView>
                        {providers.length > 0 ? (
                            providers.map(provider => (
                                <View
                                    key={provider.provider_id}
                                    style={styles.providerContainer}
                                >
                                    <Image
                                        style={{ width: 300, height: 300 }}
                                        source={getImageApi(provider.logo_path)}
                                    />
                                    <Text style={styles.providerName}>
                                        {provider.provider_name}
                                    </Text>
                                </View>
                            ))
                        ) : (
                            <View style={styles.noProvidersContainer}>
                                <Text style={styles.noProvidersText}>
                                    No watch providers data available
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                    <Text style={styles.attribution}>Powered by JustWatch</Text>
                    <Pressable onPress={() => Linking.openURL(tmdbUrl)}>
                        <Text style={styles.tmdbLink}>View on TMDB</Text>
                    </Pressable>
                    <Pressable onPress={toggleModalVisibility}>
                        <Text
                            style={[
                                styles.text,
                                { fontSize: 20, color: 'grey', marginTop: 10 },
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

export default WatchProvidersModal

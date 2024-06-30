import React from 'react'
import { View, Text, Pressable, Modal } from 'react-native'
import YoutubeIframe from 'react-native-youtube-iframe'
import styles from './styles'

const WatchTrailerModal = ({
    modalVisible,
    toggleModalVisibility,
    trailerKey,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModalVisibility}
        >
            <View style={styles.modalContainer}>
                <View style={styles.trailerModalContent}>
                    <YoutubeIframe
                        height={250}
                        width={400}
                        play={true}
                        videoId={trailerKey}
                    />
                    <Pressable onPress={toggleModalVisibility}>
                        <Text style={{ fontSize: 25, color: 'grey' }}>
                            Close
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default WatchTrailerModal

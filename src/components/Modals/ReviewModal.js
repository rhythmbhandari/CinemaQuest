import React from 'react'
import { View, Text, ScrollView, Button, Modal, Pressable } from 'react-native'
import styles from './styles'

const ReviewModal = ({ modalVisible, toggleModalVisibility, reviews }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModalVisibility}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Reviews</Text>
                    <ScrollView>
                        {reviews.map(review => (
                            <View
                                key={review.id}
                                style={styles.reviewContainer}
                            >
                                <Text style={styles.reviewAuthor}>
                                    {review.author}
                                </Text>
                                <Text style={styles.reviewContent}>
                                    {review.content}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
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

export default ReviewModal

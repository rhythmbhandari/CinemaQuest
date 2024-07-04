import React, { useState } from 'react'
import { View, Text, Modal, Button, StyleSheet, TextInput } from 'react-native'
import styles from './styles'

const RatingModal = ({ visible, onClose, onSubmit }) => {
    const [rating, setRating] = useState('')

    const handleSubmit = () => {
        const numericRating = parseFloat(rating)
        if (numericRating >= 0 && numericRating <= 10) {
            onSubmit(numericRating)
            setRating('')
        } else {
            alert('Please enter a rating between 0 and 10.')
        }
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.inputModalTitle}>Rate this movie</Text>
                    <TextInput
                        style={styles.inputRating}
                        keyboardType="numeric"
                        placeholder="Enter rating (0-10)"
                        placeholderTextColor={'grey'}
                        value={rating}
                        onChangeText={setRating}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Submit" onPress={handleSubmit} color="#28a745" />
                        </View>
                        <View style={styles.button}>
                            <Button title="Cancel" onPress={onClose} color="#dc3545" />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default RatingModal

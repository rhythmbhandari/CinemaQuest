import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContent: {
        width: '100%',
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 20,
        height: '90%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    reviewContainer: {
        marginBottom: 15,
        backgroundColor: '#1a1a1a',
    },
    reviewAuthor: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white',
    },
    reviewContent: {
        fontSize: 16,
        color: 'white',
    },

    trailerModalContent: {
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
})

export default styles

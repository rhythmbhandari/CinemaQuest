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
    providerContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    providerName: {
        color: 'white',
        fontSize: 18,
    },
    attribution: {
        color: 'grey',
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
    },
    tmdbLink: {
        color: 'skyblue',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
        textDecorationLine: 'underline',
    },
    providerLogo: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    noProvidersContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    noProvidersText: {
        fontSize: 16,
        color: 'white',
    },
    movieContainer: {
        width: 150,
        margin: 10,
        backgroundColor: '#444',
        borderRadius: 10,
        overflow: 'hidden',
    },
    movieImage: {
        width: '100%',
        height: 250,
    },
    movieTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        padding: 5,
    },
    movieOverview: {
        fontSize: 14,
        color: 'white',
        padding: 5,
    },
    noRecommendationsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
    noRecommendationsText: {
        fontSize: 18,
        color: 'grey',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
})

export default styles

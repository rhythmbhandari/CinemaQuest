import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    movieItem: {
        marginBottom: 20,
        flexDirection: 'row',
    },
    movieImage: {
        width: 100,
        height: 150,
        marginRight: 20,
    },
    movieDetails: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    releaseDate: {
        fontSize: 16,
        marginTop: 5,
        color: 'white',
    },
    overview: {
        fontSize: 14,
        marginTop: 10,
        color: 'white',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    emptyWatchlist: {
        alignItems: 'center',
        marginTop: 200,
    },
})

export default styles

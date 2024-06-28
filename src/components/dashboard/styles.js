import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },

    searchBox: {
        margin: 3,
        width: '95%',
        backgroundColor: '#1a1a1a',
        height: 35,
        borderRadius: 4,
        color: 'white',
        padding: 10,
    },

    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    runtime: {
        color: 'white',
        fontSize: 16,
    },

    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    separator: {
        fontSize: 20,
        color: 'white',
        marginHorizontal: 5,
    },

    genre: {
        fontSize: 16,
        color: 'white',
        marginHorizontal: 2,
    },

    overview: {
        color: 'white',
        marginBottom: 10,
        padding: 10,
    },
    rating: {
        color: '#fff',
        fontSize: 16,
    },

    ratingCount: {
        color: '#fff',
        fontSize: 16,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },

    noMoviesText: {
        marginTop: 20,
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
    },

    castTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },

    castScrollView: {
        flexDirection: 'row',
        marginVertical: 10,
        paddingLeft: 10,
        gap: 16,
    },

    castContainer: {
        alignItems: 'center',
        marginRight: 10,
        gap: 8,
    },

    castImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },

    castName: {
        textAlign: 'center',
        color: 'white',
        fontSize: 10,
    },
    filterButton: {
        backgroundColor: '#1a1a1a',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    similarMovieImage: {
        height: 180,
        width: 100,
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 10,
    },
    iconStyle: {
        alignItems: 'center',
    },
})

export default styles

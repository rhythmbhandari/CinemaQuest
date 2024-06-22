import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    detailsContainer: {
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    overview: {
        color: 'white',
        marginBottom: 10,
        padding: 10
    },

    moviesTitle: {
        color: 'white',
        fontSize: 20
    },
    movieContainer: {
        alignItems: 'center',
        marginRight: 10,
        marginTop: 10,

        paddingBottom: 10,
    },
    movieImage: {
        width: 150,
        height: 220,
        borderRadius: 10,
    },
})

export default styles

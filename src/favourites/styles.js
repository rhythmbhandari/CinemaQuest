import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
    },
    emptyWatchlist: {
        alignItems: 'center',
        marginTop: 200,
    },
})

export default styles

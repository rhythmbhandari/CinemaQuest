import { StyleSheet } from "react-native";

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
    color: 'white'
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
    padding: 10
  },

  detailsContainer: {
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  noMoviesText: {
    marginTop: 20,
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  },
});


export default styles
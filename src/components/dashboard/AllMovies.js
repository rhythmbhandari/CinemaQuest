import {
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchMovies } from "../../service/requestService";
import MoviesItem from "../MoviesItem";

import styles from "./styles";

const categoryTitles = {
  now_playing: "Now Showing",
  popular: "Trending",
  upcoming: "Upcoming",
};

const AllMovies = ({ route, navigation }) => {
  const { category } = route.params;
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  function getAllMovies() {
    setLoading(true);
    fetchMovies(category, true)
      .then((response) => {
        setMovies(response);
        setFilteredMovies(response);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getAllMovies();
  }, [category]);

  useEffect(() => {
    setFilteredMovies(
      movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, movies]);

  useEffect(() => {
    navigation.setOptions({
      title: categoryTitles[category] || "Movies",
    });
  }, [navigation, category]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search Movies..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <ScrollView>
        <View
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MoviesItem item={movie} key={movie.id} navigation={navigation} />
            ))
          ) : (
            <Text style={styles.noMoviesText}>No movies available</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default AllMovies;

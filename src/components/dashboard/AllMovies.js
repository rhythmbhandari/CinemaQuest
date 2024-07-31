import {
    View,
    SafeAreaView,
    TextInput,
    ActivityIndicator,
    Text,
    FlatList,
} from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { fetchMovies } from '../../service/requestService'
import MoviesItem from '../MoviesItem'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Drawer } from 'react-native-drawer-layout'
import FilterDrawerContent from './FilterDrawerContent'
import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash.debounce'

import styles from './styles'

const ACTION_TYPE = 'movies/fetchMovies'
const categoryTitles = {
    now_playing: 'Now Showing',
    popular: 'Trending',
    upcoming: 'Upcoming',
}

const AllMovies = ({ route, navigation }) => {
    const { category } = route.params
    const [searchQuery, setSearchQuery] = useState('')
    const [filterParams, setFilterParams] = useState({})
    const [rightDrawerOpen, setRightDrawerOpen] = useState(false)
    const [page, setPage] = useState(1)
    const [refreshing, setIsRefreshing] = useState(false)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    const nextPage = useSelector(state => state.movies.nextPage)
    const movies = useSelector(state => state.movies.results)

    function fetchMoviesList() {
        const url = searchQuery ? 'search/movie' : `movie/${category}`
        dispatch(
            fetchMovies(url, ACTION_TYPE, {
                page: page,
                query: searchQuery,
                ...filterParams,
            })
        )
    }

    useEffect(() => {
        if (page === 1) setLoading(true)
        fetchMoviesList()
        setLoading(false)
    }, [category, page])

    useEffect(() => {
        navigation.setOptions({
            title: categoryTitles[category] || 'Movies',
            headerRight: props => (
                <Ionicons
                    name="filter"
                    size={20}
                    color={props.tintColor}
                    onPress={() => setRightDrawerOpen(true)}
                />
            ),
        })
    }, [navigation, category])

    const debouncedFetchMovies = useCallback(
        debounce(query => {
            if (!query) return

            dispatch(
                fetchMovies(`search/movie`, ACTION_TYPE, {
                    page: 1,
                    query: query,
                })
            )
        }, 300),
        []
    )

    function onSearchChange(text) {
        if (!text) setPage(1)
        setSearchQuery(text)
        debouncedFetchMovies(text)
    }

    function handleClearFilter() {
        setSearchQuery('')
        setFilterParams({})
        setRightDrawerOpen(false)
        if (page !== 1) {
            setPage(1)
        } else {
            fetchMoviesList()
        }
    }

    function handleApplyFilter(params) {
        setRightDrawerOpen(false)
        setSearchQuery('')
        setFilterParams(params)
        dispatch(
            fetchMovies(`discover/movie`, ACTION_TYPE, {
                page: 1,
                ...params,
            })
        )
    }

    function handleEndReached() {
        if (nextPage && page !== nextPage) setPage(nextPage)
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="white" />
            </View>
        )
    }

    return (
        <Drawer
            open={rightDrawerOpen}
            onOpen={() => setRightDrawerOpen(true)}
            onClose={() => setRightDrawerOpen(false)}
            drawerWidth={300}
            drawerPosition="right"
            renderDrawerContent={() => (
                <FilterDrawerContent
                    clearFilter={() => handleClearFilter()}
                    applyFilter={params => handleApplyFilter(params)}
                />
            )}
        >
            <SafeAreaView style={styles.container}>
                <TextInput
                    style={styles.searchBox}
                    placeholder="Search Movies..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={text => onSearchChange(text)}
                />

                <FlatList
                    refreshing={refreshing}
                    onRefresh={() => handleClearFilter()}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    data={movies}
                    extraData={movies}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <MoviesItem item={item} navigation={navigation} />
                    )}
                    keyExtractor={(item, index) => `${item.id}_${index}`}
                    onEndReached={({ distanceFromEnd }) => {
                        if (distanceFromEnd < 0) return
                        handleEndReached()
                    }}
                    onEndReachedThreshold={0.2}
                    ListEmptyComponent={
                        <View
                            style={{
                                flex: 1,

                                backgroundColor: 'black',
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={styles.noMoviesText}>
                                No movies available
                            </Text>
                        </View>
                    }
                />
            </SafeAreaView>
        </Drawer>
    )
}
export default AllMovies

import React, { useState } from 'react'
import { View, Text, Button, Pressable } from 'react-native'
import GenreFilterOptions from '../filters/GenreFilterOptions'
import { StyleSheet } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from './styles'

const FilterDrawerContent = ({ closeDrawer, applyFilter, clearFilter }) => {
    const [selectedGenre, setSelectedGenre] = useState([])
    // const [fromDate, setFromDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    function onGnereSelection(genreId) {
        setSelectedGenre(prevSelectedGenre => {
            const index = prevSelectedGenre.findIndex(g => g === genreId)
            if (index !== -1) {
                return prevSelectedGenre.filter(g => g !== genreId)
            } else {
                return [...prevSelectedGenre, genreId]
            }
        })
    }

    function handleApplyFilterClick() {
        const params = {
            with_genres: selectedGenre.join(','),
            // from: fromDate,
        }

        applyFilter(params)
    }

    function handleClearFilter() {
        setSelectedGenre([])
        clearFilter()
    }

    return (
        <View
            style={{
                flex: 1,
                padding: 16,
                backgroundColor: 'black',
                justifyContent: 'space-between',
            }}
        >
            <View>
                <ScrollView>
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 20,
                            marginBottom: 15,
                        }}
                    >
                        Genres
                    </Text>
                    <GenreFilterOptions
                        selectedGenre={selectedGenre}
                        onGnereSelection={genreId => onGnereSelection(genreId)}
                    />

                    <View
                        style={{
                            marginTop: 10,
                            borderBottomColor: 'white',
                            borderBottomWidth: 1,
                        }}
                    />

                    {/* <View style={styles.datePickerContainer}>
                        <Button title="Open" onPress={() => setOpen(true)} />
                        <TextInput
                            value={fromDate.toDateString()}
                            editable={false}
                            placeholder="From date"
                        />
                        {open && (
                            <DateTimePicker
                                value={fromDate}
                                onChange={(event, newDate) => {
                                    const date = newDate.split('T')[0]
                                    setOpen(false)
                                    setFromDate(date)
                                }}
                                mode="date"
                            />
                        )}
                    </View> */}
                </ScrollView>
            </View>

            <View
                style={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Pressable
                    style={styles.filterButton}
                    onPress={() => handleApplyFilterClick()}
                >
                    <Text style={{ color: 'white' }}>Apply Filter</Text>
                </Pressable>
                <Pressable
                    style={styles.filterButton}
                    onPress={() => handleClearFilter()}
                >
                    <Text style={{ color: 'white' }}>Clear Filter</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default FilterDrawerContent

// const styles = StyleSheet.create({
//     datePickerContainer: {
//         flex: 1,
//         marginTop: 10,
//         backgroundColor: '#F5FCFF',
//     },
// })

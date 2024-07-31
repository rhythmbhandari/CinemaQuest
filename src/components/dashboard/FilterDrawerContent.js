import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import GenreFilterOptions from '../filters/GenreFilterOptions'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from './styles'

const FilterDrawerContent = ({ closeDrawer, applyFilter, clearFilter }) => {
    const [selectedGenre, setSelectedGenre] = useState([])
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [openFromDate, setOpenFromDate] = useState(false)
    const [openToDate, setOpenToDate] = useState(false)

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
            'primary_release_date.gte': fromDate.toISOString().split('T')[0],
            'primary_release_date.lte': toDate.toISOString().split('T')[0],
        }
        applyFilter(params)
    }

    function handleClearFilter() {
        setSelectedGenre([])
        setFromDate(new Date())
        setToDate(new Date())
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
                    <Text style={styles.filterHeader}>Genres</Text>
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
                    <Text style={styles.filterHeader}>Date</Text>
                    <View style={styles.datePickerContainer}>
                        <Pressable onPress={() => setOpenFromDate(true)}>
                            <Text style={styles.datePickerLabel}>
                                Select From Date
                            </Text>
                        </Pressable>
                        <TextInput
                            value={fromDate.toDateString()}
                            editable={false}
                            style={styles.datePickerTextInput}
                        />
                        {openFromDate && (
                            <DateTimePicker
                                value={fromDate}
                                onChange={(event, newDate) => {
                                    setOpenFromDate(false)
                                    setFromDate(newDate)
                                    setToDate(newDate)
                                }}
                                mode="date"
                                textColor="white"
                                themeVariant="dark"
                                style={styles.datePicker}
                            />
                        )}
                    </View>
                    <View style={styles.datePickerContainer}>
                        <Pressable onPress={() => setOpenToDate(true)}>
                            <Text style={styles.datePickerLabel}>
                                {' '}
                                Select To Date
                            </Text>
                        </Pressable>
                        <TextInput
                            value={toDate.toDateString()}
                            editable={false}
                            placeholder="To date"
                            style={styles.datePickerTextInput}
                        />
                        {openToDate && (
                            <DateTimePicker
                                value={toDate}
                                onChange={(event, newDate) => {
                                    setOpenToDate(false)
                                    if (newDate && newDate >= fromDate) {
                                        setToDate(newDate)
                                    } else {
                                        setToDate(toDate)
                                    }
                                }}
                                mode="date"
                                textColor="white"
                                themeVariant="dark"
                                style={styles.datePicker}
                            />
                        )}
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
                </ScrollView>
            </View>
        </View>
    )
}
export default FilterDrawerContent

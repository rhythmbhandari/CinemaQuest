import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const genres = [
    { value: 28, label: 'Action' },
    { value: 12, label: 'Adventure' },
    { value: 16, label: 'Animation' },
    { value: 35, label: 'Comedy' },
    { value: 80, label: 'Crime' },
    { value: 99, label: 'Documentary' },
    { value: 18, label: 'Drama' },
    { value: 10751, label: 'Family' },
    { value: 14, label: 'Fantasy' },
    { value: 36, label: 'History' },
    { value: 27, label: 'Horror' },
    { value: 10402, label: 'Music' },
    { value: 9648, label: 'Mystery' },
    { value: 10749, label: 'Romance' },
    { value: 878, label: 'Science Fiction' },
    { value: 10770, label: 'TV Movie' },
    { value: 53, label: 'Thriller' },
    { value: 10752, label: 'War' },
    { value: 37, label: 'Western' },
]

const GenreFilterOptions = ({ onGnereSelection, selectedGenre }) => {
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {genres.map(genre => (
                <TouchableOpacity
                    key={genre.value}
                    onPress={() => onGnereSelection(genre.value)}
                >
                    <View
                        style={{
                            borderColor: 'white',
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderWidth: 1,
                            borderRadius: 20,
                            backgroundColor: selectedGenre.includes(genre.value)
                                ? 'rgb(1, 180, 228)'
                                : 'black',
                        }}
                    >
                        <Text style={{ color: 'white' }}>{genre.label}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default GenreFilterOptions

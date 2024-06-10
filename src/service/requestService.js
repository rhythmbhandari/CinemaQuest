
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZThmNzI2NmNlNDMwZGMyNzM2NDI5YjlmYmE4Mzc5ZiIsInN1YiI6IjY2NGE1MzVhN2UzZjJkMTczNzY2MjI4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yd52wGiqhohRucVYDCJuedv3MEs_uEqJW1L6ijDMyXI'
    }
};

export const fetchMovies = async (type, fetchAllPages = false) => {
    let allMovies = [];
    let currentPage = 1;

    try {
        while (true) {
            // console.log(`Fetching movies for type: ${type}, page: ${currentPage}`);
            const response = await fetch(`https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${currentPage}`, options);
            const responseJson = await response.json();
            // console.log(`Response for type: ${type}, page: ${currentPage}`, responseJson);
            allMovies = [...allMovies, ...responseJson.results];
            if (!fetchAllPages || currentPage >= 20) {
                break;
            }
            currentPage++;
        }

        // Filter out duplicate movies
        const uniqueMovies = allMovies.reduce((acc, movie) => {
            if (!acc.some(m => m.id === movie.id)) {
                acc.push(movie);
            }
            return acc;
        }, []);

        return uniqueMovies;
    } catch (error) {
        throw error;
    }
}


export const fetchMovieDetails = async (movieId) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options);
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        throw error;
    }
};

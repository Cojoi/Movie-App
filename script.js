const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmYzYzNkY2U0Njg5NDdjMmZhN2I0ZDMyNzE5ZWNmOCIsInN1YiI6IjY1MDMwOTY5ZDdkY2QyMDBhY2IxYTQ3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iVwd2XYQE-o2wn8MXdy-SSr1vNqfHJLBIm9hWEKC2V0'
  }
};

document.getElementById('searchButton').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value;
  if (query) {
    fetchMovies(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`);
  }
});

function fetchMovies(url) {
  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      const movieList = document.querySelector(".movie-list");
      movieList.innerHTML = ''; // Clear previous results

      if (movies && movies.length > 0) {
        movies.forEach(movie => {
          const name = movie.title;
          const releaseDate = movie.release_date ? movie.release_date : 'N/A';
          const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/150';
          const movieCard = document.createElement('div');
          movieCard.classList.add('movie-card');
          movieCard.innerHTML = `
            <img src="${poster}" alt="${name}">
            <h2>${name}</h2>
            <p>${releaseDate}</p>
          `;
          movieList.appendChild(movieCard);
        });
      } else {
        movieList.innerHTML = '<p>No movies found</p>';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      const movieList = document.querySelector(".movie-list");
      movieList.innerHTML = '<p>Error fetching movies</p>';
    });
}

// Fetch popular movies when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchMovies('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
});
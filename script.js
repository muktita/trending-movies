
const apiKey = "d875e116b4bddae208b929f33f44217d";



const apiUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;
const moviesContainer = document.getElementById("movies");


// Fetch movies from the API

async function fetchMovies() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const topTenMovies = data.results.slice(0, 10);

    // Top 10 trending movie using slice
    topTenMovies.forEach((media) => {
      const movieCard = createMovieCard(media);
      moviesContainer.appendChild(movieCard);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}



function createMovieCard(media) {
  const {
    title,
    name,
    genre_ids,
    backdrop_path,
    release_date,
    overview,
    vote_average,
    poster_path,
  } = media;

  const movieCard = document.createElement("div");
  movieCard.classList.add("movie_card");

  const year = release_date ? release_date.split("-")[0] : "N/A"; // Extract the year from the release date
  const mediaType = title ? "Movie" : "TV Show"; // Determine if it's a movie or TV show based on the presence of a title

  // Construct the card HTML
  movieCard.innerHTML = `
        <div class="info_section">
            <div class="movie_header">
                <img class="locandina" src="https://image.tmdb.org/t/p/w500/${backdrop_path}"/>
                <h1>${title || name}</h1>
                <h4>${year}</h4>
                <span class="minutes">Rating: ${vote_average}</span>
                <p class="type">${mediaType}</p>
            </div>
            <div class="movie_desc">
                <p class="text">${overview}</p>
            </div>
            <div class="movie_social">
                <ul>
                    <li><i class="material-icons">share</i></li>
                    <li><i class="material-icons"></i></li>
                    <li><i class="material-icons">chat_bubble</i></li>
                </ul>
            </div>
        </div>
        <div class="blur_back"></div> <!-- Optionally, set the background image here -->
    `;

  // For blur_back, consider setting the background image dynamically if needed:
  movieCard.querySelector(
    ".blur_back"
  ).style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${poster_path}')`;

  return movieCard;
}

fetchMovies();

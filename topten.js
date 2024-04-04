const apiKey = "d875e116b4bddae208b929f33f44217d";
const contentContainer = document.getElementById("content-container");
const showMoviesBtn = document.getElementById("show-movies");
const showTvBtn = document.getElementById("show-tv");

// Toggle Btn
showMoviesBtn.addEventListener("click", () => switchContent("movie"));
showTvBtn.addEventListener("click", () => switchContent("tv"));

// Switch content between movies and TV shows
async function switchContent(type) {
  // Clear existing content first
  contentContainer.innerHTML = "";

  // Toggle between active class for the buttons
  showMoviesBtn.classList.toggle("active", type === "movie");
  showTvBtn.classList.toggle("active", type === "tv");

  // Fetch Movie or TV show based on the type
  const url = `https://api.themoviedb.org/3/trending/${type}/week?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const topTenMedia = data.results.slice(0, 10); // Display top 10 trending movies or TV shows

    // Display each movie or TV show card
    topTenMedia.forEach((media) => {
      const mediaCard = createMovieCard(media);
      contentContainer.appendChild(mediaCard);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Movie Card
function createMovieCard(media) {
  const {
    title,
    name,
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

  // Construct the card HTML, including handling the possibility of missing poster_path or backdrop_path
  const imagePath = backdrop_path
    ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
    : "https://via.placeholder.com/500x281?text=Image+Not+Available"; // Placeholder in case the image is missing
  movieCard.innerHTML = `
        <div class="info_section">
            <div class="movie_header">
                <img class="locandina" src="${imagePath}"/>
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
        <div class="blur_back" style="background-image: url('${imagePath}');"></div>
    `;

  return movieCard;
}

// Initially load movies
switchContent("movie");

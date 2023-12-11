document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const movieDetails = document.getElementById('movieDetails');

  searchBtn.addEventListener('click', function () {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
      movieDetails.innerHTML = 'Please enter a movie name.';
      return;
    }

    const apiKey = '3062df94'
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(searchTerm)}`;


    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'True') {
          const { Title, Poster, Plot, Year } = data;
          movieDetails.innerHTML = `
            <div>
              <img src="${Poster}" alt="${Title} Poster" class="mb-4 m-auto">
            </div>
            <div>
              <h2 class="text-2xl mb-4 font-semibold">${Title} ( ${Year} )</h2>
              <h3 class="text-xl text-slate mb-4">${Plot}</h3>
            </div>
            `;
        } else {
          movieDetails.innerHTML = 'Movie not found!';
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        movieDetails.innerHTML = 'An error occurred while fetching data.';
      });
  });
});

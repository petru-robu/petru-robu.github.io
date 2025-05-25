document.addEventListener('DOMContentLoaded', () => {
  let movieData = [];

  const tableBody = document.getElementById('movie-list');

  function renderTable(data) {
    tableBody.innerHTML = '';
    data.forEach(movie => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><a href="${movie.link}" target="_blank">${movie.name}</a></td>
        <td>${movie.year}</td>
        <td>${movie.rating}/10</td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Fetch JSON
  fetch('movies.json')
    .then(response => response.json())
    .then(data => {
      movieData = data;
      renderTable(movieData);
    })
    .catch(error => {
      console.error('Error loading movie data:', error);
    });

  // Sorting functions
  document.getElementById('sort-name').addEventListener('click', e => {
    e.preventDefault();
    movieData.sort((a, b) => a.name.localeCompare(b.name));
    renderTable(movieData);
  });

  document.getElementById('sort-year').addEventListener('click', e => {
    e.preventDefault();
    movieData.sort((a, b) => a.year - b.year);
    renderTable(movieData);
  });

  document.getElementById('sort-rating').addEventListener('click', e => {
    e.preventDefault();
    movieData.sort((a, b) => b.rating - a.rating);
    renderTable(movieData);
  });
});

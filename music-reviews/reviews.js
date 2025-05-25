document.addEventListener('DOMContentLoaded', () => {
  let musicData = [];

  const tableBody = document.getElementById('music-list');

  function renderTable(data) {
    tableBody.innerHTML = '';
    data.forEach(album => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${album.album}</td>
        <td>${album.artist}</td>
        <td>${album.genre}</td>
        <td>${album.year}</td>
        <td>${album.rating}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  fetch('albums.json')
    .then(response => response.json())
    .then(data => {
      musicData = data;
      renderTable(musicData);
    })
    .catch(error => {
      console.error('Error loading music data:', error);
    });

  document.getElementById('sort-album').addEventListener('click', e => {
    e.preventDefault();
    musicData.sort((a, b) => a.album.localeCompare(b.album));
    renderTable(musicData);
  });

  document.getElementById('sort-artist').addEventListener('click', e => {
    e.preventDefault();
    musicData.sort((a, b) => a.artist.localeCompare(b.artist));
    renderTable(musicData);
  });

  document.getElementById('sort-genre').addEventListener('click', e => {
    e.preventDefault();
    musicData.sort((a, b) => a.genre.localeCompare(b.genre));
    renderTable(musicData);
  });

  document.getElementById('sort-year').addEventListener('click', e => {
    e.preventDefault();
    musicData.sort((a, b) => a.year - b.year);
    renderTable(musicData);
  });

  document.getElementById('sort-rating').addEventListener('click', e => {
    e.preventDefault();
    musicData.sort((a, b) => b.rating - a.rating);
    renderTable(musicData);
  });
});

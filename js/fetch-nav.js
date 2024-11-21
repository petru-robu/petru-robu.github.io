document.addEventListener('DOMContentLoaded', () => {
    console.log(document.getElementById('navbar'))

    fetch('../navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('navbar').innerHTML = html;
        })
        .catch(error => console.error('Error loading navbar:', error));
});
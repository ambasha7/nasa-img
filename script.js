
const apiBaseUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

// Function to get the current date in YYYY-MM-DD format
function getCurrentDate() {
    return new Date().toISOString().split("T")[0];
}

// Call getImageOfTheDay with the current date when the page loads
window.addEventListener('load', () => {
    const currentDate = getCurrentDate();
    getImageOfTheDay(currentDate);
});


function getCurrentImageOfTheDay() {
    fetch(apiBaseUrl)
    .then(response => response.json())
        .then(data => {
            displayImage(data);
        })
        .catch(error => {
            console.log('Error fetching APOD data:', error);
        });
}

function getImageOfTheDay(date) {
    const apiUrl = `${'https://api.nasa.gov/planetary/apod'}?api_key=${apiKey}&date=${date}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayImage(data);
            saveSearch(date);
            addSearchToHistory();
        })
        .catch(error => {
            console.log('Error fetching APOD data:', error);
        });
}

function displayImage(data) {
    const imageContainer = document.getElementById('current-image-container');
    imageContainer.innerHTML = '';

    if (data.media_type === 'image') {
        const heading = document.createElement('h1');
        heading.textContent = `NASA image of The Day ${data.date}`;

        const image = document.createElement('img');
        image.src = data.url;
        image.alt = data.title;

        const title = document.createElement('h2');
        title.textContent = data.title;

        const explanation = document.createElement('p');
        explanation.textContent = data.explanation;

        imageContainer.appendChild(heading);
        imageContainer.appendChild(image);
        imageContainer.appendChild(title);
        imageContainer.appendChild(explanation);
    } else {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'No image found for the selected date.';
        imageContainer.appendChild(errorMessage);
    }
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];

    // Check if the date is not already in the array
    if (!searches.includes(date)) {
        searches.push(date); // Add the date to the array
        localStorage.setItem('searches', JSON.stringify(searches));
    }
}

function addSearchToHistory() {
    const searchHistory = document.getElementById('search-history');
    searchHistory.innerHTML = '';

    const searches = JSON.parse(localStorage.getItem('searches')) || [];

    for (const search of searches) {
        const li = document.createElement('li');
        li.textContent = search;
        li.addEventListener('click', () => {
            getImageOfTheDay(search);
        });
        searchHistory.appendChild(li);
    }
}

// Call addSearchToHistory when the page loads to display previous searches
window.addEventListener('load', addSearchToHistory);



const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchInput = document.getElementById('search-input').value;
    if (searchInput) {
        getImageOfTheDay(searchInput);
    }
});
// Function to clear the search history from local storage
function clearSearchHistory() {
    localStorage.removeItem('searches');
}

// Call clearSearchHistory when the page loads to clear the search history
window.addEventListener('load', clearSearchHistory);

window.addEventListener('load', getCurrentImageOfTheDay);
const themeBtn = document.getElementById('themeBtn');

function changeTheme () {
    themeBtn.value = clicked;
    if (themeBtn.value = clicked){
        <style>
            body{Background-color = white;}
     </style>
    }
    else if(themeBtn.value = not-clicked){
         <style>
            body{Background-color = black;}
     </style>
    }
    else{
         <style>
            body{Background-color = black;}
     </style>
    }
}

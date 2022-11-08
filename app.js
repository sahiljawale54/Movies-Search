const API_KEY = 'bf151074d088b89e1048d139030920c2';
const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMGPATH = 'https://image.tmdb.org/t/p/w500';
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const search = document.getElementById('search'); 
const form = document.getElementById('form');
const main = document.getElementById('main');  


//initially getting fav movies by popularity
getMovies(APIURL);



//fetching the data from TMDB API
async function getMovies(url){
    const response = await fetch(url);
    const responseData = await response.json();
    
    //invoked for showing the movies
    showMovies(responseData.results);
}

//displaying movies
function showMovies(movies){
    //clear main
    main.innerHTML = '';
    
    //iterating through the movies object
    if(movies.length==0)
     {
         alert("No match found Please contact developer developer@gmail.com")
         getMovies(APIURL);
         

     }
    movies.forEach((movie) => {
        const {poster_path, title, vote_average, overview} = movie;
        const movieEl1 = document.createElement('div');
        movieEl1.classList.add('movie');
        
        movieEl1.innerHTML = `
        <img src=${IMGPATH + poster_path} alt=${title}>
        <div class="movie-info">
        <h3>${title}</h3>
        <span class=${getClassByRate(vote_average)}>${vote_average}</span>
        </div>
        
        <div class="overview">
        <h4>Overview:</h4>
        ${overview}
        </div>       
        `;
        main.appendChild(movieEl1);
    });
}

//adding 
function getClassByRate(vote){
    if (vote >= 8) {
        return 'green';
    }else if(vote >= 5){
        return 'orange';
    }
}

// Searching the movie
form.addEventListener('submit', function(e){
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm){
        getMovies(SEARCHAPI + searchTerm);
        search.value = '';
    }
});

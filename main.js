//search through TV Maze library
const form = document.querySelector("#searchForm");
const container = document.querySelector("#contentContainer");
let movieLink = [];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  container.innerHTML = "";
  const movieName = form.elements.tvShowTitle.value;
  printMovieData(movieName);
});

const printMovieData = async function (movieName) {
  let movieData;
  movieData = await getMovieData(movieName)
    .then((data) => {
      movieData = data;
      for (movies of movieData) {
        if (movies.show.image) {
          const img = document.createElement("img");
          const figCaption = document.createElement("figCaption");
          figCaption.classList.add("text-center");
          const figure = document.createElement("figure");
          img.classList.add("spacetheImages");
          if (movies.show.rating.average) {
            figCaption.innerText = `IMDB : ${movies.show.rating.average}`;
          } else {
            figCaption.innerText = "No IMDB Rating found";
          }
          img.src = movies.show.image.medium;
          figure.append(img);
          figure.append(figCaption);
          container.append(figure);
        }
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
//https://stackoverflow.com/questions/47604040/how-to-get-data-returned-from-fetch-promise/47604112
const getMovieData = async function (query) {
  return fetch(`https://api.tvmaze.com/search/shows?q=${query}`).then((res) => {
    const data = res.json();
    return data;
  });
};

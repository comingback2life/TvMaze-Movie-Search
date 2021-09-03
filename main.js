//search through TV Maze library
const form = document.querySelector("#searchForm");
let movieLink = [];
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const printMovieData = function () {
  let movieData;
  const queryString = "suits";
  getMovieData(queryString).then((data) => {
    movieData = data;
    console.log(movieData);
    for (let i = 0; i < movieData.length; i++) {
      console.log(movieData[i].show.image);
      if (movieData[i].show.image === null) {
        console.log(movieData[i].show.name);
      }
      movieLink = movieData[i].show.image;
    }
  });
};

const getMovieData = async function (query) {
  return await fetch(`https://api.tvmaze.com/search/shows?q=${query}`).then(
    async (res) => {
      const data = await res.json();
      return data;
    }
  );
};
printMovieData();

const searchBtnDOM = document.getElementById("searchBtn");
const cardList = document.getElementById("cardList");
const form = document.getElementById("form");
const input = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmUzMTJjYTQyMTY3YWEzYTYxMmM0NmJjNjdiZTU4NiIsInN1YiI6IjY1MmYyNTlkYTgwMjM2MDExYWM3YzBiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.njfFp-h_Xr_eveVOIyI4_exwO1zWRtnpohvfcdIqVVA"
  }
};

function getTopRatedMovies(value) {
  console.log("value => ", value);
  fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", options)
    .then((response) => response.json())
    .then((data) => {
      if (value) {
        const newData = {
          ...data,
          results: data.results.filter((v) => {
            return v.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
          })
        }; // fetch해서 가져온 데이타와 input.value를 이용해서 원하는 데이터를 찾은뒤에 newData 변수에 할당한다.
        console.log(newData.results);
        renderMovies(newData);
        return;
      }
      renderMovies(data);
    }) // .then(data => renderMovies(data))
    .catch((err) => console.error(err));
}

function renderMovies(data) {
  // console.log(data)
  // console.log(data.results);
  // console.log(JSON.stringify(data));
  cardList.innerHTML = "";
  data.results.forEach((element) => {
    cardList.innerHTML += `
    <div class="movieCard" id=${element.id}>
        <img
          src="https://image.tmdb.org/t/p/w500/${element.poster_path}"
          alt="${element.title}"
        /> b
        <div class="back">
          <div class="movieInfo">
            <h3>${element.title}</h3>
            <span class="vote_average">Percent : ${Math.ceil(element.vote_average) * 10}%</span>
          </div>
          <div class="overview">
            <h4>overveiw</h4>
            ${element.overview}
          </div>
        </div>
      </div>
    `;
  });

  const movieCard = document.querySelectorAll(".movieCard");

  movieCard.forEach((movie) => {
    console.log(movie.id);
    movie.addEventListener("click", function () {
      return (location.href = `/detail_page.html?movie_id=${movie.id}`);
    });
  });
}

getTopRatedMovies();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  input.addEventListener("keyup", () => {
    e.preventDefault(); // 새로고침 방지
    if (e.key === "Enter") {
      if (input.value !== "") {
        getTopRatedMovies(input.value);
        input.value = ""; // 검색 완료되면 검색창 빈값
      } else {
        alert("검색 결과가 없습니다.");
        location.reload();
      }
    }
  });

  searchBtn.addEventListener("click", () => {
    if (input.value !== "") {
      getTopRatedMovies(input.value);
      input.value = "";
    } else {
      alert("검색 결과가 없습니다.");
      location.reload();
    }
  });
});

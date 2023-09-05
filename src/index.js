import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39240631-8a58999efa7d66452fb176341';
const container = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const input = document.querySelector('[name="searchQuery"]');

form.addEventListener('submit', searchFoto);
function searchFoto(e) {
  e.preventDefault();
  const currentFoto = input.value;
  getFoto(currentFoto);
}

function getFoto(currentFoto) {
  return axios
    .get(`${BASE_URL}`, {
      params: {
        q: currentFoto,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data)
    .then(data => {
      container.innerHTML = createMarkup(data);
    })
    .catch(error => {
      //   console.log(error.message);
      //   if (error.response.status === 401) {
      //     Notiflix.Notify.info('authorized!!!!');
      //   }
      //   if (error.message === 'Network Error') {
      //     Notiflix.Notify.warning('Bad request!!!!');
      //   }
    });
}

function createMarkup(data) {
  const hits = data.hits;
  return hits
    .map(
      item => `<div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:${item.likes}</b>
    </p>
    <p class="info-item">
      <b>Views:${item.views}</b>
    </p>
    <p class="info-item">
      <b>Comments:${item.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:${item.downloads}</b>
    </p>
  </div>
</div> `
    )
    .join('');
}

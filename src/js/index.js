import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39240631-8a58999efa7d66452fb176341';
const container = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const input = document.querySelector('[name="searchQuery"]');
const button = document.querySelector('.load-more');
let page = 1;

button.addEventListener('click', loadFoto);

function loadFoto(e) {
  page += 1;
  getFoto();
}

form.addEventListener('submit', searchFoto);
function searchFoto(e) {
  container.innerHTML = ' ';
  e.preventDefault();
  const currentFoto = input.value;
  getFoto(currentFoto);
}

async function getFoto(currentFoto) {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        q: currentFoto,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
      },
    });
    const data = response.data;
    container.insertAdjacentHTML('beforeend', createMarkup(data));
    button.classList.remove('is-hidden');

    if (page === 1) {
      Notiflix.Notify.info(`"Hooray! We found ${data.totalHits} images."`);
    }
  } catch (error) {
    button.classList.add('is-hidden');
    Notiflix.Notify.warning(
      '"Sorry, there are no images matching your search query. Please try again."'
    );
  }
}

function createMarkup(data) {
  const hits = data.hits;
  return hits
    .map(
      item => `<div class="photo-card">
  <img src="${item.webformatURL}" width = '300px' height="300px" alt="${item.tags}" loading="lazy" />
  <div class="info">
  <div class="info-parts">
    <p class="info-item">
      <b>Likes</b>
    </p><p class="values">${item.likes}</p></div>
    <div class="info-parts">
    <p class="info-item">
      <b>Views</b>
    </p> <p class="values">${item.views}</p></div>
    <div class="info-parts">
    <p class="info-item">
      <b>Comments</b>
    </p><p class="values">${item.comments}</p></div>
    <div class="info-parts">
    <p class="info-item">
      <b>Downloads</b>
    </p><p class="values">${item.downloads}</p></div>
  </div>
</div> `
    )
    .join('');
}

// styles

container.style.display = 'flex';
container.style.gap = '10px';
container.style.flexWrap = 'wrap';
container.style.justifyContent = 'center';
form.style.textAlign = 'center';
form.style.margin = '30px';

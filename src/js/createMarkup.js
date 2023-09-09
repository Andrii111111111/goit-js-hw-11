export function createMarkup(data) {
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

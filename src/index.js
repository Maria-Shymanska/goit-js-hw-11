import simpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchPictures from './js/fetchPictures';
import { refs } from './js/refs';
import createOneAnimal from './js/createPicturesList';
import smoothScrollToBottomPage from './js/addScrollButton';

let currentPage = 1;
refs.btnLoadMoreEl.classList.add('hide');
const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionSelector: 'img',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

refs.formEl.addEventListener('submit', onSubmitForm);
refs.btnLoadMoreEl.addEventListener('click', onClickBtnLodeMore);

function onSubmitForm(event) {
  event.preventDefault();
  refs.btnLoadMoreEl.classList.add('hide');
  const searchName = event.currentTarget.elements.searchQuery.value
    .trim()
    .toUpperCase();
  clearGalleryList();
  currentPage = 1;
  convertFetchResults(searchName, currentPage);
}
function onClickBtnLodeMore() {
  currentPage += 1;
  const searchName = refs.inputEl.value.trim().toUpperCase();
  convertFetchResults(searchName, currentPage);
}
async function convertFetchResults(searchQuery, currentPage) {
  try {
    const fetchResult = await fetchPictures(searchQuery, currentPage);
    if (currentPage === 1) {
      Notify.info(`Hooray! We found ${fetchResult.totalHits} images.`);
    }
    filterFetchResult(fetchResult);
  } catch (error) {
    console.log(error);
  }
}
function filterFetchResult(fetchResult) {
  if (currentPage === Math.ceil(fetchResult.totalHits / 40)) {
    insertCreatedAnimals(fetchResult.hits);
    refs.btnLoadMoreEl.classList.add('hide');
    Notify.info("We're sorry, but you've reached the end of search results.");
    smoothScrollToBottomPage();
    lightbox.refresh();
    return;
  } else if (fetchResult.total === 0) {
    refs.btnLoadMoreEl.classList.add('hide');
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  } else {
    insertCreatedAnimals(fetchResult.hits);
    refs.btnLoadMoreEl.classList.remove('hide');
    smoothScrollToBottomPage();
    lightbox.refresh();
    return;
  }
}
function clearGalleryList() {
  refs.galleryEl.innerHTML = '';
}

// Створи фронтенд частину застосунку пошуку і перегляду зображень за ключовим словом. Додай оформлення елементів інтерфейсу.
// Форма спочатку міститья в HTML документі. Користувач буде вводити рядок для пошуку у текстове поле, а по сабміту форми необхідно виконувати HTTP-запит.
// Для бекенду використовуй публічний API сервісу Pixabay.
// Список параметрів рядка запиту, які тобі обов'язково необхідно вказати:

// key - твій унікальний ключ доступу до API.
// q - термін для пошуку. Те, що буде вводити користувач.
// image_type - тип зображення. На потрібні тільки фотографії, тому постав значення photo.
// orientation - орієнтація фотографії. Постав значення horizontal.
// safesearch - фільтр за віком. Постав значення true.

// У відповіді буде масив зображень, що задовольнили критерії параметрів запиту.
// Кожне зображення описується об'єктом, з якого тобі цікаві тільки наступні властивості:

// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.
// Якщо бекенд повертає порожній масив, значить нічого підходящого не було знайдено.
// У такому разі показуй повідомлення з текстом "Sorry, there are no images matching your search query. Please try again.".
//  Для повідомлень використовуй бібліотеку notiflix.

// const axios = require('axios');
import axios from 'axios';

const API_KEY = '34465474-c3837bc3938f4efd53294c219';
const BASE_URL = 'https://pixabay.com/api/';

export default class PixabayApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchPicture() {
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: this.per_page,
    });

    const url = `${BASE_URL}?${searchParams}`;
    this.incrementPage();
    return await axios.get(url);
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get per_Page() {
    return this.per_page;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

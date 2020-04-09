// Функция сработает, когда все DOM элементы загружены
document.addEventListener('DOMContentLoaded', function () {
  getPhotos();
});

/**
 * Получить фотографии с сервера
 */
function getPhotos() {
  // Получаем выбранную категорию
  let category = get('category');
  if (!category) category = "people";

  // Создаём новый объект XMLHttpRequest
  let xhr = new XMLHttpRequest();
  // Конфигурируем его: GET-запрос на URL 'http://localhost:8081/api/'
  xhr.open('GET', `http://greentea.sundear.ru/api/category/${category}`, false);
  // Отсылаем запрос
  xhr.send();
  if (xhr.status != 200) {
    // обработать ошибку
    alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
  } else {
    // Изменить класс активной категории
    document.querySelector(".category-link").classList.remove("active");
    document.querySelector(`#link-${category}`).classList.add("active");
    // вывести результат
    let response = JSON.parse(xhr.responseText);
    AddPhotosDOM(response)
  }
}

/**
 * Добавить фотографии на страницу
 */
function AddPhotosDOM(photos) {
  photos.forEach(photo => {
    // Создание враппера
    let item = document.createElement("div");
    item.classList.add("grid-item")

    // Информация об изображении
    let info = document.createElement("div");
    info.classList.add("grid-item--info");

    // --- 
    let info_title = document.createElement("div");
    let info_description = document.createElement("div");
    let info_publishedBy = document.createElement("div");
    let info_createdBy = document.createElement("div");

    info_title.innerHTML = photo.title ? photo.title : "Без названия";
    info_description.innerHTML = photo.description;
    info_publishedBy.innerHTML = photo.publishedBy;
    info_createdBy.innerHTML = photo.createdBy;

    info.append(info_title);
    info.append(info_description);
    info.append(info_publishedBy);
    info.append(info_createdBy);
    // ---

    item.append(info)

    // Добавление изображения
    let img = document.createElement("img");
    img.src = photo.url;
    item.append(img)

    document.querySelector("#grid").append(item)
  });
}

/**
 * Функция получения GET параметров из строки запроса
 * https://stackoverflow.com/questions/831030/how-to-get-get-request-parameters-in-javascript
 */
function get(name) {
  if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
}
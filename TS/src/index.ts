import fetch from "node-fetch";

/**
 * Модуль ДОЛЖЕН вернуть массив объектов, полученный из запросов
 * Если при запросе будет ошибка/ки, то модуль ДОЛЖЕН вместо элемента массива возвращать ошибку/ки
 * В случае проблем с сетью модель не должен ронять приложение
 *
 * Дано: кто-то сделал этот весьма нерабочий и некрасивый код для браузера.
 * Нужно:
 * 1. Сделать его рабочим (тестировать можно хоть в консоли, прогнав код через ts, хоть сделать страницу)
 * 2. Сделать его красивым (если есть время и желание, понятие красоты -- личное)
 * 3. Сделать его быстрым (опять таки если есть время и желание и ещё есть, что ускорять)
 */

const fetchApi = async (url: string) => {
  return await fetch(url).then((response) => response.json());
};

const getRequestResults = async (urlsArray: string[]) => {
  try {
    const requests = urlsArray.map((url) => fetchApi(url));
    const results = await Promise.allSettled(requests);
    return results;
  } catch (error) {
    return error;
  }
};

/**
 * Делает "веер" запросов и возвращает все результаты в виде массива, сохраняя порядок URL-ов
 * @param additional дополнительные URL-ы для запроса
 */

export const createApiRequest = async (additional?: string[]) => {
  const urlsArray = [
    // "https://raw.githubusercontent.com/dmfilipenko/timezones.json/master/timezones.json",
    "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json",
    ...(additional ?? []),
  ];

  // Todo: прокинуть в функцию дженерик для того, чтобы нормально типизировать ответ
  return getRequestResults(urlsArray);
};

// Симуляция запроса с ошибкой
createApiRequest([
  "https://raw.githubusercontent.com/benoitvallon/100-worst-books/master/books.json",
]).then((results) => console.log(results));

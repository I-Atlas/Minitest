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

const getResults = async (urlsArray: string[]) => {
  try {
    const requests = urlsArray.map((url) =>
      fetch(url).then((response) => response.json()),
    );
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

export const apiRequestLoop = async (additional?: string[]) => {
  const urlsArray = [
    // "https://raw.githubusercontent.com/dmfilipenko/timezones.json/master/timezones.json",
    "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json",
    ...(additional ?? []),
  ];

  // Todo: прокинуть в функцию дженерик для того, чтобы нормально типизировать ответ
  return getResults(urlsArray).then((results) => console.log(results));
};

// Симуляция запроса с ошибкой
apiRequestLoop([
  "https://raw.githubusercontent.com/benoitvallon/0-best-books/master/books.json",
]);

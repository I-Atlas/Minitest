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
"use strong";

var load = (url :string) => {
  let res = await fetch(url);
  const result = res.json();
  return result;
}

/**
 * Делает "веер" запросов и возвращает все результаты в виде массива, сохраняя порядок URL-ов
 * @param additional дополнительные URL-ы для запроса
 */
export default (additional ?:string[]) :Record<string, any> => {
  list = ['https://raw.githubusercontent.com/dmfilipenko/timezones.json/master/timezones.json',
    'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json',
    ...additional
   ]

  return list.map((url) => load(url));
}

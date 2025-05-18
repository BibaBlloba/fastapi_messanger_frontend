/**
 * Форматирует дату из ISO-формата в удобочитаемый вид
 * @param {string} isoDate - Дата в формате "2025-05-17T14:38:38.029700"
 * @param {Object} [options] - Параметры форматирования
 * @param {boolean} [options.showTime=true] - Показывать время
 * @param {boolean} [options.showYear=true] - Показывать год
 * @param {string} [options.monthFormat='long'] - Формат месяца ('long' или 'short')
 * @returns {string} Отформатированная строка (например "17 мая 2025, 14:38")
 */
export default function formatDate(isoDate, options = {}) {
  const {
    showTime = true,
    showYear = true,
    showDay = true,
    monthFormat = 'long'
  } = options;

  const date = new Date(isoDate);

  // Проверка на валидность даты
  if (isNaN(date.getTime())) {
    return 'Некорректная дата';
  }

  // Основные компоненты даты
  const day = showDay ? date.getDate() : null;
  const month = showDay ? date.toLocaleString('ru-RU', { month: monthFormat }) : null;
  const year = showYear ? date.getFullYear() : null;
  const time = showTime
    ? date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    : null;

  // Собираем конечную строку
  const dateParts = [];
  if (day) dateParts.push(String(day));
  if (month) dateParts.push(String(month));
  if (year) dateParts.push(String(year));
  if (time) dateParts.push(time);

  return dateParts.join(', ');
}

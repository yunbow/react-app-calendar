export const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDateReadable = (dateKey: string): string => {
  const [year, month, day] = dateKey.split('-');
  return `${year}年${parseInt(month)}月${parseInt(day)}日`;
};

export const getMonthNames = (): string[] => {
  return ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
};

export const getWeekdayNames = (): string[] => {
  return ['日', '月', '火', '水', '木', '金', '土'];
};

export const isSameDate = (date1: Date, date2: Date): boolean => {
  return formatDateKey(date1) === formatDateKey(date2);
};
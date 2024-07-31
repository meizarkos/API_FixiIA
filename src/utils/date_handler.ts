export function getStartAndEndOfMonth(){
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(),now.getDate(),11);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1,now.getDate(),11);

  const parseStart = parseDate(startOfMonth);
  const parseEnd = parseDate(endOfMonth);

  //return { parseStart, parseEnd };
  return { startOfMonth, endOfMonth };
};

export function parseDate(date: Date): String {
  var monthParse;
  if(date.getMonth() < 10){
    monthParse = '0' + (date.getMonth() + 1);
  }
  else{
    monthParse = date.getMonth() + 1;
  }
  var dayParse;
  if(date.getDate() < 10){
    dayParse = '0' + date.getDate();
  }
  else{
    dayParse = date.getDate();
  }
  const res = date.getFullYear() + '-' + (monthParse) + '-' + dayParse;
  return res;
}
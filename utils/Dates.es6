export function fromISOString(str) {
  let date = new Date();
  date.setTime(Date.parse(str));
  return date;
}
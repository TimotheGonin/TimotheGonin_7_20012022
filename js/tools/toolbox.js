export function capitalize(string){
  const newString = string.charAt(0).toUpperCase() +
  string.slice(1);
  return newString;
}
export function singular(string){
  const newString = string.slice(0,string.length - 1);
  return newString;
}
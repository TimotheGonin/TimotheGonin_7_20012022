export function capitalize(string){
  const newString = string.charAt(0).toUpperCase() +
  string.slice(1);
  return newString;
}
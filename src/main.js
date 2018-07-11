export const generateID = () => {
  let result = '';
  const possibilities = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 4; i++) { 
    result += possibilities.charAt(Math.floor(Math.random() * possibilities.length)); 
  }
  return result;
}

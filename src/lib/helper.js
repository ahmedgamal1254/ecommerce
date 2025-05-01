export function getRandomInRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function getToken(key){
  if (typeof window !== "undefined") {
    let item = localStorage.getItem(key);

    return item
  }

  return undefined;
}

export function setToken(key,value){
  if (typeof window !== "undefined") {
    localStorage.setItem([key],value);
  }
}


export function removeToken(value){
  if (typeof window !== "undefined") {
    localStorage.removeItem(value);
  }
}

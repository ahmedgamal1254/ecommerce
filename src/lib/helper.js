export function getRandomInRange(min, max) {
    console.log(Math.round(Math.random() * (max - min) + min))
    return Math.round(Math.random() * (max - min) + min);
  }
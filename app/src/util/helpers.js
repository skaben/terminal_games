export function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}


export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


export function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function getRandomFromArray(items) {
  return items[Math.floor(Math.random() * items.length)];
}


export function intersection(arrA, arrB) {
  return arrA.filter(x => arrB.includes(x));
}


export function chunkArrayInGroups(arr, size) {
  let myArray = [];
  for(let i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i+size));
  }
  return myArray;
}


export function objectFromArrays(arrA, arrB) {
  return Object.fromEntries(arrA.map((_, i) => [arrA[i], arrB[i]]));
}


export function dispatchEvent(source, eventName, detail={}) {
  const event = new CustomEvent(eventName, {
    cancelable: true,
    bubbles: true,
    detail: detail
  });
  source.dispatchEvent(event);
}

export function changeUrl(url) {
  window.history.pushState("", `page ${url}`, url);
  window.location.href = url;
}

export function goRoot() {
  return changeUrl('/main');
}

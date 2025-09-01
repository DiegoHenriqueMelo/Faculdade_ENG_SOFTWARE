let bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
};

let list = [
  1, 56, 234, 245, 9, 45, 89, 2, 6, 69, 6538, 3, 88, 4,
];

console.log(bubbleSort(list));

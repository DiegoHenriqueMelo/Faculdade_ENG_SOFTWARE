// Função Selection Sort - ordena array encontrando o menor elemento
let selectionSort = (array) => {
  // Loop externo: percorre cada posição do array
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i; // Assume que o primeiro elemento é o menor
    // Loop interno: encontra o menor elemento na parte não ordenada
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j; // Atualiza índice do menor elemento
      }
    }
    // Troca o menor elemento encontrado com o elemento da posição atual
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
  }
  return array;
};

// Array de exemplo com números desordenados
let list = [5,2,4,6,1,3];

// Executa o Selection Sort e exibe o resultado ordenado
console.log(selectionSort(list));

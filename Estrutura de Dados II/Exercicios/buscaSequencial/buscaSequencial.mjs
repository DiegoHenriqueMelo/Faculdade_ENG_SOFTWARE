let buscaSequencial = (vetor, valorBusca) => {
// é passado um vetor e uma comparação como parametro
  for (let i = 0; i < vetor.length; i++) {
  // estrutura de repetição para percorrer todo o vetor
    if (vetor[i] === valorBusca) {
    // comparação para retornar o indice do valor especifico
      return i
    }
  }
};

const vetor = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// vetor pode ser ordenado ou desordenado

console.log("Posição do valor 7 = ", buscaSequencial(vetor, 7));
// chamando a função, irá retornar apenas o INDICE

// RESULTADO NO CONSOLE
	// Posição do valor 7 = 6
	
//EXPLICAÇÂO
	// valores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	// indices =  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
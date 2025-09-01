	function buscaBinaria(vetor, valorBusca){
	// é passado um vetor e o valor de busca como parametro
    let ini = 0
    let fim = vetor.length - 1
    // variaveis definidas para auxilio da busca
    
    while(fim >= ini){
    // enquanto fim for maior ou igual ini, o processo irá se repitir

        let meio = Math.floor( (ini + fim)/2 )
        // meio recebe um valor arredondado, esse valor representa a metado do array
	      // meio tabem podeser referido como indice

        if(valorBusca === vetor[meio]){
        // se o valor de busca estiver exatamente no meio do array
            return meio
            // retorna indice
        }

        else if(valorBusca > vetor[meio]){
        // se o valor de busca estive para direita do meio
            ini = meio + 1
            // ini deixa de ser indice 0, e assume meio + 1
        }
        else{
        // se o valor estiver para esquerda do meio
            fim = meio - 1
            // ini deixa de ser indice 0, e assume meio -1
        }
    }
    return -1
}

let nums = [0, 11, 22, 33, 44, 55, 66, 77, 88, 99]
// array deve ter como OBRIGAÇÂO ser oredenado, caso contrario, a função não conseguirá referenciar um numero

console.log("Posição de 33: ", buscaBinaria(nums, 33))
console.log("Posição de 44: ", buscaBinaria(nums, 44))
console.log("Posição de 99: ", buscaBinaria(nums, 99))
console.log("Posição de 100: ", buscaBinaria(nums, 100))

// CONSOLE
// Posição de 33: 3
// Posição de 44: 4
// Posição de 99: 9
// Posição de 100: -1
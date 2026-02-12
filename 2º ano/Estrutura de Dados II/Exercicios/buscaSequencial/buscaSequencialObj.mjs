let buscaSequencialOBJ = (obj, fnComp) => {
// é passado um vetor de objeto e uma função como parametro
  for (let i = 0; i < obj.length; i++) {
  // estrutura de repetição para percorrer todo o vetor
    if (fnComp(obj[i], "first_name", "AABRAO")) {
    // comparação para retornar o indice a partir do resultado da função
      return i; 
    }
  }
};

let fnComp = (objetoUnico, key, value) => {
// é passado um objeto, uma chave e um valor como parametro
  return objetoUnico[key] === value;
  // retorna o resultado da comparação
};

// objeto de exemplo, com seus respectivos chave e valor
export const objNomes = [
  {
    first_name: "AABRAO",
    group_name: "ABRAAO",
    classification: "M",
    frequency_female: null,
    frequency_male: 26,
    frequency_total: 26,
    frequency_group: 32296,
    ratio: 1,
    alternative_names:
      "ABRAAO|ABRAHAO|ABRAO|ABRHAO|ABRRAO|ADRAAO|ADRAO|HABRAAO|HABRAO",
  }
]

console.log(buscaSequencialOBJ(objNomes, fnComp));
// chamando a função, irá retornar apenas o INDICE

// RESULTADO NO CONSOLE
	// 0
	
//EXPLICAÇÂO
	// na função buscaSequencialOBJ(), tem um laço de repetição, que sempre irá chamar fnComp()
	// assim, ele sempre irá comparar objNomes[i], e vendo se key e value conhecidem.
	// retornando o valor do indice
function mergeSort(vetor) {
  if (vetor.length < 2) return vetor;

  let meio = Math.floor(vetor.length / 2);

  let vetEsq = vetor.slice(0, meio);
  let vetDir = vetor.slice(meio);

  console.log("esq", vetEsq);
  console.log("dir", vetDir);

  vetEsq = mergeSort(vetEsq);
  vetDir = mergeSort(vetDir);

  let posEsq = 0,
    posDir = 0,
    vetRes = [];

  while (posEsq < vetEsq.length && posDir < vetDir.length) {
    if (vetEsq[posEsq] < vetDir[posDir]) {
      console.log(vetEsq[posEsq] + "<" + vetDir[posDir]);
      vetRes.push(vetEsq[posEsq]);
      posEsq++;
    } else {
      console.log(vetEsq[posEsq] + ">" + vetDir[posDir]);

      vetRes.push(vetDir[posDir]);
      posDir++;
    }
  }
  let sobra;

  if (posEsq < posDir) {
    sobra = vetEsq.slice(posEsq);
  } else {
    sobra = vetDir.slice(posDir);
  }

  console.log("esq", vetEsq);
  console.log("dir", vetDir);
  return [...vetRes, ...sobra];
}

// let nums = [77,44,22,33,99,55,88,0,66,11]
// let numsOrd = mergeSort(nums)
// console.log({numsOrd})

// import {nomes} from "./data/nomes-desord.mjs"

// let nomesOrd = mergeSort(nomes)
// console.log({nomesOrd})

let arr = [532, 61, 17, 8, 9, 1, 46];
let arrOrd = mergeSort(arr);
console.log({ arrOrd });

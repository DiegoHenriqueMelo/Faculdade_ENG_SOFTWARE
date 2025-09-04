/*
Fatorial
5! = 5 * 4 * 3 * 2 * 1 (120)
4! = 4 * 3 * 2 * 1 (24)
3! = 3 * 2 * 1 (6)
2! = 2 * 1 (2)

Casos especiais:
1! = 1
0! = 1

Expressão Recursiva:
5! = 5 * 4!
4! = 4 * 3!
3! = 3 * 2!
2! = 2 * 1!
1! = 1

*/

function fatorial(n) {
  let res = 1;
  for (let i = n; i > 1; i--) {
    res *= i;
  }
  return res;
}

let f = 150;
// console.log(`Fatorial de ${f}: ${fatorial(f)}`);


function fatorialRec(n) {
  if (n <= 1) {
    return 1; //condição de saída
  }
  console.log(`Passando por recursividade ${n-1}`)
  return n * fatorialRec(n - 1);
}

let fc = 5;
console.log(`Fatorial Recursivo de ${fc}: ${fatorialRec(fc)}`);
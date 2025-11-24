import BinarySearchTree from './arvoreBuscaBinaria.mjs'

console.log('='.repeat(60))
console.log('TESTE DA ÁRVORE BINÁRIA DE BUSCA - DESAFIOS 1 a 4')
console.log('='.repeat(60))

// Criando a árvore
const arvore = new BinarySearchTree()

// Inserindo valores
console.log('\n📌 INSERINDO VALORES NA ÁRVORE:')
const valores = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 65, 90]
console.log(`Valores: ${valores.join(', ')}`)
valores.forEach(val => arvore.insert(val))

// Mostrando a árvore em ordem
console.log('\n📋 Árvore em ordem (in-order):')
const emOrdem = []
arvore.inOrderTraversal(val => emOrdem.push(val))
console.log(emOrdem.join(', '))

console.log('\n' + '='.repeat(60))
console.log('DESAFIO 1 - CONTAR NÓS E ALTURA DA ÁRVORE')
console.log('='.repeat(60))

console.log(`\n✅ Total de nós na árvore: ${arvore.countNodes()}`)
console.log(`✅ Altura da árvore: ${arvore.height()}`)

console.log('\n' + '='.repeat(60))
console.log('DESAFIO 2 - CONTAR FOLHAS DA ÁRVORE')
console.log('='.repeat(60))

console.log(`\n✅ Total de folhas: ${arvore.countLeaves()}`)

console.log('\n' + '='.repeat(60))
console.log('DESAFIO 3 - SOMAR TODOS OS VALORES DA ÁRVORE')
console.log('='.repeat(60))

console.log(`\n✅ Soma total dos valores: ${arvore.sumNodes()}`)

console.log('\n' + '='.repeat(60))
console.log('DESAFIO 4 - CONTAR NÓS MAIORES QUE UM VALOR X')
console.log('='.repeat(60))

const valorX = 30
console.log(`\n✅ Existem ${arvore.countGreaterThan(valorX)} nós com valor maior que ${valorX}.`)

const valorY = 50
console.log(`✅ Existem ${arvore.countGreaterThan(valorY)} nós com valor maior que ${valorY}.`)

const valorZ = 100
console.log(`✅ Existem ${arvore.countGreaterThan(valorZ)} nós com valor maior que ${valorZ}.`)

console.log('\n' + '='.repeat(60))
console.log('TESTANDO APÓS REMOÇÕES')
console.log('='.repeat(60))

// Removendo alguns valores
console.log('\n📌 REMOVENDO valores: 20, 30, 50')
arvore.remove(20)
arvore.remove(30)
arvore.remove(50)

console.log('\n📋 Árvore em ordem após remoções:')
const emOrdemAposRemocao = []
arvore.inOrderTraversal(val => emOrdemAposRemocao.push(val))
console.log(emOrdemAposRemocao.join(', '))

console.log(`\n✅ Total de nós restantes: ${arvore.countNodes()}`)
console.log(`✅ Altura da árvore: ${arvore.height()}`)
console.log(`✅ Total de folhas: ${arvore.countLeaves()}`)
console.log(`✅ Soma total dos valores: ${arvore.sumNodes()}`)
console.log(`✅ Nós com valor > 30: ${arvore.countGreaterThan(30)}`)

console.log('\n' + '='.repeat(60))
console.log('TESTE COMPLETO! ✨')
console.log('='.repeat(60))

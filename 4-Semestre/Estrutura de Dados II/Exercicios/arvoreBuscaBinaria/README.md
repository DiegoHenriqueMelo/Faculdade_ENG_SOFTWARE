# 🌳 Árvore Binária de Busca - Desafios Implementados

Este documento explica a solução dos 4 desafios implementados na classe `BinarySearchTree`, detalhando a lógica de cada método recursivo e suas iterações.

---

## 📋 Índice

1. [Desafio 1 - Contar Nós e Altura](#desafio-1---contar-nós-e-altura)
2. [Desafio 2 - Contar Folhas](#desafio-2---contar-folhas)
3. [Desafio 3 - Somar Valores](#desafio-3---somar-valores)
4. [Desafio 4 - Contar Nós Maiores que X](#desafio-4---contar-nós-maiores-que-x)
5. [Como Executar](#como-executar)
6. [Exemplos de Saída](#exemplos-de-saída)

---

## Desafio 1 - Contar Nós e Altura

### 🎯 Objetivo
Implementar dois métodos:
- `countNodes()`: Retorna a quantidade total de nós na árvore
- `height()`: Calcula a altura da árvore (número máximo de níveis)

### 💡 Solução

#### Método Público `countNodes()`
```javascript
countNodes() {
    return this.#countNodesRecursive(this.#root)
}
```
**Explicação:**
- Método de interface que chama a função recursiva privada
- Passa a raiz da árvore como ponto de partida
- Retorna o resultado da contagem total

#### Método Privado `#countNodesRecursive(root)`
```javascript
#countNodesRecursive(root) {
    // Caso base: árvore vazia
    if(root === null) return 0
    
    // Conta 1 (nó atual) + nós da subárvore esquerda + nós da subárvore direita
    return 1 + this.#countNodesRecursive(root.left) + this.#countNodesRecursive(root.right)
}
```

**Explicação linha por linha:**

1. **Linha 2-3:** Caso base da recursão
   - Se o nó é `null`, retorna 0 (não há nós para contar)
   - Condição de parada da recursão

2. **Linha 6:** Lógica recursiva
   - `1`: Conta o nó atual
   - `this.#countNodesRecursive(root.left)`: Conta todos os nós da subárvore esquerda (chamada recursiva)
   - `this.#countNodesRecursive(root.right)`: Conta todos os nós da subárvore direita (chamada recursiva)
   - Soma total: nó atual + esquerda + direita

**Exemplo de Iterações:**

Considere a árvore:
```
      50
     /  \
   30    70
   / \   / \
  20 40 60 80
```

**Chamadas recursivas:**
1. `countNodes(50)` → chama `countNodes(30)` e `countNodes(70)`
2. `countNodes(30)` → chama `countNodes(20)` e `countNodes(40)`
3. `countNodes(20)` → chama `countNodes(null)` e `countNodes(null)` → retorna 1
4. `countNodes(40)` → retorna 1
5. `countNodes(30)` → retorna 1 + 1 + 1 = 3
6. `countNodes(70)` → similar ao processo acima → retorna 3
7. `countNodes(50)` → retorna 1 + 3 + 3 = **7 nós**

---

#### Método Público `height()`
```javascript
height() {
    return this.#heightRecursive(this.#root)
}
```

#### Método Privado `#heightRecursive(root)`
```javascript
#heightRecursive(root) {
    // Caso base: árvore vazia tem altura 0
    if(root === null) return 0
    
    // A altura é 1 + a maior altura entre as subárvores esquerda e direita
    const leftHeight = this.#heightRecursive(root.left)
    const rightHeight = this.#heightRecursive(root.right)
    
    return 1 + Math.max(leftHeight, rightHeight)
}
```

**Explicação linha por linha:**

1. **Linha 2-3:** Caso base
   - Árvore vazia tem altura 0

2. **Linha 6:** Calcula altura da subárvore esquerda recursivamente

3. **Linha 7:** Calcula altura da subárvore direita recursivamente

4. **Linha 9:** Retorna a altura do nó atual
   - `1`: Conta o nível atual
   - `Math.max(leftHeight, rightHeight)`: Pega a maior altura entre as subárvores

**Exemplo de Iterações:**

Mesma árvore anterior:
```
      50        <- Nível 1
     /  \
   30    70     <- Nível 2
   / \   / \
  20 40 60 80   <- Nível 3
```

**Chamadas recursivas:**
1. `height(20)` → retorna 0 + 0 + 1 = 1
2. `height(40)` → retorna 1
3. `height(30)` → max(1, 1) + 1 = 2
4. `height(60)` → retorna 1
5. `height(80)` → retorna 1
6. `height(70)` → max(1, 1) + 1 = 2
7. `height(50)` → max(2, 2) + 1 = **3 níveis**

---

## Desafio 2 - Contar Folhas

### 🎯 Objetivo
Implementar o método `countLeaves()` que retorna quantos nós são folhas (não possuem filhos).

### 💡 Solução

#### Método Público `countLeaves()`
```javascript
countLeaves() {
    return this.#countLeavesRecursive(this.#root)
}
```

#### Método Privado `#countLeavesRecursive(root)`
```javascript
#countLeavesRecursive(root) {
    // Caso base: árvore vazia
    if(root === null) return 0
    
    // Se o nó não tem filhos, é uma folha
    if(root.left === null && root.right === null) return 1
    
    // Senão, soma as folhas das subárvores esquerda e direita
    return this.#countLeavesRecursive(root.left) + this.#countLeavesRecursive(root.right)
}
```

**Explicação linha por linha:**

1. **Linha 2-3:** Caso base
   - Se o nó é `null`, não há folhas, retorna 0

2. **Linha 6:** Verifica se é uma folha
   - `root.left === null && root.right === null`: Se o nó não tem filhos à esquerda nem à direita
   - Retorna 1 (encontrou uma folha)

3. **Linha 9:** Se não é folha, continua a busca
   - Soma recursivamente as folhas da subárvore esquerda e direita
   - **Importante:** Não soma +1, pois o nó atual não é folha

**Exemplo de Iterações:**

Árvore:
```
      50
     /  \
   30    70
   / \   / \
  20 40 60 80  <- Estas são folhas!
```

**Chamadas recursivas:**
1. `countLeaves(50)` → não é folha, chama esquerda e direita
2. `countLeaves(30)` → não é folha, chama esquerda e direita
3. `countLeaves(20)` → **é folha!** → retorna 1
4. `countLeaves(40)` → **é folha!** → retorna 1
5. `countLeaves(30)` → retorna 1 + 1 = 2
6. `countLeaves(70)` → similar → retorna 2
7. `countLeaves(50)` → retorna 2 + 2 = **4 folhas**

---

## Desafio 3 - Somar Valores

### 🎯 Objetivo
Criar o método `sumNodes()` que retorna a soma de todos os valores da árvore.

### 💡 Solução

#### Método Público `sumNodes()`
```javascript
sumNodes() {
    return this.#sumNodesRecursive(this.#root)
}
```

#### Método Privado `#sumNodesRecursive(root)`
```javascript
#sumNodesRecursive(root) {
    // Caso base: árvore vazia
    if(root === null) return 0
    
    // Soma: valor do nó atual + soma da subárvore esquerda + soma da subárvore direita
    return root.data + this.#sumNodesRecursive(root.left) + this.#sumNodesRecursive(root.right)
}
```

**Explicação linha por linha:**

1. **Linha 2-3:** Caso base
   - Se o nó é `null`, contribui com 0 para a soma

2. **Linha 6:** Lógica da soma recursiva
   - `root.data`: Valor do nó atual
   - `this.#sumNodesRecursive(root.left)`: Soma de todos os valores da subárvore esquerda
   - `this.#sumNodesRecursive(root.right)`: Soma de todos os valores da subárvore direita
   - Retorna a soma total

**Exemplo de Iterações:**

Árvore:
```
      50
     /  \
   30    70
   / \   / \
  20 40 60 80
```

**Chamadas recursivas:**
1. `sumNodes(20)` → 20 + 0 + 0 = 20
2. `sumNodes(40)` → 40 + 0 + 0 = 40
3. `sumNodes(30)` → 30 + 20 + 40 = 90
4. `sumNodes(60)` → 60
5. `sumNodes(80)` → 80
6. `sumNodes(70)` → 70 + 60 + 80 = 210
7. `sumNodes(50)` → 50 + 90 + 210 = **350**

---

## Desafio 4 - Contar Nós Maiores que X

### 🎯 Objetivo
Criar o método `countGreaterThan(x)` que conta quantos nós possuem valor maior que `x`.

### 💡 Solução

#### Método Público `countGreaterThan(x)`
```javascript
countGreaterThan(x) {
    return this.#countGreaterThanRecursive(this.#root, x)
}
```
**Explicação:**
- Recebe o valor `x` como parâmetro
- Passa `x` para a função recursiva juntamente com a raiz

#### Método Privado `#countGreaterThanRecursive(root, x)`
```javascript
#countGreaterThanRecursive(root, x) {
    // Caso base: árvore vazia
    if(root === null) return 0
    
    // Conta 1 se o valor do nó atual for maior que x, senão 0
    const currentCount = root.data > x ? 1 : 0
    
    // Soma com a contagem das subárvores esquerda e direita
    return currentCount + 
           this.#countGreaterThanRecursive(root.left, x) + 
           this.#countGreaterThanRecursive(root.right, x)
}
```

**Explicação linha por linha:**

1. **Linha 2-3:** Caso base
   - Se o nó é `null`, não há nada para contar, retorna 0

2. **Linha 6:** Verifica se o nó atual satisfaz a condição
   - `root.data > x`: Compara o valor do nó com `x`
   - Se for maior, conta 1; caso contrário, conta 0
   - Usa operador ternário para decisão

3. **Linha 9-11:** Soma total
   - `currentCount`: 0 ou 1 do nó atual
   - `this.#countGreaterThanRecursive(root.left, x)`: Contagem da subárvore esquerda
   - `this.#countGreaterThanRecursive(root.right, x)`: Contagem da subárvore direita
   - Retorna a soma total

**Exemplo de Iterações:**

Árvore com `x = 30`:
```
      50 ✓
     /  \
   30    70 ✓
   / \   / \
  20 40✓60✓80✓
```

**Chamadas recursivas para `countGreaterThan(30)`:**
1. `count(20, 30)` → 20 > 30? Não → 0 + 0 + 0 = 0
2. `count(40, 30)` → 40 > 30? Sim → 1 + 0 + 0 = 1
3. `count(30, 30)` → 30 > 30? Não → 0 + 0 + 1 = 1
4. `count(60, 30)` → 60 > 30? Sim → 1
5. `count(80, 30)` → 80 > 30? Sim → 1
6. `count(70, 30)` → 70 > 30? Sim → 1 + 1 + 1 = 3
7. `count(50, 30)` → 50 > 30? Sim → 1 + 1 + 3 = **5 nós**

---

## 🔄 Padrão de Recursão Utilizado

Todos os métodos implementados seguem o **padrão de recursão em árvores binárias**:

### Estrutura Geral:
```javascript
metodoRecursivo(root, ...parametros) {
    // 1. CASO BASE: Verifica se chegou ao fim (nó null)
    if(root === null) return [valor_base]
    
    // 2. PROCESSAMENTO: Faz algo com o nó atual (se necessário)
    const resultado = [operacao_com_root.data]
    
    // 3. CHAMADAS RECURSIVAS: Processa subárvores
    const esquerda = metodoRecursivo(root.left, ...parametros)
    const direita = metodoRecursivo(root.right, ...parametros)
    
    // 4. COMBINAÇÃO: Junta os resultados
    return [combinar_resultados]
}
```

### Características Importantes:

1. **Caso Base:** Sempre verifica se `root === null`
2. **Divisão:** Divide o problema em subárvores esquerda e direita
3. **Conquista:** Resolve recursivamente cada subárvore
4. **Combinação:** Junta os resultados parciais

---

## 🚀 Como Executar

### Executar os testes:
```bash
cd arvoreBuscaBinaria
node testeDesafios.mjs
```

### Usar em seu próprio código:
```javascript
import BinarySearchTree from './arvoreBuscaBinaria.mjs'

const arvore = new BinarySearchTree()

// Inserir valores
[50, 30, 70, 20, 40, 60, 80].forEach(v => arvore.insert(v))

// Usar os métodos dos desafios
console.log('Total de nós:', arvore.countNodes())        // 7
console.log('Altura:', arvore.height())                   // 3
console.log('Folhas:', arvore.countLeaves())             // 4
console.log('Soma:', arvore.sumNodes())                  // 350
console.log('Maiores que 30:', arvore.countGreaterThan(30)) // 5
```

---

## 📊 Exemplos de Saída

### Árvore Inicial:
```
Valores inseridos: 50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 65, 90

Árvore em ordem: 10, 20, 25, 30, 35, 40, 50, 60, 65, 70, 80, 90

✅ Total de nós na árvore: 12
✅ Altura da árvore: 4
✅ Total de folhas: 5
✅ Soma total dos valores: 575
✅ Existem 8 nós com valor maior que 30
```

### Após Remoções (20, 30, 50):
```
Árvore em ordem: 10, 25, 35, 40, 60, 65, 70, 80, 90

✅ Total de nós restantes: 9
✅ Altura da árvore: 4
✅ Total de folhas: 4
✅ Soma total dos valores: 475
✅ Nós com valor > 30: 7
```

---

## 📈 Complexidade dos Algoritmos

| Método | Complexidade de Tempo | Complexidade de Espaço |
|--------|----------------------|------------------------|
| `countNodes()` | O(n) | O(h)* |
| `height()` | O(n) | O(h)* |
| `countLeaves()` | O(n) | O(h)* |
| `sumNodes()` | O(n) | O(h)* |
| `countGreaterThan()` | O(n) | O(h)* |

**Onde:**
- `n` = número total de nós
- `h` = altura da árvore
- `*` = Espaço usado pela pilha de recursão

**Justificativa:**
- Todos visitam cada nó exatamente uma vez → **O(n)**
- A pilha de recursão cresce proporcionalmente à altura → **O(h)**
- No pior caso (árvore degenerada em lista), h = n
- No melhor caso (árvore balanceada), h = log(n)

---

## 🎓 Conceitos de Estrutura de Dados Aplicados

1. **Recursão:** Todos os métodos usam chamadas recursivas
2. **Árvore Binária:** Cada nó tem no máximo 2 filhos
3. **Divide and Conquer:** Dividir em subproblemas menores
4. **Backtracking:** Voltar na recursão combinando resultados
5. **Caso Base:** Condição de parada da recursão

---

## ✨ Autor

**Diego Henrique Melo**  
Faculdade - Engenharia de Software  
Estrutura de Dados II - 4º Semestre

---

## 📝 Licença

Este projeto é parte de material educacional da disciplina de Estrutura de Dados II.

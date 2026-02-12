/*
    ESTRUTURA DE DADOS ÁRVORE BINÁRIA DE BUSCA
    - Árvore ~> é uma estrutura de dados não-linear, hierárquica,
      que é formada recursivamente por outras subárvores.
    - Árvore binária ~> uma árvore na qual cada nodo tem grau máximo
      igual a 2 (ou seja, cada nodo pode ter, no máximo, dois descendentes
      diretos).
    - Árvore binária de busca ~> é uma árvore binária otimizada para a
      operação de busca binária. Por isso, na inserção, os valores são 
      colocados já em ordem.
*/

/* Classe que representa a unidade de informação da árvore binária de busca */
class Node {
    constructor(val) {
        this.data = val     // Armazena a informação relevante para o usuário
        this.left = null    // Ponteiro para a subárvore esquerda
        this.right = null   // Ponteiro para a subárvore direita
    }
}

/* Classe que implementa a árvore binária de busca */
export default class BinarySearchTree {

    #root           // Raiz da árvore

    constructor() {
        this.#root = null        
    }

    /* Método para efetuar inserção na ABB */
    insert(val) {

        const inserted = new Node(val)

        // 1º caso: árvore vazia
        // O primeiro nodo fica sendo a raiz da árvore
        if(this.#root === null) this.#root = inserted

        // 2º caso: inserção recursiva, percorrendo a árvore
        // recursivamente
        else this.#insertNode(inserted, this.#root)
    }

    /* Método PRIVADO que insere um novo nodo na árvore
       Parâmetros:
       inserted ~> nodo a ser inserido
       root ~> a raiz da subárvore onde o nodo será inserido
    */
    #insertNode(inserted, root) {
        // 1º caso: o valor a ser inserido é MENOR que o valor da raiz;
        // inserção ocorre à ESQUERDA da raiz
        if(inserted.data < root.data) {
            // Se a posição à esquerda da raiz está desocupada, faz aí a inserção
            if(root.left === null) root.left = inserted
            // Senão, reinicia o processo de inserção, recursivamente, com a
            // subárvore esquerda como raiz
            else this.#insertNode(inserted, root.left)
        }

        // 2º caso: o valor a ser inserido é MAIOR que o valor da raiz;
        // a inserção ocorre à DIREITA da raiz
        else if(inserted.data > root.data) {
            // Se a posição à direita da raiz está desocupada, faz aí a inserção
            if(root.right === null) root.right = inserted
            // Senão, reinicia o processo de inserção, recursivamente, com a
            // subárvore direita como raiz
            else this.#insertNode(inserted, root.right)
        }

        // 3º caso: o valor a ser inserido é IGUAL ao valor da raiz;
        // não se faz nada, já que a ABB, por definição, não deve ter valores
        // repetidos
    }

    /************************************************************
     * PERCURSOS
    *************************************************************/

    /* Método que executa o percurso em-ordem (in-order traversal) 
    na árvore 
        Ordem do percurso:
        1º ~> percorre recursivamente em-ordem a subárvore esquerda
        2º ~> visita a raiz
        3º ~> percorre recursivamente em-ordem a subárvore direita
    */
    inOrderTraversal(fnCallback, root = this.#root) {
        if(root !== null) {
            this.inOrderTraversal(fnCallback, root.left)    // 1º
            fnCallback(root.data)                           // 2º
            this.inOrderTraversal(fnCallback, root.right)   // 3º
        }
    }

    /* Método que executa o percurso pré-ordem (pre-order traversal) 
    na árvore 
        Ordem do percurso:
        1º ~> visita a raiz
        2º ~> percorre recursivamente pré-ordem a subárvore esquerda
        3º ~> percorre recursivamente pré-ordem a subárvore direita
    */
    preOrderTraversal(fnCallback, root = this.#root) {
        if(root !== null) {
            fnCallback(root.data)                           // 1º
            this.preOrderTraversal(fnCallback, root.left)   // 2º
            this.preOrderTraversal(fnCallback, root.right)  // 3º
        }
    }

    /* Método que executa o percurso pós-ordem (post-order traversal) 
    na árvore 
        Ordem do percurso:
        1º ~> percorre recursivamente pós-ordem a subárvore esquerda
        2º ~> percorre recursivamente pós-ordem a subárvore direita
        3º ~> visita a raiz
    */
    postOrderTraversal(fnCallback, root = this.#root) {
        if(root !== null) {
            this.postOrderTraversal(fnCallback, root.left)   // 1º
            this.postOrderTraversal(fnCallback, root.right)  // 2º
            fnCallback(root.data)                            // 3
        }
    }

    /**************************************************************/

    /* Método que retorna o nodo de menor valor da árvore */
    #minNode(root) {
        // A partir da raiz, percorre à esquerda enquanto possível
        while(root !== null && root.left !== null) root = root.left
        return root
    }

    /* Método que retorna o nodo de maior valor da árvore */
    #maxNode(root) {
        // A partir da raiz, percorre à direita enquanto possível
        while(root !== null && root.right !== null) root = root.right
        return root
    }

    /* Método público para excluir um valor da árvore */
    remove(val) {
        this.#root = this.#removeNode(this.#root, val)
    }

    /* Método PRIVADO para excluir um nodo da árvore */
    #removeNode(root, val) {

        // 1º caso: árvore vazia
        if(root === null) return null

        // 2º caso: o valor a ser excluído é MENOR que o valor da raiz
        // Continua recursivamente o processo de exclusão pela subárvore ESQUERDA
        if(val < root.data) {
            root.left = this.#removeNode(root.left, val)
            return root
        }

        // 3º caso: o valor a ser excluído é MAIOR que o valor da raiz
        // Continua recursivamente o processo de exclusão pela subárvore DIREITA
        if(val > root.data) {
            root.right = this.#removeNode(root.right, val)
            return root
        }

        // 4º caso: o valor a ser excluído é IGUAL ao valor da raiz
        // O nodo a ser excluído foi encontrado; é necessário, agora,
        // verificar o GRAU desse nodo para aplicar o algoritmo de 
        // exclusão apropriado

        // 4.1: nodo de grau 0 (nodo folha)
        if(root.left === null && root.right === null) {
            root = null
            return root
        }

        // 4.2: nodo de grau 1, com subárvore à esquerda
        if(root.left !== null && root.right === null) {
            root = root.left
            return root
        }

        // 4.3: nodo de grau 1, com subárvore à direita
        if(root.left === null && root.right !== null) {
            root = root.right
            return root
        }

        // 4.4: nodo de grau 2

        /*
            Precisamos encontrar:
            1) O nodo de MAIOR valor da subárvore ESQUERDA; *ou*
            2) O nodo de MENOR valor da subárvore DIRETA

            Nesta implementação, ficaremos com a possibilidade 2
        */

        // Nodo de menor valor da subárvore direita
        const newRoot = this.#minNode(root.right)
        // Ou: const newRoot = this.#maxNode(root.left)

        // Copia o valor do nodo encontrado para o nodo que está
        // sendo excluído
        root.data = newRoot.data

        // Excluímos o valor duplicado que ficou na subárvore direita
        // (de onde veio newRoot)
        root.right = this.#removeNode(root.right, newRoot.data)
        // Ou: root.left = this.#removeNode(root.left, newRoot.data)

        return root

    }

    /* Método público que busca por um valor dentro da árvore.
        Retorna:
        - true, caso o valor exista; ou
        - false, caso contrário
    */
    search(val) {
        const node = this.#searchNode(this.#root, val)
        // Se o nodo retornado for diferente de null, é
        // porque o valor procurado existe na árvore
        return node !== null
    }

    /* Método PRIVADO que retorna nodo que contém o valor especificado */
    #searchNode(root, val) {

        // 1º caso: a árvore está vazia
        if(root === null) return null

        // 2º caso: o valor procurado é MENOR que o valor da raiz
        // Continua a busca pela subárvore ESQUERDA
        if(val < root.data) return this.#searchNode(root.left, val)

        // 3º caso: o valor procurado é MAIOR que o valor da raiz
        // Continua a busca pela subárvore DIREITA
        if(val > root.data) return this.#searchNode(root.right, val)

        // 4º caso: o valor procurado é IGUAL ao valor da raiz
        // O valor procurado foi encontrado e está em root
        return root
    }

    /************************************************************
     * DESAFIO 1 - CONTAR NÓS E ALTURA DA ÁRVORE
    *************************************************************/

    /* Método público que retorna a quantidade total de nós na árvore */
    countNodes() {
        return this.#countNodesRecursive(this.#root)
    }

    /* Método PRIVADO recursivo que conta os nós */
    #countNodesRecursive(root) {
        // Caso base: árvore vazia
        if(root === null) return 0
        
        // Conta 1 (nó atual) + nós da subárvore esquerda + nós da subárvore direita
        return 1 + this.#countNodesRecursive(root.left) + this.#countNodesRecursive(root.right)
    }

    /* Método público que calcula a altura da árvore */
    height() {
        return this.#heightRecursive(this.#root)
    }

    /* Método PRIVADO recursivo que calcula a altura */
    #heightRecursive(root) {
        // Caso base: árvore vazia tem altura 0
        if(root === null) return 0
        
        // A altura é 1 + a maior altura entre as subárvores esquerda e direita
        const leftHeight = this.#heightRecursive(root.left)
        const rightHeight = this.#heightRecursive(root.right)
        
        return 1 + Math.max(leftHeight, rightHeight)
    }

    /************************************************************
     * DESAFIO 2 - CONTAR FOLHAS DA ÁRVORE
    *************************************************************/

    /* Método público que retorna a quantidade de nós folhas */
    countLeaves() {
        return this.#countLeavesRecursive(this.#root)
    }

    /* Método PRIVADO recursivo que conta as folhas */
    #countLeavesRecursive(root) {
        // Caso base: árvore vazia
        if(root === null) return 0
        
        // Se o nó não tem filhos, é uma folha
        if(root.left === null && root.right === null) return 1
        
        // Senão, soma as folhas das subárvores esquerda e direita
        return this.#countLeavesRecursive(root.left) + this.#countLeavesRecursive(root.right)
    }

    /************************************************************
     * DESAFIO 3 - SOMAR TODOS OS VALORES DA ÁRVORE
    *************************************************************/

    /* Método público que retorna a soma de todos os valores */
    sumNodes() {
        return this.#sumNodesRecursive(this.#root)
    }

    /* Método PRIVADO recursivo que soma os valores */
    #sumNodesRecursive(root) {
        // Caso base: árvore vazia
        if(root === null) return 0
        
        // Soma: valor do nó atual + soma da subárvore esquerda + soma da subárvore direita
        return root.data + this.#sumNodesRecursive(root.left) + this.#sumNodesRecursive(root.right)
    }

    /************************************************************
     * DESAFIO 4 - CONTAR NÓS MAIORES QUE UM VALOR X
    *************************************************************/

    /* Método público que conta quantos nós têm valor maior que x */
    countGreaterThan(x) {
        return this.#countGreaterThanRecursive(this.#root, x)
    }

    /* Método PRIVADO recursivo que conta nós maiores que x */
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

}

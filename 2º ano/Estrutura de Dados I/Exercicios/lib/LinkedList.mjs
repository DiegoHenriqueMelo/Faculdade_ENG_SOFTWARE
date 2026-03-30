class Node {
  constructor(val) {
    this.data = val;
    this.next = null;
  }
}

export default class LinkedList {
  #head; // Início da lista (cabeça)
  #tail; // Fim da lista (cauda)
  #count; // Quantidade de nodos da lista

  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#count = 0;
  }

  //Getter que retorna se alista encadeada está vazia ou não
  get isEmpty(){
    return this.#count === 0
  }

  //Getter que retorna a quantidade de elementos da lista
  get count(){
    return this.#count
  }
  
  //Método para inserir em qualquer posição
  insert(pos, val){
    //cria o nodo para armazenar o valor pretendido
    const inserted = new Node(val)

    //1º caso: a lista está vazia
    if(this.isEmpty){
        this.#head = inserted
        this.#tail = inserted
    } 
    
    //2º caso: lista não vazia, inserção na primeira posição
    else if(pos === 0){
        inserted.next = this.#head
        this.#head = inserted
    }

    //3º caso: inserção no final da lista
    else if(pos >= this.#count){
        this.#tail.next = inserted
        this.#tail = inserted
    }

    this.#count++

  } 

}
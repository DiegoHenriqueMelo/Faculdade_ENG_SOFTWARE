export default class Queue{

    #data // vetor private
    
    constructor(){
        this.#data = []
    }

    //método para inserção na fila
    enqueue(val){
        this.#data.push(val)
    }

    //método para remoção na fila
    dequeue(){
        return this.#data.shift()
    }

    //método para consultar o início da fila sem remover o elemento
    peek(){
        return this.#data[0]
    }

    //a fila esta vazia
    get isEmpty(){
        return this.#data.length === 0
    }

    //método impressão da fila(para efeitos de depuração)
    print(){
        let output = "[ "
        for(let i = 0; i < this.#data.length; i++){
            if(output !== "[ "){
                output += ", "
            }
            output += `(${i+1}º): ${this.#data[i]}`
        }
        return output + " ]"
    }
}
function mergeSort(vetor, campo){
    if(vetor.length < 2) return vetor

    let meio = Math.floor(vetor.length / 2)

    let vetEsq = vetor.slice(0, meio)
    let vetDir = vetor.slice(meio)

    vetEsq = mergeSort(vetEsq, campo)
    vetDir = mergeSort(vetDir, campo)

    let posEsq = 0, posDir = 0, vetRes = []

    while(posEsq < vetEsq.length && posDir < vetDir.length){
        if(vetEsq[posEsq][campo] < vetDir[posDir][campo]){
            vetRes.push(vetEsq[posEsq])
            posEsq++
        }else{
            vetRes.push(vetDir[posDir])
            posDir++
        }
    }
    let sobra

    if(posEsq < posDir){
        sobra = vetEsq.slice(posEsq)
    }else{
        sobra = vetDir.slice(posDir)
    }

    return [...vetRes, ...sobra] 
}

import {objMotoristas} from "./motoristas-obj-desord.mjs"

let motoristasOrd = mergeSort(objMotoristas, 'vigencia_do_cadastro')
console.log({motoristasOrd})
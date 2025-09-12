// Array para armazenar os alunos
let alunos = [];

// Classe Aluno
class Aluno {
    constructor(nome, ra, idade, sexo, media) {
        this.nome = nome;
        this.ra = ra;
        this.idade = idade;
        this.sexo = sexo;
        this.media = media;
        this.resultado = media >= 6.0 ? 'Aprovado' : 'Reprovado';
    }
}

// Algoritmos de Ordenação

// Bubble Sort para ordenação por nome (crescente)
function bubbleSortNome(arr) {
    const n = arr.length;
    const arrayOrdenado = [...arr];
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arrayOrdenado[j].nome.toLowerCase() > arrayOrdenado[j + 1].nome.toLowerCase()) {
                [arrayOrdenado[j], arrayOrdenado[j + 1]] = [arrayOrdenado[j + 1], arrayOrdenado[j]];
            }
        }
    }
    return arrayOrdenado;
}

// Selection Sort para ordenação por RA (decrescente)
function selectionSortRA(arr) {
    const n = arr.length;
    const arrayOrdenado = [...arr];
    
    for (let i = 0; i < n - 1; i++) {
        let maxIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arrayOrdenado[j].ra > arrayOrdenado[maxIdx].ra) {
                maxIdx = j;
            }
        }
        if (maxIdx !== i) {
            [arrayOrdenado[i], arrayOrdenado[maxIdx]] = [arrayOrdenado[maxIdx], arrayOrdenado[i]];
        }
    }
    return arrayOrdenado;
}

// Merge Sort para ordenação de aprovados por nome (crescente)
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const meio = Math.floor(arr.length / 2);
    const esquerda = mergeSort(arr.slice(0, meio));
    const direita = mergeSort(arr.slice(meio));
    
    return merge(esquerda, direita);
}

function merge(esquerda, direita) {
    const resultado = [];
    let i = 0, j = 0;
    
    while (i < esquerda.length && j < direita.length) {
        if (esquerda[i].nome.toLowerCase() <= direita[j].nome.toLowerCase()) {
            resultado.push(esquerda[i]);
            i++;
        } else {
            resultado.push(direita[j]);
            j++;
        }
    }
    
    return resultado.concat(esquerda.slice(i)).concat(direita.slice(j));
}

// Funções de Interface

function mostrarCadastro() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('cadastro').style.display = 'block';
    document.getElementById('relatorio').style.display = 'none';
}

function voltarMenu() {
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('cadastro').style.display = 'none';
    document.getElementById('relatorio').style.display = 'none';
    
    // Limpar formulário
    document.getElementById('formAluno').reset();
}

function mostrarRelatorio(titulo, dados) {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('cadastro').style.display = 'none';
    document.getElementById('relatorio').style.display = 'block';
    
    document.getElementById('tituloRelatorio').textContent = titulo;
    
    if (dados.length === 0) {
        document.getElementById('conteudoRelatorio').innerHTML = '<p>Nenhum aluno encontrado.</p>';
        return;
    }
    
    let tabela = `
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>RA</th>
                    <th>Idade</th>
                    <th>Sexo</th>
                    <th>Média</th>
                    <th>Resultado</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    dados.forEach(aluno => {
        const classeResultado = aluno.resultado === 'Aprovado' ? 'aprovado' : 'reprovado';
        tabela += `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.ra}</td>
                <td>${aluno.idade}</td>
                <td>${aluno.sexo === 'M' ? 'Masculino' : 'Feminino'}</td>
                <td>${aluno.media.toFixed(1)}</td>
                <td class="${classeResultado}">${aluno.resultado}</td>
            </tr>
        `;
    });
    
    tabela += '</tbody></table>';
    document.getElementById('conteudoRelatorio').innerHTML = tabela;
}

// Funções de Relatório

function relatorioNomeCrescente() {
    const alunosOrdenados = bubbleSortNome(alunos);
    mostrarRelatorio('Relatório de Alunos por Nome (A-Z)', alunosOrdenados);
}

function relatorioRADecrescente() {
    const alunosOrdenados = selectionSortRA(alunos);
    mostrarRelatorio('Relatório de Alunos por RA (Decrescente)', alunosOrdenados);
}

function relatorioAprovados() {
    const aprovados = alunos.filter(aluno => aluno.resultado === 'Aprovado');
    const aprovadosOrdenados = mergeSort(aprovados);
    mostrarRelatorio('Relatório de Alunos Aprovados por Nome (A-Z)', aprovadosOrdenados);
}

// Validação e Cadastro

function validarRA(ra) {
    return alunos.some(aluno => aluno.ra === ra);
}

function cadastrarAluno(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const ra = document.getElementById('ra').value.trim();
    const idade = parseInt(document.getElementById('idade').value);
    const sexo = document.getElementById('sexo').value;
    const media = parseFloat(document.getElementById('media').value);
    
    // Validações
    if (!nome || !ra || !idade || !sexo || isNaN(media)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }
    
    if (validarRA(ra)) {
        alert('RA já cadastrado! Por favor, insira um RA diferente.');
        return;
    }
    
    if (media < 0 || media > 10) {
        alert('A média deve estar entre 0 e 10.');
        return;
    }
    
    // Criar e adicionar novo aluno
    const novoAluno = new Aluno(nome, ra, idade, sexo, media);
    alunos.push(novoAluno);
    
    alert('Aluno cadastrado com sucesso!');
    document.getElementById('formAluno').reset();
}

// Event Listeners
document.getElementById('formAluno').addEventListener('submit', cadastrarAluno);

// Dados de exemplo para demonstração
function carregarDadosExemplo() {
    alunos.push(new Aluno('Ana Silva', '2021001', 20, 'F', 8.5));
    alunos.push(new Aluno('Bruno Santos', '2021003', 22, 'M', 5.2));
    alunos.push(new Aluno('Carlos Oliveira', '2021002', 19, 'M', 7.8));
    alunos.push(new Aluno('Diana Costa', '2021005', 21, 'F', 9.1));
    alunos.push(new Aluno('Eduardo Lima', '2021004', 23, 'M', 4.7));
}

// Carregar dados de exemplo ao iniciar
carregarDadosExemplo();
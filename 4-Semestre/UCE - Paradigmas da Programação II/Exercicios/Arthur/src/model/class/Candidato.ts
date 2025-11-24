export class Candidato {
  nome: string;
  sobrenome: string;
  cpf: string;
  dt_aniversario: string;

  constructor(
    nome: string,
    sobrenome: string,
    cpf: string,
    dt_aniversario: string
  ) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.cpf = cpf;
    this.dt_aniversario = dt_aniversario;
  }
}

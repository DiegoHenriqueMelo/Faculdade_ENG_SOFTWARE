export class Vaga {
  nm_vaga: string;
  salario: string;
  localidade: string;
  requisitos: string;

  constructor(
    nm_vaga: string,
    salario: string,
    localidade: string,
    requisitos: string
  ) {
    this.nm_vaga = nm_vaga;
    this.salario = salario;
    this.localidade = localidade;
    this.requisitos = requisitos;
  }
}

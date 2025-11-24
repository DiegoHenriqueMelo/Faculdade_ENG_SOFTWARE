export class Empresa {
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;

  constructor(
    razao_social: string,
    nome_fantasia: string,
    cnpj: string,
  ) {
    this.razao_social = razao_social;
    this.nome_fantasia = nome_fantasia;
    this.cnpj = cnpj;
  }
}

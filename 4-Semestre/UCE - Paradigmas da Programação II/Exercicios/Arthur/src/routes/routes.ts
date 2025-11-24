/**
 * Definição das rotas da aplicação para as operações CRUD
 * e funcionalidades específicas, organizadas por entidade.
 */

// Rotas para o recurso Candidato
export let postCandidato: string = "/post/candidato";
export let getCanditado: string = "/get/canditado";
export let deleteCanditado: string = "/delete/danditado/:id";
export let updateCanditado: string = "/update/canditado/:id";

// Rotas para o recurso Empresa
export let postEmpresa: string = "/post/empresa";
export let getEmpresa: string = "/get/empresa";
export let deleteEmpresa: string = "/delete/empresa/:id";
export let updateEmpresa: string = "/update/empresa/:id";

// Rotas para o recurso Vaga, com ID como parâmetro
export let postVaga: string = "/post/vaga/:id";
export let candidatarVaga: string = "/post/cadidato/vaga/:id";
export let getVagas: string = "/get/vaga";
export let updateVAga: string = "/update/vaga/:id";
export let deleteVaga: string = "/delete/vaga/:id";

//  Rotas para Login
export let loginCandidato: string = "/login/candidato";
export let loginEmpresa: string = "/login/empresa";
export let loginAdmin: string = "/login/admin";

// Rotas Para Acessibilidade

export let postAcessibilidade: string = "/post/acessibilidade";
export let postBarreira: string = "/post/barreira";
export let postSubtipo: string = "/post/subtipo";

import * as Model from "../../model/candidato/modelCandidato.js";

export let postCandidato = async (body: {
  nome: string;
  sobrenome: string;
  cpf: string;
  dt_aniversario: string;
}): Promise<[number, string]> => {
  try {
    let [status, message] = await Model.postCandidato(body);

    return [status, message];
  } catch (error) {
    console.log(error);
    return [500, "Internal Server Erro"];
  }
};

export let getCandidatos = async (): Promise<[number, any]> => {
  try {
    let [status, data] = await Model.getCandidatos();
    return [status, data];
  } catch (error) {
    console.log(error);
    return [500, "Internal Server Error"];
  }
};

export let deleteCandidato = async (id: number): Promise<[number, string]> => {
  try {
    let [status, message] = await Model.deleteCandidato(id);
    return [status, message];
  } catch (error) {
    console.log(error);
    return [500, "Internal Server Error"];
  }
};

export let updateCandidato = async (
  body: {
    nome: string;
    sobrenome: string;
    cpf: string;
    dt_aniversario: string;
  },
  id: number
): Promise<[number, string]> => {
  try {
    let [status, message] = await Model.updateCandidato(body, id);
    return [status, message];
  } catch (error) {
    console.log(error);
    return [500, "Internal Server Error"];
  }
};

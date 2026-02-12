import * as DB from "../../database/candidate/query.js";
import { Candidato } from "../class/Candidato.js";

export let postCandidato = async (body: {
  nome: string;
  sobrenome: string;
  cpf: string;
  dt_aniversario: string;
}): Promise<[number, string]> => {
  try {
    let candidate = new Candidato(
      body.nome,
      body.sobrenome,
      body.cpf,
      body.dt_aniversario
    );
    let [status, message] = await DB.insertUser(candidate);

    return [status, message];
  } catch (error) {
    console.log(error);
    return [400, "Bad Request"];
  }
};

export let getCandidatos = async (): Promise<[number, any]> => {
  try {
    let [status, data] = await DB.getCandidatos();
    return [status, data];
  } catch (error) {
    console.log(error);
    return [400, "Bad Request"];
  }
};

export let deleteCandidato = async (id: number): Promise<[number, string]> => {
  try {
    let [status, message] = await DB.deleteCandidato(id);
    return [status, message];
  } catch (error) {
    console.log(error);
    return [400, "Bad Request"];
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
    let candidate = new Candidato(
      body.nome,
      body.sobrenome,
      body.cpf,
      body.dt_aniversario
    );
    let [status, message] = await DB.updateCandidato(candidate, id);
    return [status, message];
  } catch (error) {
    console.log(error);
    return [400, "Bad Request"];
  }
};

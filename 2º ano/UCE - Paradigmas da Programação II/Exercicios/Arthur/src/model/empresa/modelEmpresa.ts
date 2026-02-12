import * as DB from "../../database/empresa/query.js";
import { Empresa } from "../class/Empresa.js";

export let postEmpresa = async (body: {
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
}): Promise<[number, string]> => {
  try {
    let empresa = new Empresa(body.razao_social, body.nome_fantasia, body.cnpj);

    let [status, message] = await DB.insertUser(empresa);

    return [status, message];
  } catch (error) {
    console.log(error);
    return [400, "Bad Request"];
  }
};

export let getEmpresas = async (): Promise<[number, any]> => {
  try {
    let [status, data] = await DB.getEmpresas();
    return [status, data];
  } catch (error) {
    console.log(error);
    return [400, "Bad Request"];
  }
};

export let deleteEmpresa = async (id: number): Promise<[number, string]> => {
  try {
    let [status, message] = await DB.deleteEmpresa(id);
    return [status, message];
  } catch (error) {
    console.log(error);
    return [400, "Bad Request"];
  }
};

export let updateEmpresa = async (
  body: {
    razao_social: string;
    nome_fantasia: string;
    cnpj: string;
  },
  id: number
): Promise<[number, string]> => {
  try {
    let empresa = new Empresa(body.razao_social, body.nome_fantasia, body.cnpj);
    let [status, message] = await DB.updateEmpresa(empresa, id);
    return [status, message];
  } catch (error) {
    console.log(error);
    return [400, "Bad Request"];
  }
};

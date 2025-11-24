import * as Model from "../../model/empresa/modelEmpresa.js";

export let postEmpresa = async (body: {
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
}): Promise<[number, string]> => {
  try {
    let [status, message] = await Model.postEmpresa(body);

    return [status, message];
  } catch (error) {
    console.log(error);
    return [500, "Internal Server Erro"];
  }
};

export let getEmpresas = async (): Promise<[number, any]> => {
  try {
    let [status, data] = await Model.getEmpresas();
    return [status, data];
  } catch (error) {
    console.log(error);
    return [500, "Internal Server Error"];
  }
};

export let deleteEmpresa = async (id: number): Promise<[number, string]> => {
  try {
    let [status, message] = await Model.deleteEmpresa(id);
    return [status, message];
  } catch (error) {
    console.log(error);
    return [500, "Internal Server Error"];
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
    let [status, message] = await Model.updateEmpresa(body, id);
    return [status, message];
  } catch (error) {
    console.log(error);
    return [500, "Internal Server Error"];
  }
};

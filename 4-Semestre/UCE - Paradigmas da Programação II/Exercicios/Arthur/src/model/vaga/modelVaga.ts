import * as DB from "../../database/vaga/query.js";
import { Vaga } from "../class/Vaga.js";

export let postVaga = async (body: {
  nm_vaga: string;
  salario: string;
  localidade: string;
  requisitos:string;
}, id:number): Promise<[number, string]> => {
  try {
    let vaga = new Vaga(body.nm_vaga, body.salario, body.localidade,body.requisitos );

    let [status, message] = await DB.insertVaga(vaga, id);

    return [status, message];
  } catch (error) {
    console.log(error);
    return [400, "Bad Request"];
  }
};

export let getVagas = async (): Promise<[number, any]> => {
  try {
    let [status, data] = await DB.getVagas();
    return [status, data];
  } catch (error) {
    console.log(error);
    return [400, "Bad Request"];
  }
};

export let deleteVaga = async (id: number): Promise<[number, string]> => {
  try {
    let [status, message] = await DB.deleteVaga(id);
    return [status, message];
  } catch (error) {
    console.log(error);
    return [400, "Bad Request"];
  }
};

export let updateVaga = async (
  body: {
    nm_vaga: string;
    salario: string;
    localidade: string;
    requisitos: string;
  },
  id: number
): Promise<[number, string]> => {
  try {
    let vaga = new Vaga(
      body.nm_vaga,
      body.salario,
      body.localidade,
      body.requisitos
    );
    let [status, message] = await DB.updateVaga(vaga, id);
    return [status, message];
  } catch (error) {
    console.log(error);
    return [400, "Bad Request"];
  }
};

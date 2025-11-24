import * as DB from "../../database/admin/query.js";
import { Acessibilidade } from "../class/Acessibilidade.js";
import { Barreira } from "../class/Barreira.js";
import { Subtipo } from "../class/Subtipo.js";

export let postAcessibilidade = async (body: {
  nm_acessibilidade: string;
  dt_criacao: string;
}): Promise<[number, string]> => {
  try {
    let acessibilidade = new Acessibilidade(
      body.nm_acessibilidade,
      body.dt_criacao
    );
    let [status, message] = await DB.insertAcessibilidade(acessibilidade);

    return [status, message];
  } catch (error) {
    console.log(error);
    return [400, "Bad Request"];
  }
};
export let postBarreira = async (body: {
  nm_barreira: string;
  dt_criacao: string;
}): Promise<[number, string]> => {
  try {
    let barreira = new Barreira(
      body.nm_barreira,
      body.dt_criacao
    );
    let [status, message] = await DB.insertBarreira(barreira);

    return [status, message];
  } catch (error) {
    console.log(error);
    return [400, "Bad Request"];
  }
};
export let postSubtipo = async (body: {
  nm_subtipo: string;
  dt_criacao: string;
}): Promise<[number, string]> => {
  try {
    let subtipo = new Subtipo(
      body.nm_subtipo,
      body.dt_criacao
    );
    let [status, message] = await DB.insertSubtipo(subtipo);

    return [status, message];
  } catch (error) {
    console.log(error);
    return [400, "Bad Request"];
  }
};

import { pool } from "../../config/connect.js";

export let insertVaga = async (
  body: {
    nm_vaga: string;
    salario: string;
    localidade: string;
    requisitos: string;
  },
  id: number
): Promise<[number, string]> => {
  try {
    let query: string =
      "INSERT INTO tb_vagas (nm_vaga, salario, localidade, requisitos, id_empresa) VALUES ($1, $2, $3, $4, $5)";
    let response = await pool.query(query, [
      body.nm_vaga,
      body.salario,
      body.localidade,
      body.requisitos,
      id
    ]);
    return [201, "Criado com Sucesso"];
  } catch (error) {
    console.log(error);
    return [500, String(error)];
  }
};

export let getVagas = async (): Promise<[number, any]> => {
  try {
    let query: string = "SELECT * FROM tb_vagas";
    let response = await pool.query(query);
    return [200, response.rows];
  } catch (error) {
    console.log(error);
    return [500, String(error)];
  }
};

export let deleteVaga = async (id: number): Promise<[number, string]> => {
  try {
    let query: string = "UPDATE tb_vagas SET fg_ativo = false WHERE id = $1";
    let response = await pool.query(query, [id]);
    
    if (response.rowCount === 0) {
      return [404, "Vaga não encontrada"];
    }
    
    return [200, "Vaga desativada com sucesso"];
  } catch (error) {
    console.log(error);
    return [500, String(error)];
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
    let query: string =
      "UPDATE tb_vagas SET nm_vaga = $1, salario = $2, localidade = $3, requisitos = $4 WHERE id = $5";
    let response = await pool.query(query, [
      body.nm_vaga,
      body.salario,
      body.localidade,
      body.requisitos,
      id,
    ]);

    if (response.rowCount === 0) {
      return [404, "Vaga não encontrada"];
    }

    return [200, "Vaga atualizada com sucesso"];
  } catch (error) {
    console.log(error);
    return [500, String(error)];
  }
};

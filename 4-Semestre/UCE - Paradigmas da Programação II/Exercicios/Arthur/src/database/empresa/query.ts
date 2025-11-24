import { pool } from "../../config/connect.js";

export let insertUser = async (body: {
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
}): Promise<[number, string]> => {
  try {
    let query: string =
      "INSERT INTO tb_empresas (razao_social, nome_fantasia, cnpj) VALUES ($1, $2, $3)";
    let response = await pool.query(query, [
      body.razao_social,
      body.nome_fantasia,
      body.cnpj,
    ]);
    return [201, "Criado com Sucesso"];
  } catch (error) {
    console.log(error);
    return [500, String(error)];
  }
};

export let getEmpresas = async (): Promise<[number, any]> => {
  try {
    let query: string = "SELECT * FROM tb_empresas";
    let response = await pool.query(query);
    return [200, response.rows];
  } catch (error) {
    console.log(error);
    return [500, String(error)];
  }
};

export let deleteEmpresa = async (id: number): Promise<[number, string]> => {
  try {
    let query: string = "UPDATE tb_empresas SET fg_ativo = false WHERE id = $1";
    let response = await pool.query(query, [id]);
    
    if (response.rowCount === 0) {
      return [404, "Empresa não encontrada"];
    }
    
    return [200, "Empresa desativada com sucesso"];
  } catch (error) {
    console.log(error);
    return [500, String(error)];
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
    let query: string =
      "UPDATE tb_empresas SET razao_social = $1, nome_fantasia = $2, cnpj = $3 WHERE id = $4";
    let response = await pool.query(query, [
      body.razao_social,
      body.nome_fantasia,
      body.cnpj,
      id,
    ]);

    if (response.rowCount === 0) {
      return [404, "Empresa não encontrada"];
    }

    return [200, "Empresa atualizada com sucesso"];
  } catch (error) {
    console.log(error);
    return [500, String(error)];
  }
};

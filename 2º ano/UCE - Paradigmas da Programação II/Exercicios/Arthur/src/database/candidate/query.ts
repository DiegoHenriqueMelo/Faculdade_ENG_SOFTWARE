import { pool } from "../../config/connect.js";

export let insertUser = async (body: {
  nome: string;
  sobrenome: string;
  cpf: string;
  dt_aniversario: string;
}): Promise<[number, string]> => {
  try {
    let query: string =
      "INSERT INTO tb_candidatos (nome, sobrenome, cpf, dt_aniversario) VALUES ($1, $2, $3, $4)";
    let response = await pool.query(query, [
      body.nome,
      body.sobrenome,
      body.cpf,
      body.dt_aniversario,
    ]);
    return [201, "Criado com Sucesso"];
  } catch (error) {
    console.log(error);
    return [500, String(error)];
  }
};

export let getCandidatos = async (): Promise<[number, any]> => {
  try {
    let query: string = "SELECT * FROM tb_candidatos";
    let response = await pool.query(query);
    return [200, response.rows];
  } catch (error) {
    console.log(error);
    return [500, String(error)];
  }
};

export let deleteCandidato = async (id: number): Promise<[number, string]> => {
  try {
    let query: string = "UPDATE tb_candidatos SET fg_ativo = false WHERE id = $1";
    let response = await pool.query(query, [id]);
    
    if (response.rowCount === 0) {
      return [404, "Candidato não encontrado"];
    }
    
    return [200, "Candidato desativado com sucesso"];
  } catch (error) {
    console.log(error);
    return [500, String(error)];
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
    let query: string =
      "UPDATE tb_candidatos SET nome = $1, sobrenome = $2, cpf = $3, dt_aniversario = $4 WHERE id = $5";
    let response = await pool.query(query, [
      body.nome,
      body.sobrenome,
      body.cpf,
      body.dt_aniversario,
      id,
    ]);

    if (response.rowCount === 0) {
      return [404, "Candidato não encontrado"];
    }

    return [200, "Candidato atualizado com sucesso"];
  } catch (error) {
    console.log(error);
    return [500, String(error)];
  }
};

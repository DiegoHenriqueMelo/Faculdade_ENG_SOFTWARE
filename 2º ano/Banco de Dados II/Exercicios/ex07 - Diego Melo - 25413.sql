-- Exercicio 1

SELECT 
  e.nome,
  f.ds_funcao,
  e.data_admissao
FROM tb_empregado e
JOIN tb_funcao f 
  ON e.id_funcao = f.id_funcao
WHERE e.data_admissao 
  BETWEEN DATE '1987-02-20' AND DATE '1989-05-01'
ORDER BY 3 ASC;


-- Exercicio 2

SELECT 
    UPPER(e.nome) AS "NOME GRANDÃO",
    LENGTH(e.sobrenome) AS "QTD LETTERS SOBRENOME", 
    d.nm_departamento AS "Dpto", 
    p.nm_pais AS "Country"
FROM tb_empregado e
JOIN tb_departamento d USING(id_departamento)
JOIN tb_localizacao l USING(id_localizacao)
JOIN tb_pais p USING(id_pais)
WHERE e.nome LIKE 'B%' OR 'L%' OR 'A%';

-- Exercicio 3

SELECT 
  e.nome AS nome_empregado,
  d.nm_departamento AS departamento,
  l.cidade,
  l.estado
FROM tb_empregado e
JOIN tb_departamento d USING(id_departamento)
JOIN tb_localizacao l USING(id_localizacao)
WHERE e.percentual_comissao IS NOT NULL 
  AND e.percentual_comissao > 0;

-- Exercicio 4

SELECT 
  e.nome || ' trabalha para ' || 
  NVL(g.nome, 'os acionistas') AS relacao
FROM tb_empregado e
LEFT JOIN tb_empregado g 
  ON e.id_gerente = g.id_empregado
ORDER BY g.nome DESC;

-- Exercicio 5

CREATE OR REPLACE PROCEDURE sp_get_emp (p_id IN INTEGER) AS
  v_nome       tb_empregado.nome%TYPE;
  v_sobrenome  tb_empregado.sobrenome%TYPE;
  v_funcao     tb_funcao.ds_funcao%TYPE;
BEGIN
  SELECT e.nome, e.sobrenome, f.ds_funcao
  INTO v_nome, v_sobrenome, v_funcao
  FROM tb_empregado e
  JOIN tb_funcao f 
    ON e.id_funcao = f.id_funcao
  WHERE e.id_empregado = p_id;

  DBMS_OUTPUT.PUT_LINE('Nome: ' || v_nome || ' ' || v_sobrenome ||
'  Função: ' || v_funcao);

EXCEPTION
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE('Empregado ' || p_id || ' não localizado!!!');
END;




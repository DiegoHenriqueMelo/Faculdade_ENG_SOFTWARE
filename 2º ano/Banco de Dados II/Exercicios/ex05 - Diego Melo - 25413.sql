-- EXERCICIO 1

SELECT 'O identificador da ' || f.ds_funcao || ' é o ID: ' || f.id_funcao AS "Descrição da Função"
FROM tb_funcao f;

-- EXERCICIO 2

SELECT 22/7 *(6000*6000) AS "Área"
FROM dual;

-- EXERCICIO 3

SELECT d.nm_departamento
FROM tb_departamento d
WHERE d.nm_departamento LIKE '%ing';


-- EXERCICIO 4

SELECT f.ds_funcao, f.base_salario, f.teto_salario - f.base_salario AS "Diferença"
FROM tb_funcao F
WHERE f.ds_funcao LIKE '%Presidente%' OR f.ds_funcao LIKE '%Gerente%'
ORDER BY "Diferença" DESC, f.ds_funcao DESC;   

-- EXERCICIO 5

SELECT e.id_empregado, e.nome, e.salario, (e.salario * 12) AS "Salário Anual", (e.salario * 12 * &aliquota) AS "Alíquota"
FROM tb_empregado e
WHERE e.id_empregado = &id_empregado;
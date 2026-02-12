-- Exercicio 1
SELECT nome, sobrenome
FROM tb_clientes
WHERE nome LIKE '%li%';

-- Exercicio 2
SELECT 
    nome,
    sobrenome,
    CASE
        WHEN LENGTH(nome) + LENGTH(sobrenome) > 10 THEN 
            SUBSTR(nome, 1, 1) || ' ' || SUBSTR(sobrenome, 1, 10)
        ELSE 
            nome || ' ' || sobrenome
    END AS nome_formal
FROM tb_funcionarios
WHERE LENGTH(nome) + LENGTH(sobrenome) > 10;

-- Exercicio 3
SELECT 
    EXTRACT(YEAR FROM data_saida) AS ano_saida,
    id_funcao,
    COUNT(*) AS qtd_funcionarios
FROM tb_funcionarios
WHERE data_saida IS NOT NULL
GROUP BY EXTRACT(YEAR FROM data_saida), id_funcao
ORDER BY qtd_funcionarios ASC;

-- Exercicio 4
SELECT 
    TO_CHAR(data_admissao, 'DAY', 'NLS_DATE_LANGUAGE=PORTUGUESE') AS dia_semana,
    COUNT(*) AS qtd_contratados
FROM tb_funcionarios
GROUP BY TO_CHAR(data_admissao, 'DAY', 'NLS_DATE_LANGUAGE=PORTUGUESE')
HAVING COUNT(*) >= 20;

-- Exercicio 5
CREATE OR REPLACE PROCEDURE sp_questao_05(p_id_depto IN NUMBER) AS
    v_nome_depto tb_departamento_repl.nm_departamento%TYPE;
    v_primeira_letra CHAR(1);
BEGIN
    SELECT nm_departamento INTO v_nome_depto
    FROM tb_departamento_repl
    WHERE id_departamento = p_id_depto;

    v_primeira_letra := UPPER(SUBSTR(v_nome_depto, 1, 1));

    IF v_primeira_letra IN ('A', 'E', 'I', 'O', 'U') THEN
        UPDATE tb_departamento_repl
        SET nm_departamento = UPPER(nm_departamento)
        WHERE id_departamento = p_id_depto;
        DBMS_OUTPUT.PUT_LINE('O nome do Depto ' || v_nome_depto || ' foi convertido para maiúsculo');
    ELSE
        UPDATE tb_departamento_repl
        SET nm_departamento = LOWER(nm_departamento)
        WHERE id_departamento = p_id_depto;
        DBMS_OUTPUT.PUT_LINE('O nome do Depto ' || v_nome_depto || ' foi convertido para minúsculo');
    END IF;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Depto: ' || p_id_depto || ' não encontrado!!!');
END;
/


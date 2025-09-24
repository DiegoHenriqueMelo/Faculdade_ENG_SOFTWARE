SELECT last_name || ',' || first_name "Employee Name"
FROM employees
WHERE email IS NOT NULL;
-- Alternativa E)
    -- EXPLICAÇÂO: 
        -- A), B) e C) = Operadores não funcionam com NULL
        -- D) = Operadores funcionam com NULL

SELECT *
FROM employees
WHERE last_name LIKE "Sm%"
-- Alrernativa D)
    -- EXPLICAÇÂO: 
        -- A) = Pega sobrenome de qualquer tamanho, e as ultimas letras seja 'sm'
        -- B) = Pega sobrenome com o 1º caracter aleatório e os proximos 2 como 'sm'
        -- C) = * não é valido para SQL
        -- D) = Pega as 2 primeiras como 'Sm', e a ultima aleatória
    -- DICA:
        -- % = qualquer coisa
        -- _ = qualquer letra
        -- 'Sm' = limita o tamanho de caracteres

SELECT employee _id, last_name, first_name, salary 'Yearly Salary'
FROM employees
WHERE salary IS NOT NULL
ORDER BY salary last_name, 3;
-- Aleternativa C)
    -- EXPLICAÇÂO:
        -- A) = Seleção correta
        -- B) = Odernação correta
        -- D) = Comparação correta
        -- E) = Existe erro
    -- DICA:
        -- Ao usar ALIAS, usar o " " para o nome da coluna

SELECT last_name, (SYSDATE-hire_date)/7 AS WEEKS
FROM employees
WHERE department_id = 90
-- Alternativa C)

SELECT CONCAT (employee_id, SUBSTR(last_name,1,4))
AS "User Passwords"
FROM employees
-- Alternativa C)
    -- EXPLICAÇÂO:
        -- A) = INSTR() retorna número
        -- B) = INSTR() retorna número
        -- D) = SUBSTR(last_name, 4,1) retorna 4º letra
    -- DICA:
        -- CONCAT = Concatenação
        -- SUBSTR = Substring
        -- INSTR = Retorna o número da posição de uma string

SELECT NVL(10/price, "0")
FROM PRODUCT
-- Alternativa A)
    -- EXPLICAÇÂO:
        -- B) = Qualquer operação que contenha null e numeros, não retornará números
        -- C) = NULL não será exibido, a função NVL() vai forçar o retorno de 0
        -- D) = Não está dividindo por 0
        -- E) = A função NVL() não deixa dar erros

-- Alternativa C)

-- Alternativa B)

SELECT e.first_name, e.last_name, s.sales
FROM employees e, sales s
WHERE e.employee_id = s.employee_id AND revenue >= 100000;
-- Alternativa D)
    -- EXPLICAÇÂO:
        -- A) = Não apelidou as colunas no SELECT
        -- B) = Não apelidou as colunas no FROM
        -- C) = Pega apenas maiores que U$100.000

UPDATE employees
SET last_name = 'cooper'
WHERE last_name = 'roper';
-- Alternativa B)
    -- EXPLICAÇÂO:
        -- A) = Não existe a coluna 'cooper'
        -- C) = Não existe o campo 'roper'
        -- D) = Não definiu valores com SET

-- Alternativa C)

-- Alternativa A)

CREATE TABLE Birthdays
(Empno NUMBER, Empname CHAR(20), Birthdate DATE);
-- Alternativa B)
    -- EXPLICAÇÂO:
        -- A) = Não definiu Data Type
        -- C) = Não definiu Data Type e nome de coluna errdo
        -- D) = Nome de coluna errado
        -- E) = Existe uma errada

-- Alternativa E)

-- Alternativa C)

-- Alternativa A) C)

-- Alternativa A)e

SELECT employee_id
FROM employees
WHERE employee_id BETWEEN 100 AND 500
ORDER BY employee_id
    OR employee_id IN (119, 175, 205)
    AND (employee_id BETWEEN 150 AND 200)

-- Alternativa D)

SELECT *
FROM d_cds
WHERE cd_id NOT IN(90,91,92)
-- Alternativa B)

SELECT UPPER(SUBSTR("Database Programming", 
INSTR("Database Programming", "P"),20))
FROM dual;
-- Alternativa D)

-- Alternativa A)

SELECT *
FROM employees
WHERE employee_id = menager_id
-- Alternativa A)

-- Alternativa E) 